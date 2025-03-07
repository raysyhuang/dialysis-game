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

# Initialize Flask app
app = Flask(__name__, static_folder='.')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Allow up to 16MB uploads

# Configure CORS properly
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

# Configure OpenAI
api_key = os.getenv('OPENAI_API_KEY')
if not api_key:
    raise ValueError("OpenAI API key not found!")

openai.api_key = api_key

def analyze_image_with_gpt4(image_base64):
    try:
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
                        "text": """请仔细分析这张食物营养成分表图片。特别注意：
1. 如果营养成分表中明确显示数值为0，请使用该值而不是忽略
2. 请仔细查看所有营养值，包括钠、钾、磷等透析相关指标
3. 如果某项营养成分有标注NRV%，也请一并提取

请按照以下JSON格式返回（只返回JSON，不要其他文字）：
{
    "foods": ["食物1", "食物2"],
    "basicNutrition": {
        "calories": {"value": 0, "unit": "千卡", "nrv": null},
        "protein": {"value": 0, "unit": "g", "nrv": null},
        "fat": {"value": 0, "unit": "g", "nrv": null},
        "carbs": {"value": 0, "unit": "g", "nrv": null}
    },
    "dialysisIndicators": {
        "sodium": {
            "value": 0,
            "unit": "mg",
            "level": "低",
            "warning": false,
            "nrv": null
        },
        "potassium": {
            "value": 0,
            "unit": "mg",
            "level": "低",
            "warning": false,
            "nrv": null
        },
        "phosphorus": {
            "value": 0,
            "unit": "mg",
            "level": "低",
            "warning": false,
            "nrv": null
        }
    },
    "suggestions": [
        "建议1",
        "建议2",
        "建议3"
    ],
    "tips": [
        "提示1",
        "提示2"
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
            model="gpt-4o",  # Correct model name
            messages=messages,
            max_tokens=1000,  # Increased token limit
            temperature=0.7
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

    except Exception as e:
        print(f"Analysis error: {str(e)}")
        raise ValueError(f"图片分析错误: {str(e)}")

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok"})

@app.route('/analyze', methods=['POST'])
def analyze_food():
    try:
        if not request.is_json:
            print("Request is not JSON")
            return jsonify({'error': '请求格式错误'}), 400
            
        data = request.get_json()
        print("Received request data type:", type(data))
        
        if not data or 'image' not in data:
            print("No image in request")
            return jsonify({'error': '未提供图片数据'}), 400

        if not isinstance(data['image'], str):
            print("Image data is not string")
            return jsonify({'error': '图片格式错误'}), 400

        # Add size check
        if len(data['image']) > 10 * 1024 * 1024:  # 10MB limit
            return jsonify({'error': '图片太大'}), 413

        analysis_result = analyze_image_with_gpt4(data['image'])
        return jsonify({'result': analysis_result})

    except Exception as e:
        print(f"Error processing request: {str(e)}")
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

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3003))
    app.run(host='0.0.0.0', port=port, debug=True) 