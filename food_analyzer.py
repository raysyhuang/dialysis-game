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
CORS(app, resources={r"/analyze": {"origins": "*"}})

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

# Configure OpenAI
api_key = os.getenv('OPENAI_API_KEY')
if not api_key:
    raise ValueError("OPENAI_API_KEY not found in environment variables")

if api_key.startswith('"') and api_key.endswith('"'):
    api_key = api_key[1:-1]  # Remove quotes if present

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
                        "text": """请分析这张食物图片，并严格按照以下JSON格式返回（只返回JSON，不要其他文字）：
{
    "foods": ["食物1", "食物2"],
    "basicNutrition": {
        "calories": {"value": 0, "unit": "千卡"},
        "protein": {"value": 0, "unit": "g"},
        "fat": {"value": 0, "unit": "g"},
        "carbs": {"value": 0, "unit": "g"}
    },
    "dialysisIndicators": {
        "sodium": {
            "value": 0,
            "unit": "mg",
            "level": "低",
            "warning": false
        },
        "potassium": {
            "value": 0,
            "unit": "mg",
            "level": "低",
            "warning": false
        },
        "phosphorus": {
            "value": 0,
            "unit": "mg",
            "level": "低",
            "warning": false
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
            model="gpt-4o",  # Make sure to use the correct model
            messages=messages,
            max_tokens=500
        )
        
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
                        "calories": {"value": 0, "unit": "千卡"},
                        "protein": {"value": 0, "unit": "g"},
                        "fat": {"value": 0, "unit": "g"},
                        "carbs": {"value": 0, "unit": "g"}
                    },
                    "dialysisIndicators": {
                        "sodium": {"value": 0, "unit": "mg", "level": "低", "warning": false},
                        "potassium": {"value": 0, "unit": "mg", "level": "低", "warning": false},
                        "phosphorus": {"value": 0, "unit": "mg", "level": "低", "warning": false}
                    },
                    "suggestions": ["请重新尝试分析"],
                    "tips": ["请重新尝试分析"]
                }
        return None

    except Exception as e:
        print(f"Analysis error: {str(e)}")
        raise ValueError(f"图片分析错误: {str(e)}")

@app.route('/analyze', methods=['POST'])
def analyze_food():
    try:
        data = request.json
        if not data or 'image' not in data:
            return jsonify({'error': '未提供图片数据'}), 400

        analysis_result = analyze_image_with_gpt4(data['image'])
        if not analysis_result:
            return jsonify({'error': '图片分析失败'}), 500

        return jsonify({'result': analysis_result})

    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': f"发生意外错误: {str(e)}"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3003))
    app.run(host='0.0.0.0', port=port) 