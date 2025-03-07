// Shared nutrition database
const nutritionDatabase = {
    '米饭': { protein: 3, phosphorus: 43, potassium: 35, sodium: 1, calories: 130 },
    '面条': { protein: 5, phosphorus: 49, potassium: 44, sodium: 2, calories: 138 },
    '鸡蛋': { protein: 6, phosphorus: 86, potassium: 69, sodium: 71, calories: 78 },
    '面包': { protein: 4, phosphorus: 64, potassium: 108, sodium: 170, calories: 75 },
    '牛奶': { protein: 3.4, phosphorus: 93, potassium: 150, sodium: 43, calories: 42 },
    '豆浆': { protein: 3.6, phosphorus: 47, potassium: 141, sodium: 14, calories: 31 },
    '豆腐': { protein: 8, phosphorus: 83, potassium: 121, sodium: 7, calories: 76 },
    '鸡肉': { protein: 27, phosphorus: 155, potassium: 220, sodium: 66, calories: 165 },
    '牛肉': { protein: 26, phosphorus: 178, potassium: 305, sodium: 54, calories: 250 },
    '猪肉': { protein: 22, phosphorus: 152, potassium: 289, sodium: 55, calories: 242 },
    '鱼': { protein: 20, phosphorus: 190, potassium: 300, sodium: 60, calories: 100 },
    '西红柿': { protein: 0.9, phosphorus: 24, potassium: 237, sodium: 5, calories: 18 },
    '黄瓜': { protein: 0.6, phosphorus: 21, potassium: 136, sodium: 2, calories: 15 },
    '青菜': { protein: 1.5, phosphorus: 30, potassium: 180, sodium: 35, calories: 20 },
    '米粉': { protein: 3.2, phosphorus: 40, potassium: 30, sodium: 1, calories: 109 },
    '馒头': { protein: 5.5, phosphorus: 67, potassium: 46, sodium: 230, calories: 223 },
    '饺子': { protein: 8, phosphorus: 62, potassium: 65, sodium: 120, calories: 180 },
    '水果': { protein: 0.5, phosphorus: 20, potassium: 200, sodium: 2, calories: 70 },
    '炒菜': { protein: 5, phosphorus: 60, potassium: 150, sodium: 170, calories: 100 },
    '蔬菜': { protein: 1.2, phosphorus: 25, potassium: 170, sodium: 20, calories: 25 },
    '肉': { protein: 22, phosphorus: 160, potassium: 270, sodium: 60, calories: 250 },
};

// Daily recommended limits for dialysis patients
const DAILY_LIMITS = {
    protein: { min: 60, max: 80, unit: 'g', description: '透析患者每日蛋白质建议量' },
    phosphorus: { min: 800, max: 1000, unit: 'mg', description: '磷摄入量上限' },
    potassium: { min: 2000, max: 2500, unit: 'mg', description: '钾摄入量上限' },
    sodium: { min: 1500, max: 2000, unit: 'mg', description: '钠摄入量上限' },
    calories: { min: 1800, max: 2200, unit: 'kcal', description: '热量建议量' },
    fluid: { min: 500, max: 1000, unit: 'ml', description: '液体摄入量上限' }
};

// Meal timing recommendations
const MEAL_TIMES = {
    breakfast: { start: '06:00', end: '09:00', recommended: true },
    morningSnack: { start: '09:30', end: '10:30', recommended: false },
    lunch: { start: '11:30', end: '13:30', recommended: true },
    afternoonSnack: { start: '15:00', end: '16:00', recommended: false },
    dinner: { start: '17:30', end: '19:30', recommended: true },
    nightSnack: { start: '20:30', end: '21:30', recommended: false }
};

// Food emoji mapping
const foodEmojis = {
    '米饭': '🍚',
    '面条': '🍜',
    '鸡蛋': '🥚',
    '面包': '🍞',
    '牛奶': '🥛',
    '豆浆': '🥛',
    '豆腐': '🧊',
    '鸡肉': '🍗',
    '牛肉': '🥩',
    '猪肉': '🥩',
    '鱼': '🐟',
    '西红柿': '🍅',
    '番茄': '🍅',
    '黄瓜': '🥒',
    '青菜': '🥬',
    '米粉': '🍜',
    '馒头': '🥠',
    '饺子': '🥟',
    '水果': '🍎',
    '炒菜': '🥘',
    '蔬菜': '🥬',
    '肉': '🥩'
};

// Nutrition risk levels
const RISK_LEVELS = {
    LOW: { color: '#4CAF50', label: '安全' },
    MEDIUM: { color: '#FFC107', label: '注意' },
    HIGH: { color: '#F44336', label: '警告' }
};

