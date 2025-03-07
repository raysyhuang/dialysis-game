from typing import Dict, List, Optional
import openai
from dotenv import load_dotenv
import os
import json
from datetime import datetime

# Load environment variables
load_dotenv()

# Configure OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

class NutritionAnalyzer:
    def __init__(self):
        self.model = "gpt-4-1106-preview"
        self.vision_model = "gpt-4-vision-preview"
        self.dialysis_limits = {
            "potassium": {"min": 1500, "max": 2000, "unit": "mg"},
            "phosphorus": {"min": 800, "max": 1000, "unit": "mg"},
            "sodium": {"min": 1500, "max": 2000, "unit": "mg"},
            "protein": {"min": 60, "max": 80, "unit": "g"},
            "fluid": {"max": 1000, "unit": "ml"}
        }

    async def analyze_text_input(self, text: str, meal_context: Optional[Dict] = None) -> Dict:
        """Analyze food description using GPT-4"""
        system_prompt = self._create_system_prompt(meal_context)
        
        try:
            response = await openai.ChatCompletion.acreate(
                model=self.model,
                response_format={"type": "json_object"},
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": f"分析这顿饭的营养成分：{text}"}
                ]
            )
            
            analysis = json.loads(response.choices[0].message.content)
            return self._enhance_analysis(analysis, meal_context)
        except Exception as e:
            print(f"Error analyzing text input: {e}")
            return {"error": str(e)}

    async def analyze_image(self, image_data: str, meal_context: Optional[Dict] = None) -> Dict:
        """Analyze food image using GPT-4 Vision"""
        try:
            response = await openai.ChatCompletion.acreate(
                model=self.vision_model,
                messages=[
                    {
                        "role": "system",
                        "content": self._create_vision_system_prompt()
                    },
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": "请分析这张食物图片的营养成分，特别关注透析患者需要注意的营养素。"},
                            {
                                "type": "image_url",
                                "image_url": {"url": f"data:image/jpeg;base64,{image_data}"}
                            }
                        ]
                    }
                ]
            )
            
            analysis = json.loads(response.choices[0].message.content)
            return self._enhance_analysis(analysis, meal_context)
        except Exception as e:
            print(f"Error analyzing image: {e}")
            return {"error": str(e)}

    def _create_system_prompt(self, meal_context: Optional[Dict] = None) -> str:
        """Create system prompt for GPT, incorporating meal context if available"""
        base_prompt = f"""你是一位专门为透析患者服务的AI营养师。请分析输入的食物信息，考虑以下限制：

透析患者的每日营养限制：
- 磷: {self.dialysis_limits['phosphorus']['min']}-{self.dialysis_limits['phosphorus']['max']}{self.dialysis_limits['phosphorus']['unit']}
- 钾: {self.dialysis_limits['potassium']['min']}-{self.dialysis_limits['potassium']['max']}{self.dialysis_limits['potassium']['unit']}
- 钠: {self.dialysis_limits['sodium']['min']}-{self.dialysis_limits['sodium']['max']}{self.dialysis_limits['sodium']['unit']}
- 蛋白质需求: {self.dialysis_limits['protein']['min']}-{self.dialysis_limits['protein']['max']}{self.dialysis_limits['protein']['unit']}
- 液体限制: {self.dialysis_limits['fluid']['max']}{self.dialysis_limits['fluid']['unit']}

请提供以下信息：
1. 详细的营养成分分析
2. 针对透析患者的特别建议
3. 可能的风险警告
4. 更健康的替代选择建议
5. 烹饪方法建议（减少钾、磷、钠的摄入）

输出格式要求为JSON，包含以下字段：
{
    "foods": [
        {
            "name": string,
            "emoji": string,
            "portion": string,
            "nutrients": {
                "protein": number,
                "phosphorus": number,
                "potassium": number,
                "sodium": number,
                "fluid": number
            }
        }
    ],
    "total_nutrients": {
        "protein": number,
        "phosphorus": number,
        "potassium": number,
        "sodium": number,
        "fluid": number
    },
    "healthScore": number,
    "recommendations": string,
    "warnings": [string],
    "cooking_tips": string,
    "alternatives": [string]
}"""

        if meal_context:
            base_prompt += f"\n\n当前用餐背景：\n- 今日已摄入：{json.dumps(meal_context.get('daily_intake', {}), ensure_ascii=False)}\n- 用餐时间：{meal_context.get('meal_time', '未指定')}"

        return base_prompt

    def _create_vision_system_prompt(self) -> str:
        """Create system prompt for vision analysis"""
        return self._create_system_prompt() + "\n\n请基于图片内容进行分析，注意识别食物种类、份量和烹饪方法。"

    def _enhance_analysis(self, analysis: Dict, meal_context: Optional[Dict] = None) -> Dict:
        """Enhance the analysis with additional insights and warnings"""
        if not meal_context:
            return analysis

        daily_intake = meal_context.get('daily_intake', {})
        enhanced = analysis.copy()
        
        # Calculate remaining allowances
        remaining = {}
        for nutrient, limits in self.dialysis_limits.items():
            current = daily_intake.get(nutrient, 0) + analysis['total_nutrients'].get(nutrient, 0)
            max_limit = limits.get('max', float('inf'))
            remaining[nutrient] = max_limit - current

        # Add personalized warnings based on remaining allowances
        warnings = analysis.get('warnings', [])
        for nutrient, amount in remaining.items():
            if amount < 0:
                warnings.append(f"警告：今日{nutrient}摄入已超出限制！")
            elif amount < (self.dialysis_limits[nutrient].get('max', float('inf')) * 0.2):
                warnings.append(f"注意：今日{nutrient}摄入接近限制。")

        enhanced['warnings'] = warnings
        enhanced['remaining_allowances'] = remaining
        enhanced['analysis_time'] = datetime.now().isoformat()

        return enhanced

# Initialize the analyzer
nutrition_analyzer = NutritionAnalyzer() 