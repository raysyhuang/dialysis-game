from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
from nutrition_service import nutrition_analyzer
from datetime import datetime

# Load environment variables
load_dotenv()

app = Flask(__name__)

@app.route('/api/analyze', methods=['POST'])
async def analyze():
    """Endpoint for analyzing food input (text or image)"""
    try:
        data = request.json
        food_input = data.get('food')
        image_data = data.get('image')
        meal_context = data.get('context', {})
        
        # Add meal time to context
        meal_context['meal_time'] = datetime.now().strftime('%H:%M')
        
        if not food_input and not image_data:
            return jsonify({'error': '未提供食物信息或图片'}), 400
        
        if image_data:
            # Remove the data:image/jpeg;base64, prefix if present
            if ',' in image_data:
                image_data = image_data.split(',')[1]
            analysis = await nutrition_analyzer.analyze_image(image_data, meal_context)
        else:
            analysis = await nutrition_analyzer.analyze_text_input(food_input, meal_context)
        
        if 'error' in analysis:
            return jsonify({'error': analysis['error']}), 500
            
        return jsonify({'analysis': analysis})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/recommendations', methods=['GET'])
async def get_recommendations():
    """Get personalized meal recommendations based on daily intake"""
    try:
        user_data = request.args
        daily_intake = {
            'protein': float(user_data.get('protein', 0)),
            'phosphorus': float(user_data.get('phosphorus', 0)),
            'potassium': float(user_data.get('potassium', 0)),
            'sodium': float(user_data.get('sodium', 0)),
            'fluid': float(user_data.get('fluid', 0))
        }
        
        meal_context = {
            'daily_intake': daily_intake,
            'meal_time': datetime.now().strftime('%H:%M')
        }
        
        # Use the nutrition analyzer to get recommendations
        recommendations = await nutrition_analyzer.analyze_text_input(
            "请根据我今天的营养摄入情况，推荐接下来的膳食。",
            meal_context
        )
        
        return jsonify({'recommendations': recommendations})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 