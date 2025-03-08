from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import base64
import os
import openai
from dotenv import load_dotenv
from PIL import Image
import io
import json
import sys

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Serve static files properly
app.static_folder = 'static'
app.static_url_path = ''

# Production configuration
app.config.update(
    ENV='production',
    DEBUG=False,
    PROPAGATE_EXCEPTIONS=True  # This will help with error logging
)

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

# Configure OpenAI
api_key = os.getenv('OPENAI_API_KEY')
if not api_key:
    raise ValueError("OpenAI API key not found! Please set OPENAI_API_KEY environment variable.")
print("OpenAI API key found and loaded successfully")

openai.api_key = api_key

def analyze_image_with_gpt4(image_base64):
    try:
        # Add validation for image_base64
        if not image_base64:
            raise ValueError("Empty image data received")
            
        # Debug log image size
        print(f"Image base64 length: {len(image_base64)}")
        
        # Decode base64 image with error handling
        try:
            if 'base64,' in image_base64:
                image_base64 = image_base64.split('base64,')[1]
            image_data = base64.b64decode(image_base64)
            print(f"Successfully decoded base64 image, size: {len(image_data)} bytes")
        except Exception as e:
            raise ValueError(f"Base64 decoding failed: {str(e)}")

        # Image processing with error handling
        try:
            image = Image.open(io.BytesIO(image_data))
            print(f"Image format: {image.format}, size: {image.size}, mode: {image.mode}")
        except Exception as e:
            raise ValueError(f"Image processing failed: {str(e)}")

        # OpenAI API call with better error handling
        try:
            response = openai.chat.completions.create(
                model="gpt-4-vision-preview",  # Make sure this is the correct model name
                messages=messages,
                max_tokens=1500
            )
            print(f"OpenAI API response status: {response.model_dump()}")
        except openai.APIError as e:
            raise ValueError(f"OpenAI API error: {str(e)}")
        except Exception as e:
            raise ValueError(f"OpenAI request failed: {str(e)}")

        result = response.choices[0].message.content if response.choices else None
        
        # Parse JSON response
        if result:
            try:
                # Find JSON content between curly braces
                json_str = result[result.find('{'):result.rfind('}')+1]
                data = json.loads(json_str)
                return data
            except json.JSONDecodeError as e:
                print(f"JSON parsing error: {e}")
                # Return a default structure if parsing fails
                return {
                    "foods": ["未能识别食物"],
                    "basicNutrition": {
                        "calories": {"value": 0, "unit": "千卡", "nrv": None},
                        "protein": {"value": 0, "unit": "g", "nrv": None},
                        "fat": {"value": 0, "unit": "g", "nrv": None},
                        "carbs": {"value": 0, "unit": "g", "nrv": None}
                    },
                    "dialysisIndicators": {
                        "sodium": {"value": 0, "unit": "mg", "level": "低", "warning": False, "nrv": None},
                        "potassium": {"value": 0, "unit": "mg", "level": "低", "warning": False, "nrv": None},
                        "phosphorus": {"value": 0, "unit": "mg", "level": "低", "warning": False, "nrv": None}
                    },
                    "suggestions": ["请重新尝试分析"],
                    "tips": ["请重新尝试分析"]
                }
        return None

    except Exception as e:
        print(f"Detailed analysis error: {type(e).__name__}: {str(e)}")
        raise

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok"})

@app.route('/analyze', methods=['POST'])
def analyze_food():
    try:
        print("=== Starting new analysis request ===")
        print(f"Request content type: {request.content_type}")
        
        # Validate request format
        if not request.is_json:
            return jsonify({'error': 'Content-Type must be application/json'}), 400
            
        data = request.get_json()
        print(f"Request data keys: {data.keys() if data else 'None'}")
        
        # Validate image data
        if not data or 'image' not in data:
            return jsonify({'error': 'Missing image data in request'}), 400
            
        image_data = data['image']
        if not isinstance(image_data, str):
            return jsonify({'error': 'Image data must be a base64 string'}), 400

        # Environment check
        print(f"OpenAI API Key configured: {'Yes' if openai.api_key else 'No'}")
        print(f"Running in environment: {os.getenv('FLASK_ENV', 'production')}")

        # Analysis
        try:
            analysis_result = analyze_image_with_gpt4(image_data)
            if not analysis_result:
                return jsonify({'error': 'Analysis produced no results'}), 500
            return jsonify({'result': analysis_result})
        except ValueError as e:
            print(f"Analysis value error: {str(e)}")
            return jsonify({'error': str(e)}), 400
        except Exception as e:
            print(f"Analysis unexpected error: {type(e).__name__}: {str(e)}")
            return jsonify({'error': 'Analysis failed unexpectedly', 'details': str(e)}), 500

    except Exception as e:
        print(f"Request handling error: {type(e).__name__}: {str(e)}")
        return jsonify({
            'error': 'Server error',
            'type': type(e).__name__,
            'details': str(e)
        }), 500

@app.errorhandler(Exception)
def handle_error(error):
    print(f"Server Error: {str(error)}")
    return jsonify({
        'error': '服务器错误，请稍后重试',
        'details': str(error)
    }), 500

@app.before_request
def log_request_info():
    print("=== Request Information ===")
    print(f"Request Method: {request.method}")
    print(f"Request URL: {request.url}")
    print(f"Request Headers: {dict(request.headers)}")
    print(f"Request Environment: {request.environ.get('SERVER_SOFTWARE', 'Unknown')}")
    print("=========================")

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Cache-Control,Pragma')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    # Add startup logging
    print("=== Server Starting ===")
    print(f"Python version: {sys.version}")
    print(f"Flask version: {Flask.__version__}")
    print(f"OpenAI version: {openai.__version__}")
    print(f"Environment: {os.getenv('FLASK_ENV', 'production')}")
    print(f"Debug mode: {app.debug}")
    print("====================")
    
    port = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=port, debug=False) 