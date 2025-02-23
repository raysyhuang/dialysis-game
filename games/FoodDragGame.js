class FoodDragGame {
  constructor(foods) {
    this.foods = foods;
    this.selected = []; // Initialize empty selected array
  }

  // Add nutrient limits as class property for easier configuration
  nutrientLimits = {
    potassium: { min: 1500, max: 2000, name: '钾', unit: 'mg' },
    protein: { min: 60, max: 80, name: '蛋白质', unit: 'g' },
    phosphorus: { min: 800, max: 1000, name: '磷', unit: 'mg' },
    sodium: { min: 1500, max: 2000, name: '钠', unit: 'mg' }
  };

  checkNutrition() {
    // Initialize nutrients dynamically based on limits
    const nutrients = Object.keys(this.nutrientLimits).reduce((acc, nutrient) => {
      acc[nutrient] = 0;
      return acc;
    }, {});

    this.selected.forEach(food => {
      Object.keys(nutrients).forEach(nutrient => {
        nutrients[nutrient] += food[nutrient] || 0;
      });
    });

    return {
      isBalanced: this.checkNutrientBalance(nutrients),
      warnings: this.generateWarnings(nutrients),
      nutrients
    };
  }

  checkNutrientBalance(nutrients) {
    return Object.entries(nutrients).every(([nutrient, value]) => 
      value >= this.nutrientLimits[nutrient].min && 
      value <= this.nutrientLimits[nutrient].max
    );
  }

  generateWarnings(nutrients) {
    const warnings = [];
    
    Object.entries(this.nutrientLimits).forEach(([key, limit]) => {
      const value = nutrients[key];
      const pctOver = (value / limit.max - 1) * 100;
      const pctUnder = (1 - value / limit.min) * 100;

      if (value < limit.min) {
        warnings.push({
          message: `${limit.name}不足（${value}${limit.unit}），建议增加含${limit.name}食物`,
          severity: 'warning',
          nutrient: key,
          english: `${limit.name} too low (${value}${limit.unit}), consider adding ${limit.name}-rich foods`
        });
      }
      
      if (value > limit.max) {
        warnings.push({
          message: `${limit.name}过高（${value}${limit.unit}），建议减少含${limit.name}食物`,
          severity: 'error', 
          nutrient: key,
          english: `${limit.name} too high (${value}${limit.unit}), consider reducing ${limit.name}-rich foods`
        });
      }
    });

    return warnings;
  }
} 