const questionsDatabase = [
    {
        question: "哪种主食更适合透析患者？",
        options: [
            { text: "土豆泥", icon: "🥔", correct: false },
            { text: "玉米饼", icon: "🌽", correct: false },
            { text: "白米饭", icon: "🍚", correct: true },
            { text: "杂粮饭", icon: "🌾", correct: false }
        ],
        explanation: "白米饭钾含量最低，杂粮和根茎类主食含钾较高要少吃"
    },
    {
        question: "想吃水果该选哪个？",
        options: [
            { text: "1串葡萄", icon: "🍇", correct: false },
            { text: "1个小苹果", icon: "🍎", correct: true },
            { text: "1根香蕉", icon: "🍌", correct: false },
            { text: "1个橙子", icon: "🍊", correct: false }
        ],
        explanation: "苹果含钾最低，每天可吃1个小的（约150g），其他高钾水果要避免"
    },
    {
        question: "哪种烹饪方式更健康？",
        options: [
            { text: "腌咸菜", icon: "🥒", correct: false },
            { text: "油炸鸡", icon: "🍗", correct: false },
            { text: "清蒸鱼", icon: "🐟", correct: true },
            { text: "红烧肉", icon: "🥩", correct: false }
        ],
        explanation: "清蒸最健康，少油少盐。腌制品太咸，油炸食品磷含量高"
    },
    {
        question: "每天可以吃几个鸡蛋？",
        options: [
            { text: "不能吃", icon: "🚫", correct: false },
            { text: "只吃蛋白", icon: "🍳", correct: false },
            { text: "1个", icon: "🥚", correct: true },
            { text: "3个", icon: "🥚🥚🥚", correct: false }
        ],
        explanation: "每天1个全蛋最佳，提供优质蛋白又不会过量"
    },
    {
        question: "哪种蔬菜要先焯水？",
        options: [
            { text: "萝卜", icon: "🥕", correct: false },
            { text: "菠菜", icon: "🥬", correct: true },
            { text: "黄瓜", icon: "🥒", correct: false },
            { text: "白菜", icon: "🥬", correct: false }
        ],
        explanation: "菠菜等绿叶菜焯水3分钟可去除部分钾，其他低钾蔬菜不用焯"
    },
    {
        question: "口渴时最好喝？",
        options: [
            { text: "冰可乐", icon: "🥤", correct: false },
            { text: "珍珠奶茶", icon: "🧋", correct: false },
            { text: "小口温水", icon: "🚰", correct: true },
            { text: "鲜榨果汁", icon: "🍹", correct: false }
        ],
        explanation: "小口喝温水最解渴，饮料含糖和磷高，要避免"
    },
    {
        question: "外出就餐要注意？",
        options: [
            { text: "喝光汤底", icon: "🥣", correct: false },
            { text: "多吃配菜", icon: "🥗", correct: false },
            { text: "涮水去盐", icon: "🍲", correct: true },
            { text: "自带米饭", icon: "🍚", correct: false }
        ],
        explanation: "外食过咸时可用清水涮菜，避免喝汤，汤里盐和磷含量高"
    },
    {
        question: "哪种零食可以偶尔吃？",
        options: [
            { text: "巧克力", icon: "🍫", correct: false },
            { text: "原味米饼", icon: "🍘", correct: true },
            { text: "坚果", icon: "🥜", correct: false },
            { text: "薯片", icon: "🥔", correct: false }
        ],
        explanation: "米饼相对低磷低钾，其他零食含盐/磷/钾都太高"
    },
    {
        question: "每天最多能吃多少肉？",
        options: [
            { text: "不吃肉", icon: "🚫", correct: false },
            { text: "不限量", icon: "♾️", correct: false },
            { text: "扑克牌大小", icon: "🃏", correct: true },
            { text: "手掌大小", icon: "✋", correct: false }
        ],
        explanation: "每天2两肉（约扑克牌大小），优先选鸡胸肉、鱼肉等白肉"
    },
    {
        question: "哪种饮品可以喝？",
        options: [
            { text: "骨头汤", icon: "🍖", correct: false },
            { text: "运动饮料", icon: "🏃", correct: false },
            { text: "淡柠檬水", icon: "🍋", correct: true },
            { text: "奶茶", icon: "🧋", correct: false }
        ],
        explanation: "淡柠檬水（1片柠檬泡500ml水）可增加风味，其他饮品磷钾含量高"
    },
    {
        question: "吃火锅要注意什么？",
        options: [
            { text: "多蘸酱料", icon: "🥢", correct: false },
            { text: "不喝汤", icon: "🚫🥣", correct: true },
            { text: "多吃豆腐", icon: "🥟", correct: false },
            { text: "煮久一点", icon: "🕒", correct: false }
        ],
        explanation: "火锅汤含大量磷和嘌呤，豆腐、酱料含盐高，都要避免"
    },
    {
        question: "哪种早餐组合最好？",
        options: [
            { text: "粥+咸菜", icon: "🍚🥒", correct: false },
            { text: "豆浆+油条", icon: "🥛🥖", correct: false },
            { text: "馒头+鸡蛋", icon: "🍞🥚", correct: true },
            { text: "牛奶+麦片", icon: "🥛🌾", correct: false }
        ],
        explanation: "馒头提供碳水，鸡蛋补充蛋白。粥含水多，咸菜太咸，牛奶磷高"
    },
    {
        question: "以下哪种蔬菜含钾最少？",
        options: [
            { text: "茄子", icon: "🍆", correct: false },
            { text: "青椒", icon: "🫑", correct: false },
            { text: "白萝卜", icon: "🥕", correct: true },
            { text: "西红柿", icon: "🍅", correct: false }
        ],
        explanation: "白萝卜含钾量低，可以多吃。西红柿、茄子等蔬菜含钾量高要少吃"
    },
    {
        question: "煮青菜时要注意什么？",
        options: [
            { text: "加很多盐", icon: "🧂", correct: false },
            { text: "焯水后换水煮", icon: "♨️", correct: true },
            { text: "直接煮熟", icon: "🥬", correct: false },
            { text: "煮很久", icon: "⏰", correct: false }
        ],
        explanation: "先焯水3-5分钟倒掉水，再换清水煮，可以去除部分钾质"
    },
    {
        question: "一餐吃多少主食合适？",
        options: [
            { text: "吃到饱", icon: "🍽️", correct: false },
            { text: "不吃主食", icon: "❌", correct: false },
            { text: "一个拳头大小", icon: "✊", correct: true },
            { text: "随便吃", icon: "🍚", correct: false }
        ],
        explanation: "每餐主食量约一个拳头大小（约150克），可根据医嘱调整"
    },
    {
        question: "以下哪种汤不能喝？",
        options: [
            { text: "冬瓜汤", icon: "🥗", correct: false },
            { text: "海带汤", icon: "🌊", correct: true },
            { text: "白萝卜汤", icon: "🥕", correct: false },
            { text: "西湖汤", icon: "🥣", correct: false }
        ],
        explanation: "海带含钾和碘都很高，不适合透析患者。可以喝清淡的白萝卜汤或冬瓜汤"
    },
    {
        question: "以下哪种肉类最适合？",
        options: [
            { text: "火腿肠", icon: "🌭", correct: false },
            { text: "内脏", icon: "🫀", correct: false },
            { text: "瘦猪肉", icon: "🥩", correct: true },
            { text: "肥肉", icon: "🍖", correct: false }
        ],
        explanation: "瘦肉蛋白质高磷低，内脏磷高，加工肉制品盐分高，都不适合"
    },
    {
        question: "饭前应该怎么吃药？",
        options: [
            { text: "自己调整量", icon: "❌", correct: false },
            { text: "觉得难受再吃", icon: "😣", correct: false },
            { text: "遵医嘱服用", icon: "💊", correct: true },
            { text: "想起来就吃", icon: "🤔", correct: false }
        ],
        explanation: "磷结合剂要在吃饭时服用，其他药物按医生要求的时间服用"
    },
    {
        question: "以下哪种调味料可以多用？",
        options: [
            { text: "料酒", icon: "🍾", correct: false },
            { text: "醋", icon: "🍶", correct: true },
            { text: "蚝油", icon: "🥫", correct: false },
            { text: "酱油", icon: "🫙", correct: false }
        ],
        explanation: "醋可以增加风味且不含钠，其他调味料含钠量都较高"
    },
    {
        question: "夏天解暑可以吃什么？",
        options: [
            { text: "西瓜", icon: "🍉", correct: false },
            { text: "椰子水", icon: "🥥", correct: false },
            { text: "冰镇黄瓜", icon: "🥒", correct: true },
            { text: "冰淇淋", icon: "🍦", correct: false }
        ],
        explanation: "黄瓜水分多又低钾，西瓜和椰子水钾高，冰淇淋磷高"
    },
    {
        question: "以下哪种主食可以搭配？",
        options: [
            { text: "紫米饭", icon: "🍚", correct: false },
            { text: "红薯", icon: "🍠", correct: false },
            { text: "白馒头", icon: "🍞", correct: true },
            { text: "全麦面包", icon: "🥖", correct: false }
        ],
        explanation: "白面制品钾含量低，全麦和杂粮类主食钾含量高"
    },
    {
        question: "做菜时应该？",
        options: [
            { text: "放足味精", icon: "🧂", correct: false },
            { text: "煮得烂熟", icon: "♨️", correct: false },
            { text: "控油少盐", icon: "🥗", correct: true },
            { text: "放很多油", icon: "🫗", correct: false }
        ],
        explanation: "清淡饮食，少油少盐，保持食材本味更健康"
    },
    {
        question: "以下哪种豆制品可以吃？",
        options: [
            { text: "腐竹", icon: "🥢", correct: false },
            { text: "豆腐花", icon: "🧊", correct: true },
            { text: "毛豆", icon: "🫘", correct: false },
            { text: "豆浆", icon: "🥛", correct: false }
        ],
        explanation: "豆腐花蛋白适中磷低，其他豆制品磷含量都较高"
    },
    {
        question: "饭后水果怎么吃？",
        options: [
            { text: "随便吃", icon: "🤷", correct: false },
            { text: "等半小时再吃", icon: "⏰", correct: true },
            { text: "马上吃", icon: "🍎", correct: false },
            { text: "吃到饱", icon: "🍇", correct: false }
        ],
        explanation: "饭后半小时再吃水果，每次限量150克，选择低钾水果"
    },
    {
        question: "便秘时可以吃什么？",
        options: [
            { text: "香蕉", icon: "🍌", correct: false },
            { text: "猕猴桃", icon: "🥝", correct: false },
            { text: "蒸南瓜", icon: "🎃", correct: true },
            { text: "枣子", icon: "🫘", correct: false }
        ],
        explanation: "南瓜含膳食纤维且钾含量适中，其他水果钾含量都较高"
    },
    {
        question: "以下哪种食物含磷最高？",
        options: [
            { text: "青菜", icon: "🥬", correct: false },
            { text: "巧克力", icon: "🍫", correct: true },
            { text: "白米饭", icon: "🍚", correct: false },
            { text: "白面包", icon: "🍞", correct: false }
        ],
        explanation: "巧克力含磷量很高，要尽量避免。主食和青菜含磷量相对较低"
    },
    {
        question: "以下哪种食物最咸？",
        options: [
            { text: "蒸鱼", icon: "🐟", correct: false },
            { text: "炒青菜", icon: "🥦", correct: false },
            { text: "咸菜", icon: "🥬", correct: true },
            { text: "水煮肉", icon: "🍖", correct: false }
        ],
        explanation: "腌制食品含钠量特别高，应该选择新鲜食材清淡烹饪"
    },
    {
        question: "喝汤时应该？",
        options: [
            { text: "大口喝", icon: "🫗", correct: false },
            { text: "只喝一小碗", icon: "🥣", correct: true },
            { text: "喝光汤汁", icon: "🍜", correct: false },
            { text: "加盐再喝", icon: "🧂", correct: false }
        ],
        explanation: "汤水要限量，每餐不超过100ml，太咸的汤最好不喝"
    },
    {
        question: "以下哪种食物组合不合适？",
        options: [
            { text: "米饭配青菜", icon: "🥬", correct: false },
            { text: "面条配瘦肉", icon: "🍜", correct: false },
            { text: "奶茶配蛋糕", icon: "🧋", correct: true },
            { text: "馒头配鸡蛋", icon: "🥚", correct: false }
        ],
        explanation: "奶茶和蛋糕都含磷高，不适合一起吃。其他是营养均衡的搭配"
    },
    {
        question: "饭前应该准备什么？",
        options: [
            { text: "剧烈运动", icon: "🏃", correct: false },
            { text: "吃零食", icon: "🍪", correct: false },
            { text: "量体重", icon: "⚖️", correct: true },
            { text: "喝很多水", icon: "💧", correct: false }
        ],
        explanation: "定时测体重可以帮助控制水分，合理安排饮食量"
    },
    {
        question: "血液透析的主要目的是什么？",
        options: [
            { text: "增强免疫力", icon: "🛡️", correct: false },
            { text: "清除体内的代谢废物和多余液体", icon: "💧", correct: true },
            { text: "增加血液中的氧气含量", icon: "🫁", correct: false },
            { text: "提高血糖水平", icon: "🩸", correct: false }
        ],
        explanation: "血液透析的主要目的是替代肾脏功能，清除体内的代谢废物（如尿素、肌酐）和多余的液体，调节电解质和酸碱平衡。"
    },
    {
        question: "血液透析一般每周需要进行几次？",
        options: [
            { text: "4次", icon: "4️⃣", correct: false },
            { text: "2-3次", icon: "📅", correct: true },
            { text: "5次", icon: "5️⃣", correct: false },
            { text: "1次", icon: "1️⃣", correct: false }
        ],
        explanation: "血液透析的常规频率是每周2-3次，每次4-5小时，每周总治疗时间不低于10h，以确保体内代谢废物和多余液体能够被有效清除。"
    },
    {
        question: "在血透治疗前，以下哪项做法是正确的？",
        options: [
            { text: "血管条件不好的患者应在透析前冷敷血管", icon: "❄️", correct: false },
            { text: "透析前应先称体重、量血压，并穿宽松且固定的衣服", icon: "⚖️", correct: true },
            { text: "透析前无需清洗瘘侧手臂，直接进行治疗即可", icon: "💪", correct: false },
            { text: "透析间期如有出血或不适，无需告知医护人员", icon: "🤫", correct: false }
        ],
        explanation: "透析日早餐应荤素搭配；血管条件不好需提前热敷；降压降血糖药需遵医嘱调整；治疗前需称体重、量血压，穿宽松固定衣物；提前如厕；透析前清洗瘘侧手臂；透析间期出血或不适需告知医护人员。"
    },
    {
        question: "透析患者在透析前称体重时，以下注意事项正确的是：",
        options: [
            { text: "称体重前需排空大小便，确认已进食完毕", icon: "🚽", correct: false },
            { text: "称体重时需固定透析服", icon: "👕", correct: false },
            { text: "不带额外物品称重", icon: "📱", correct: false },
            { text: "以上都是", icon: "✅", correct: true }
        ],
        explanation: "透析前称体重时，患者需排空大小便并确认进食完毕。称重时需固定透析服（如衣服、裤子、鞋袜），避免携带手机、水杯等物品。"
    },
    {
        question: "在血透治疗过程中，以下哪项做法是正确的？",
        options: [
            { text: "治疗中如有轻微不适，可以不用告知护士", icon: "🤐", correct: false },
            { text: "如需饮水，建议使用刻度水杯少量饮用，并告知医护人员饮水量", icon: "🥤", correct: true },
            { text: "穿刺侧肢体可以随意活动，无需特别注意", icon: "💃", correct: false },
            { text: "如有饥饿感，可正常进食，无需限制", icon: "🍽️", correct: false }
        ],
        explanation: "治疗中任何不适需及时告知护士；穿刺侧肢体尽量不动，避免影响治疗；如有饥饿感可少量食用糖果或饼干，如需饮水，建议使用刻度杯少量饮用并知医护人员饮水量。"
    },
    {
        question: "透析患者在透析期间是否需要定期监测血压？",
        options: [
            { text: "只在透析时监测", icon: "⏰", correct: false },
            { text: "需要", icon: "🩺", correct: true },
            { text: "不需要", icon: "❌", correct: false },
            { text: "只在透析后监测", icon: "📊", correct: false }
        ],
        explanation: "透析患者需要定期监测血压，包括透析前、透析中和透析后。透析过程中，由于脱水和电解质变化，血压可能会出现波动，因此需要密切监测。"
    },
    {
        question: "透析过程中进食时，以下哪项是正确的注意事项？",
        options: [
            { text: "在透析开始的前2个小时内进食", icon: "⏲️", correct: true },
            { text: "可以进食高盐食物", icon: "🧂", correct: false },
            { text: "平躺进食", icon: "🛏️", correct: false },
            { text: "随便选择食物", icon: "🍽️", correct: false }
        ],
        explanation: "建议在透析开始前2小时内进食，以降低低血压和低血糖风险；选择低磷高蛋白、低盐、方便单手食用的食物，如鸡蛋、蛋糕、面包等；进食时避免平躺。"
    },
    {
        question: "在血透治疗后，以下哪项做法是正确的？",
        options: [
            { text: "治疗后需观察穿刺点是否渗血，并及时松绑带", icon: "👀", correct: true },
            { text: "治疗后应快速起身", icon: "🏃", correct: false },
            { text: "透后当天可以立即洗澡", icon: "🚿", correct: false },
            { text: "透后无需关注饮食和水分控制", icon: "🍽️", correct: false }
        ],
        explanation: "治疗后需慢慢起身，避免低血压；观察穿刺点是否渗血，及时松绑带；透后当天不洗澡，敷贴24小时后取下；注意合理饮食和水分控制。"
    },
    {
        question: "透析患者在透析期间是否可以接种疫苗？",
        options: [
            { text: "可以", icon: "💉", correct: true },
            { text: "不可以", icon: "❌", correct: false },
            { text: "只能接种流感疫苗", icon: "🤒", correct: false },
            { text: "只能接种新冠疫苗", icon: "🦠", correct: false }
        ],
        explanation: "透析患者可以接种疫苗，包括流感疫苗、新冠疫苗等。疫苗接种可以有效预防感染，降低透析患者因免疫力低下而感染的风险。"
    },
    {
        question: "透析患者在透析期间是否可以进行长途旅行？",
        options: [
            { text: "可以，但需提前规划", icon: "✈️", correct: true },
            { text: "可以，没有任何限制", icon: "🌍", correct: false },
            { text: "不可以，必须留在医院附近", icon: "🏥", correct: false },
            { text: "透析后可以", icon: "⏰", correct: false }
        ],
        explanation: "透析患者可以进行长途旅行，但需要提前规划，包括安排透析时间和地点，确保旅行期间能够按时接受透析治疗。"
    },
    {
        question: "透析患者在计划饮食时应该注意什么？",
        options: [
            { text: "控制钾和磷的摄入", icon: "🥗", correct: false },
            { text: "保证适量优质蛋白质摄入", icon: "🥩", correct: false },
            { text: "控制液体和钠的摄入", icon: "💧", correct: false },
            { text: "以上都是", icon: "✅", correct: true }
        ],
        explanation: "透析患者在饮食中应注意控制钾和磷的摄入，保证适量优质蛋白质摄入，同时控制液体和钠的摄入。"
    },
    {
        question: "血液透析患者蛋白质摄入量的推荐值是多少？",
        options: [
            { text: "2.0～2.5g/(kg•d)", icon: "📊", correct: false },
            { text: "1.0～1.2g/(kg•d)", icon: "⚖️", correct: true },
            { text: "0.5～0.8g/(kg•d)", icon: "📉", correct: false },
            { text: "1.5～2.0g/(kg•d)", icon: "📈", correct: false }
        ],
        explanation: "血液透析患者的蛋白质摄入量推荐为1.0～1.2g/(kg•d)，高生物价蛋白质应占50%以上。"
    },
    {
        question: "透析患者每日热量摄入建议为：",
        options: [
            { text: "30-35 kcal/kg", icon: "🔢", correct: true },
            { text: "20-25 kcal/kg", icon: "📉", correct: false },
            { text: "25-30 kcal/kg", icon: "📊", correct: false },
            { text: "35-40 kcal/kg", icon: "📈", correct: false }
        ],
        explanation: "透析患者建议每日摄入30-35 kcal/kg。由于疾病和透析过程的能量消耗，患者需要足够的热量来维持体重和身体功能。"
    },
    {
        question: "透析患者如何正确测量液体摄入量？",
        options: [
            { text: "饮水量、食物中的水分和药物的水分", icon: "💧", correct: true },
            { text: "饮水量和食物中的水分", icon: "🥤", correct: false },
            { text: "饮水量、食物中的水分、药物的水分以及体内内生水", icon: "🌊", correct: false },
            { text: "饮水量、食物中的水分和额外丢失的水分", icon: "💦", correct: false }
        ],
        explanation: "透析患者的液体摄入量应包括直接饮水量、食物中的水分以及药物的水分。"
    },
    {
        question: "透析患者每次有氧运动的推荐时间为：",
        options: [
            { text: "30-60分钟", icon: "⏱️", correct: true },
            { text: "10-20分钟", icon: "⏰", correct: false },
            { text: "20-30分钟", icon: "⌚", correct: false },
            { text: "60-90分钟", icon: "🕐", correct: false }
        ],
        explanation: "透析患者每次有氧运动时间建议为30-60分钟，既能达到锻炼效果，又不会过度疲劳。"
    },
    {
        question: "透析患者在进行康复运动时，适宜的运动强度应达到以下哪种状态？",
        options: [
            { text: "自感稍累或累，但又不精疲力竭", icon: "🏃", correct: true },
            { text: "完全不感到疲劳", icon: "😊", correct: false },
            { text: "感到非常疲劳，需要立即休息", icon: "😫", correct: false },
            { text: "精疲力竭，无法继续运动", icon: "😩", correct: false }
        ],
        explanation: "透析患者的运动强度应以中低强度为宜，运动时应达到自感稍累或累，但又不精疲力竭的状态。"
    },
    {
        question: "透析患者每周建议进行运动的频率为：",
        options: [
            { text: "3-5次", icon: "📅", correct: true },
            { text: "1-2次", icon: "1️⃣", correct: false },
            { text: "6-7次", icon: "7️⃣", correct: false },
            { text: "每天多次", icon: "🔄", correct: false }
        ],
        explanation: "透析患者每周建议运动3-5次，既能保证锻炼效果，又有足够的休息时间。"
    },
    {
        question: "以下哪种运动项目适合透析患者进行康复锻炼？",
        options: [
            { text: "快走", icon: "🚶", correct: true },
            { text: "举重", icon: "🏋️", correct: false },
            { text: "长跑", icon: "🏃", correct: false },
            { text: "跳绳", icon: "⭕", correct: false }
        ],
        explanation: "快走是低强度、低风险的运动，适合透析患者，能改善心肺功能和肌肉耐力，且对关节和心血管负担小。"
    },
    {
        question: "血液透析患者的血管通路包括：",
        options: [
            { text: "自体动静脉内瘘", icon: "💉", correct: false },
            { text: "移植血管内瘘", icon: "🔄", correct: false },
            { text: "带涤纶套带隧道导管", icon: "🔌", correct: false },
            { text: "以上都是", icon: "✅", correct: true }
        ],
        explanation: "血液透析患者的血管通路类型多样，临床医师会根据患者的血管条件、全身状况、透析需求以及合并症等因素，个体化选择最适合的血管通路。"
    },
    {
        question: "关于内瘘侧肢体的注意事项，以下哪项是正确的？",
        options: [
            { text: "衣袖宜宽松，防止内瘘受压", icon: "👕", correct: false },
            { text: "避免内瘘侧肢体负重", icon: "💪", correct: false },
            { text: "睡眠时避免内瘘侧肢体受压", icon: "😴", correct: false },
            { text: "以上都是", icon: "✅", correct: true }
        ],
        explanation: "内瘘侧肢体需特别注意保护，衣袖应宽松以防受压，避免肢体负重及睡眠时受压。"
    },
    {
        question: "透析患者每天应如何自我监测动静脉内瘘？",
        options: [
            { text: "触摸瘘管是否有震颤", icon: "👆", correct: false },
            { text: "听诊瘘管是否有杂音", icon: "👂", correct: false },
            { text: "观察瘘管是否有红肿", icon: "👀", correct: false },
            { text: "以上都是", icon: "✅", correct: true }
        ],
        explanation: "每天触摸瘘管是否有震颤、听诊是否有杂音以及观察是否有红肿是自我监测的重要内容。"
    }
]; 