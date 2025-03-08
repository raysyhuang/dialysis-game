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
import datetime

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
try:
    client = openai.OpenAI(
        api_key=os.getenv('OPENAI_API_KEY')
    )
    print("OpenAI client initialized successfully")
except Exception as e:
    print(f"Error initializing OpenAI client: {str(e)}")
    raise

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

        # Prepare the messages for the API call
        messages = [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": """请分析这张食物图片，并提供详细的营养分析。请特别关注：
1. 识别图片中的具体食物
2. 估算营养成分
3. 评估对透析患者的影响
4. 提供具体的饮食建议

请按照以下JSON格式返回（只返回JSON，不要其他文字）：
{
    "foods": ["具体食物名称"],
    "basicNutrition": {
        "calories": {"value": 0, "unit": "kcal"},
        "protein": {"value": 0, "unit": "g"},
        "fat": {"value": 0, "unit": "g"},
        "carbs": {"value": 0, "unit": "g"}
    },
    "dialysisIndicators": {
        "sodium": {
            "value": 0,
            "unit": "mg",
            "level": "低/中/高",
            "warning": false
        },
        "potassium": {
            "value": 0,
            "unit": "mg",
            "level": "低/中/高",
            "warning": false
        },
        "phosphorus": {
            "value": 0,
            "unit": "mg",
            "level": "低/中/高",
            "warning": false
        }
    },
    "suggestions": [
        "针对该食物的具体建议1",
        "针对该食物的具体建议2",
        "针对该食物的具体建议3"
    ],
    "tips": [
        "健康提示1",
        "健康提示2"
    ]
}"""
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64.b64encode(image_data).decode('utf-8')}"
                        }
                    }
                ]
            }
        ]

        try:
            # Make API call with the defined messages
            response = client.chat.completions.create(
                model="gpt-4-vision-preview",
                messages=messages,
                max_tokens=1500
            )
            print(f"OpenAI API response status: {response.model_dump()}")
            
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
                    raise ValueError(f"Failed to parse OpenAI response: {str(e)}")
            else:
                raise ValueError("No response content from OpenAI")
                
        except openai.APIError as e:
            raise ValueError(f"OpenAI API error: {str(e)}")
        except Exception as e:
            raise ValueError(f"OpenAI request failed: {str(e)}")

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
        
        # 1. Validate Content-Type
        if not request.is_json:
            print(f"Invalid content type: {request.content_type}")
            return jsonify({
                'error': 'Invalid request format',
                'details': 'Content-Type must be application/json'
            }), 400
            
        # 2. Validate request body
        try:
            data = request.get_json()
        except Exception as e:
            print(f"JSON parsing error: {str(e)}")
            return jsonify({
                'error': 'Invalid JSON format',
                'details': str(e)
            }), 400

        print(f"Request data keys: {data.keys() if data else 'None'}")
        
        # 3. Validate image data presence and format
        if not data:
            return jsonify({
                'error': 'Empty request body',
                'details': 'Request body cannot be empty'
            }), 400
            
        if 'image' not in data:
            return jsonify({
                'error': 'Missing image data',
                'details': 'Request must include "image" field'
            }), 400
            
        image_data = data['image']
        
        # 4. Validate image data format
        if not isinstance(image_data, str):
            return jsonify({
                'error': 'Invalid image data type',
                'details': 'Image data must be a base64 string'
            }), 400
            
        # 5. Validate base64 format
        try:
            # Check if it's a data URL
            if 'base64,' in image_data:
                # Validate data URL format
                parts = image_data.split('base64,')
                if len(parts) != 2 or not parts[0].startswith('data:'):
                    raise ValueError("Invalid data URL format")
                base64_str = parts[1]
            else:
                base64_str = image_data
                
            # Try to decode base64
            image_bytes = base64.b64decode(base64_str)
            
            # Validate minimum image size
            if len(image_bytes) < 100:  # Arbitrary minimum size
                raise ValueError("Image data too small")
                
            # Try to open image to validate format
            try:
                with Image.open(io.BytesIO(image_bytes)) as img:
                    print(f"Valid image detected: format={img.format}, size={img.size}")
            except Exception as e:
                raise ValueError(f"Invalid image format: {str(e)}")
                
        except Exception as e:
            print(f"Image validation error: {str(e)}")
            return jsonify({
                'error': 'Invalid image data',
                'details': str(e)
            }), 400

        # 6. Validate OpenAI API key
        if not client.api_key:
            print("OpenAI API key not configured")
            return jsonify({
                'error': 'Server configuration error',
                'details': 'OpenAI API key not configured'
            }), 500

        # If all validation passes, proceed with analysis
        try:
            analysis_result = analyze_image_with_gpt4(image_data)
            if not analysis_result:
                return jsonify({
                    'error': 'Analysis failed',
                    'details': 'No results produced'
                }), 500
                
            # Validate analysis result structure
            required_keys = ['foods', 'basicNutrition', 'dialysisIndicators', 'suggestions', 'tips']
            missing_keys = [key for key in required_keys if key not in analysis_result]
            if missing_keys:
                print(f"Invalid analysis result structure. Missing keys: {missing_keys}")
                return jsonify({
                    'error': 'Invalid analysis result',
                    'details': f'Missing required fields: {", ".join(missing_keys)}'
                }), 500
                
            return jsonify({'result': analysis_result})
            
        except ValueError as e:
            print(f"Analysis value error: {str(e)}")
            return jsonify({
                'error': 'Analysis error',
                'details': str(e)
            }), 400
        except Exception as e:
            print(f"Analysis unexpected error: {type(e).__name__}: {str(e)}")
            return jsonify({
                'error': 'Server error',
                'details': str(e)
            }), 500

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
    print("\n=== Request Information ===")
    print(f"Time: {datetime.datetime.now()}")
    print(f"Method: {request.method}")
    print(f"Path: {request.path}")
    print(f"Headers: {dict(request.headers)}")
    print(f"Content-Type: {request.content_type}")
    print(f"Content-Length: {request.content_length}")
    print("=========================\n")

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