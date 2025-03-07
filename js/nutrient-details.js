/**
 * Nutrient Details Module
 * Provides detailed information about nutrients when users interact with nutrient progress bars
 */
(function() {
    // Nutrient display names to internal keys mapping
    const nutrientDisplayToKey = {
        '蛋白质': 'protein',
        '脂肪': 'fat',
        '碳水化合物': 'carbs',
        '钠': 'sodium',
        '钾': 'potassium',
        '磷': 'phosphorus',
        '钙': 'calcium'
    };
    
    // Nutrient descriptions
    const nutrientDescriptions = {
        'protein': '蛋白质是人体必需的营养素，对于透析患者来说，需要适量摄入高生物价值的蛋白质，以补充透析过程中的蛋白质流失。',
        'fat': '脂肪是重要的能量来源，但透析患者应控制饱和脂肪的摄入，选择健康的不饱和脂肪。',
        'carbs': '碳水化合物是主要的能量来源，透析患者应选择复合碳水化合物，避免简单糖的过量摄入。',
        'sodium': '钠是电解质之一，透析患者通常需要限制钠的摄入，以控制口渴感和体液潴留。',
        'potassium': '钾是重要的电解质，透析患者通常需要限制钾的摄入，因为肾功能不全会导致钾在体内积累。',
        'phosphorus': '磷是矿物质之一，透析患者需要限制磷的摄入，因为高磷血症会导致骨骼问题和心血管并发症。',
        'calcium': '钙是重要的矿物质，对骨骼健康至关重要，透析患者需要在医生指导下适量补充钙。'
    };
    
    // Food sources for each nutrient
    const nutrientFoodSources = {
        'protein': ['瘦肉', '鱼', '蛋白', '豆腐', '低磷奶制品'],
        'fat': ['橄榄油', '坚果', '鱼油', '牛油果'],
        'carbs': ['全麦面包', '糙米', '燕麦', '薯类'],
        'sodium': ['加工食品', '腌制食品', '方便面', '酱油'],
        'potassium': ['香蕉', '土豆', '橙子', '西红柿', '菠菜'],
        'phosphorus': ['乳制品', '坚果', '全谷物', '可乐饮料'],
        'calcium': ['低磷奶制品', '豆腐', '强化食品']
    };
    
    // Recommendations based on intake percentage
    const getRecommendations = (nutrientKey, percentage) => {
        if (percentage < 50) {
            switch (nutrientKey) {
                case 'protein':
                    return '您的蛋白质摄入不足，建议适当增加瘦肉、鱼类或豆腐等优质蛋白来源。';
                case 'fat':
                    return '您的脂肪摄入较低，可以适当增加健康脂肪如橄榄油、坚果等。';
                case 'carbs':
                    return '您的碳水化合物摄入不足，可以适当增加全谷物、薯类等复合碳水化合物。';
                case 'calcium':
                    return '您的钙摄入不足，请在医生指导下考虑适当补充钙。';
                default:
                    return '您的摄入量较低，请参考食物来源适当调整。';
            }
        } else if (percentage > 100) {
            switch (nutrientKey) {
                case 'sodium':
                    return '您的钠摄入过高，建议减少加工食品、腌制食品的摄入，选择新鲜食材。';
                case 'potassium':
                    return '您的钾摄入过高，建议减少高钾食物的摄入，如香蕉、土豆等。烹饪前可以浸泡和煮沸蔬菜以减少钾含量。';
                case 'phosphorus':
                    return '您的磷摄入过高，建议减少高磷食物的摄入，如乳制品、坚果等。可以考虑在医生指导下使用磷结合剂。';
                default:
                    return '您的摄入量超过推荐值，请适当控制。';
            }
        } else {
            return '您的摄入量在合理范围内，请继续保持良好的饮食习惯。';
        }
    };
    
    // Initialize nutrient details functionality
    const initializeNutrientDetails = () => {
        // Make nutrient progress bars clickable
        const nutrientProgressBars = document.querySelectorAll('.nutrient-progress');
        nutrientProgressBars.forEach(bar => {
            bar.addEventListener('click', function() {
                const nutrientName = this.querySelector('.nutrient-name').textContent;
                showNutrientDetails(nutrientName);
            });
        });
        
        // Close button functionality
        const closeBtn = document.querySelector('.nutrient-details-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                const modal = document.querySelector('.nutrient-details-modal');
                modal.classList.remove('active');
            });
        }
    };
    
    // Get nutrient key from display name
    const getNutrientKey = (displayName) => {
        return nutrientDisplayToKey[displayName] || '';
    };
    
    // Show nutrient details in modal
    const showNutrientDetails = (nutrientDisplayName) => {
        const nutrientKey = getNutrientKey(nutrientDisplayName);
        if (!nutrientKey) return;
        
        // Get current intake and recommended values
        // This would normally come from your app's data
        const currentIntake = 50; // Example value
        const recommendedIntake = 100; // Example value
        const percentage = (currentIntake / recommendedIntake) * 100;
        
        // Update modal content
        const modal = document.querySelector('.nutrient-details-modal');
        const currentValueEl = modal.querySelector('.nutrient-current-value');
        const percentageEl = modal.querySelector('.nutrient-percentage');
        const descriptionEl = modal.querySelector('.nutrient-description');
        const foodSourcesEl = modal.querySelector('.food-source-list');
        const recommendationEl = modal.querySelector('.recommendation-text');
        
        // Set values
        currentValueEl.textContent = `${currentIntake}g / 推荐 ${recommendedIntake}g`;
        percentageEl.textContent = `${Math.round(percentage)}%`;
        descriptionEl.textContent = nutrientDescriptions[nutrientKey] || '暂无描述';
        
        // Add food sources
        foodSourcesEl.innerHTML = '';
        if (nutrientFoodSources[nutrientKey]) {
            nutrientFoodSources[nutrientKey].forEach(food => {
                const foodItem = document.createElement('span');
                foodItem.className = 'food-source-item';
                foodItem.textContent = food;
                foodSourcesEl.appendChild(foodItem);
            });
        }
        
        // Set recommendation
        recommendationEl.textContent = getRecommendations(nutrientKey, percentage);
        
        // Show modal
        modal.classList.add('active');
        
        // In a real implementation, you would also render a chart here
        // showing nutrient intake trends over time
    };
    
    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', initializeNutrientDetails);
})();