// Analyze food items and return nutritional information
function analyzeFoodItems(foodItems) {
    let totalProteins = 0;
    let totalPhosphorus = 0;
    let totalPotassium = 0;
    let totalSodium = 0;
    let totalCalories = 0;
    let totalFat = 0;
    let totalCarbs = 0;
    
    const defaultServing = 1;
    
    foodItems.forEach(item => {
        item = item.trim();
        if (!item) return;
        
        let quantity = defaultServing;
        let foodName = item;
        
        const quantityPatterns = {
            '一': 1, '两': 2, '三': 3, '四': 4, '五': 5, 
            '1': 1, '2': 2, '3': 3, '4': 4, '5': 5,
            '半': 0.5, '一半': 0.5
        };
        
        for (const [pattern, value] of Object.entries(quantityPatterns)) {
            if (item.startsWith(pattern)) {
                const measureWords = ['碗', '个', '份', '片', '盘', '杯', '块'];
                for (const measure of measureWords) {
                    if (item.includes(pattern + measure)) {
                        quantity = value;
                        foodName = item.substring(pattern.length + measure.length);
                        break;
                    }
                }
                break;
            }
        }
        
        let nutrition = nutritionDatabase[foodName];
        
        if (!nutrition) {
            for (const [dbFood, dbNutrition] of Object.entries(nutritionDatabase)) {
                if (foodName.includes(dbFood)) {
                    nutrition = dbNutrition;
                    break;
                }
            }
        }
        
        if (!nutrition) {
            nutrition = { 
                protein: 4, 
                phosphorus: 50, 
                potassium: 100, 
                sodium: 50, 
                calories: 100,
                fat: 5,
                carbs: 15
            };
        }
        
        totalProteins += nutrition.protein * quantity;
        totalPhosphorus += nutrition.phosphorus * quantity;
        totalPotassium += nutrition.potassium * quantity;
        totalSodium += nutrition.sodium * quantity;
        totalCalories += nutrition.calories * quantity;
        totalFat += (nutrition.fat || 5) * quantity;
        totalCarbs += (nutrition.carbs || 15) * quantity;
    });
    
    return {
        proteins: Math.round(totalProteins),
        phosphorus: Math.round(totalPhosphorus),
        potassium: Math.round(totalPotassium),
        sodium: Math.round(totalSodium),
        calories: Math.round(totalCalories),
        fat: Math.round(totalFat),
        carbs: Math.round(totalCarbs)
    };
}

// Calculate risk level for each nutrient
function calculateNutrientRisk(nutrientValue, nutrientType) {
    const limits = DAILY_LIMITS[nutrientType];
    if (!limits) return null;
    
    const percentage = (nutrientValue / limits.max) * 100;
    
    if (percentage < 70) {
        return RISK_LEVELS.LOW;
    } else if (percentage < 90) {
        return RISK_LEVELS.MEDIUM;
    } else {
        return RISK_LEVELS.HIGH;
    }
}

// Format nutrition value with unit
function formatNutritionValue(value, nutrientType) {
    const unit = DAILY_LIMITS[nutrientType]?.unit || '';
    return `${Math.round(value)}${unit}`;
}

// Check if current time is within recommended meal times
function isRecommendedMealTime() {
    const now = new Date();
    const currentTime = now.toLocaleTimeString('en-US', { hour12: false });
    
    for (const [meal, time] of Object.entries(MEAL_TIMES)) {
        if (currentTime >= time.start && currentTime <= time.end) {
            return {
                isMealTime: true,
                isRecommended: time.recommended,
                mealName: meal
            };
        }
    }
    
    return {
        isMealTime: false,
        isRecommended: false,
        mealName: null
    };
}

// Generate food tags with emojis
function generateFoodTags(foodItems) {
    return foodItems.map(item => {
        item = item.trim();
        if (!item) return '';
        
        let emoji = '🍽️';
        for (const [food, foodEmoji] of Object.entries(foodEmojis)) {
            if (item.includes(food)) {
                emoji = foodEmoji;
                break;
            }
        }
        
        return `
            <div class="food-tag">
                <span class="food-emoji">${emoji}</span>
                <span class="food-name">${item}</span>
            </div>
        `;
    }).join('');
}

// Show tooltip message with optional type (success, warning, error)
function showTooltip(message, type = 'info') {
    const tooltip = document.getElementById('tooltip') || createTooltip();
    tooltip.textContent = message;
    tooltip.className = `tooltip tooltip-${type}`;
    tooltip.classList.add('visible');
    
    setTimeout(() => {
        tooltip.classList.remove('visible');
    }, 3000);
}

// Create tooltip element if it doesn't exist
function createTooltip() {
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltip';
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);
    return tooltip;
}

// Get nutrition recommendations based on current values
function getNutritionRecommendations(currentNutrition) {
    const recommendations = [];
    
    for (const [nutrient, value] of Object.entries(currentNutrition)) {
        const limits = DAILY_LIMITS[nutrient];
        if (!limits) continue;
        
        const percentage = (value / limits.max) * 100;
        
        if (percentage > 90) {
            recommendations.push({
                nutrient,
                message: `${limits.description}已接近上限，请注意控制`,
                priority: 'high'
            });
        } else if (percentage < 50 && limits.min) {
            recommendations.push({
                nutrient,
                message: `${limits.description}偏低，建议适当增加`,
                priority: 'medium'
            });
        }
    }
    
    return recommendations;
}

// Export functions for use in other files
window.shared = {
    nutritionDatabase,
    foodEmojis,
    DAILY_LIMITS,
    MEAL_TIMES,
    RISK_LEVELS,
    analyzeFoodItems,
    calculateNutrientRisk,
    formatNutritionValue,
    isRecommendedMealTime,
    generateFoodTags,
    showTooltip,
    createTooltip,
    getNutritionRecommendations
}; 