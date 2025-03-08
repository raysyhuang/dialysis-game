from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import base64
import os
import openai
from dotenv import load_dotenv
from PIL import Image
import io
import json

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
        # Check image size
        image_size = len(image_base64) * 3/4  # Approximate size of decoded base64
        if image_size > 20 * 1024 * 1024:  # 20MB limit
            raise ValueError("图片太大，请压缩后重试")

        # Decode base64 image
        if 'base64,' in image_base64:
            image_base64 = image_base64.split('base64,')[1]
        image_data = base64.b64decode(image_base64)
        
        # Convert to JPEG format
        image = Image.open(io.BytesIO(image_data))
        if image.format not in ['JPEG', 'PNG', 'WEBP']:
            image = image.convert('RGB')
            img_byte_arr = io.BytesIO()
            image.save(img_byte_arr, format='JPEG')
            image_data = img_byte_arr.getvalue()
        
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

        # Make API call to OpenAI
        response = openai.chat.completions.create(
            model="gpt-4",
            messages=messages,
            max_tokens=1000
        )
        
        print("OpenAI Response:", response)  # Debug log
        
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

    except MemoryError:
        print("Memory error occurred during image processing")
        raise ValueError("服务器内存不足，请稍后重试或使用较小的图片")
    except Exception as e:
        print(f"Analysis error: {str(e)}")
        raise ValueError(f"图片分析错误: {str(e)}")

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok"})

@app.route('/analyze', methods=['POST'])
def analyze_food():
    try:
        print("Received analyze request")
        if not request.is_json:
            print("Request is not JSON")
            return jsonify({'error': '请求格式错误'}), 400
            
        data = request.get_json()
        print("Received request data:", data.keys())
        
        if not data or 'image' not in data:
            print("No image in request")
            return jsonify({'error': '未提供图片数据'}), 400

        # Add debug logging
        print("Starting image analysis...")
        analysis_result = analyze_image_with_gpt4(data['image'])
        print("Analysis result:", analysis_result)  # Add this line
        
        if not analysis_result:
            print("Analysis returned None")
            return jsonify({'error': '图片分析失败'}), 500

        return jsonify({'result': analysis_result})

    except Exception as e:
        print(f"Error in analyze_food: {str(e)}")  # Detailed error logging
        return jsonify({'error': str(e)}), 500

@app.errorhandler(Exception)
def handle_error(error):
    print(f"Server Error: {str(error)}")
    return jsonify({
        'error': '服务器错误，请稍后重试',
        'details': str(error)
    }), 500

@app.before_request
def log_request_info():
    print('Headers:', dict(request.headers))
    print('Body:', request.get_data().decode())

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Cache-Control,Pragma')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=port, debug=False) 