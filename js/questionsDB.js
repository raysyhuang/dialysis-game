const questionsDatabase = [
    {
        question: "哪种主食更适合透析患者？",
        options: [
            { text: "白米饭", icon: "🍚", correct: true },
            { text: "杂粮饭", icon: "🌾", correct: false },
            { text: "土豆泥", icon: "🥔", correct: false },
            { text: "玉米饼", icon: "🌽", correct: false }
        ],
        explanation: "白米饭钾含量最低，杂粮和根茎类主食含钾较高要少吃"
    },
    {
        question: "想吃水果该选哪个？",
        options: [
            { text: "1个小苹果", icon: "🍎", correct: true },
            { text: "1根香蕉", icon: "🍌", correct: false },
            { text: "1个橙子", icon: "🍊", correct: false },
            { text: "1串葡萄", icon: "🍇", correct: false }
        ],
        explanation: "苹果含钾最低，每天可吃1个小的（约150g），其他高钾水果要避免"
    },
    {
        question: "哪种烹饪方式更健康？",
        options: [
            { text: "清蒸鱼", icon: "🐟", correct: true },
            { text: "红烧肉", icon: "🥩", correct: false },
            { text: "腌咸菜", icon: "🥒", correct: false },
            { text: "油炸鸡", icon: "🍗", correct: false }
        ],
        explanation: "清蒸最健康，少油少盐。腌制品太咸，油炸食品磷含量高"
    },
    {
        question: "每天可以吃几个鸡蛋？",
        options: [
            { text: "1个", icon: "🥚", correct: true },
            { text: "3个", icon: "🥚🥚🥚", correct: false },
            { text: "只吃蛋白", icon: "🍳", correct: false },
            { text: "不能吃", icon: "🚫", correct: false }
        ],
        explanation: "每天1个全蛋最佳，提供优质蛋白又不会过量"
    },
    {
        question: "哪种蔬菜要先焯水？",
        options: [
            { text: "菠菜", icon: "🥬", correct: true },
            { text: "黄瓜", icon: "🥒", correct: false },
            { text: "白菜", icon: "🥬", correct: false },
            { text: "萝卜", icon: "🥕", correct: false }
        ],
        explanation: "菠菜等绿叶菜焯水3分钟可去除部分钾，其他低钾蔬菜不用焯"
    },
    {
        question: "口渴时最好喝？",
        options: [
            { text: "小口温水", icon: "🚰", correct: true },
            { text: "冰可乐", icon: "🥤", correct: false },
            { text: "鲜榨果汁", icon: "🍹", correct: false },
            { text: "珍珠奶茶", icon: "🧋", correct: false }
        ],
        explanation: "小口喝温水最解渴，饮料含糖和磷高，要避免"
    },
    {
        question: "外出就餐要注意？",
        options: [
            { text: "自带米饭", icon: "🍚", correct: false },
            { text: "涮水去盐", icon: "🍲", correct: true },
            { text: "多吃配菜", icon: "🥗", correct: false },
            { text: "喝光汤底", icon: "🥣", correct: false }
        ],
        explanation: "外食过咸时可用清水涮菜，避免喝汤，汤里盐和磷含量高"
    },
    {
        question: "哪种零食可以偶尔吃？",
        options: [
            { text: "原味米饼", icon: "🍘", correct: true },
            { text: "薯片", icon: "🥔", correct: false },
            { text: "坚果", icon: "🥜", correct: false },
            { text: "巧克力", icon: "🍫", correct: false }
        ],
        explanation: "米饼相对低磷低钾，其他零食含盐/磷/钾都太高"
    },
    {
        question: "每天最多能吃多少肉？",
        options: [
            { text: "扑克牌大小", icon: "🃏", correct: true },
            { text: "手掌大小", icon: "✋", correct: false },
            { text: "不限量", icon: "♾️", correct: false },
            { text: "不吃肉", icon: "🚫", correct: false }
        ],
        explanation: "每天2两肉（约扑克牌大小），优先选鸡胸肉、鱼肉等白肉"
    },
    {
        question: "哪种饮品可以喝？",
        options: [
            { text: "淡柠檬水", icon: "🍋", correct: true },
            { text: "奶茶", icon: "🧋", correct: false },
            { text: "运动饮料", icon: "🏃", correct: false },
            { text: "骨头汤", icon: "🍖", correct: false }
        ],
        explanation: "淡柠檬水（1片柠檬泡500ml水）可增加风味，其他饮品磷钾含量高"
    },
    {
        question: "吃火锅要注意什么？",
        options: [
            { text: "不喝汤", icon: "🚫🥣", correct: true },
            { text: "多吃豆腐", icon: "🥟", correct: false },
            { text: "多蘸酱料", icon: "🥢", correct: false },
            { text: "煮久一点", icon: "🕒", correct: false }
        ],
        explanation: "火锅汤含大量磷和嘌呤，豆腐、酱料含盐高，都要避免"
    },
    {
        question: "哪种早餐组合最好？",
        options: [
            { text: "馒头+鸡蛋", icon: "🍞🥚", correct: true },
            { text: "粥+咸菜", icon: "🍚🥒", correct: false },
            { text: "牛奶+麦片", icon: "🥛🌾", correct: false },
            { text: "豆浆+油条", icon: "🥛🥖", correct: false }
        ],
        explanation: "馒头提供碳水，鸡蛋补充蛋白。粥含水多，咸菜太咸，牛奶磷高"
    },
    {
        question: "以下哪种蔬菜含钾最少？",
        options: [
            { text: "白萝卜", icon: "🥕", correct: true },
            { text: "西红柿", icon: "🍅", correct: false },
            { text: "茄子", icon: "🍆", correct: false },
            { text: "青椒", icon: "🫑", correct: false }
        ],
        explanation: "白萝卜含钾量低，可以多吃。西红柿、茄子等蔬菜含钾量高要少吃"
    },
    {
        question: "煮青菜时要注意什么？",
        options: [
            { text: "焯水后换水煮", icon: "♨️", correct: true },
            { text: "直接煮熟", icon: "🥬", correct: false },
            { text: "煮很久", icon: "⏰", correct: false },
            { text: "加很多盐", icon: "🧂", correct: false }
        ],
        explanation: "先焯水3-5分钟倒掉水，再换清水煮，可以去除部分钾质"
    },
    {
        question: "一餐吃多少主食合适？",
        options: [
            { text: "一个拳头大小", icon: "✊", correct: true },
            { text: "随便吃", icon: "🍚", correct: false },
            { text: "吃到饱", icon: "🍽️", correct: false },
            { text: "不吃主食", icon: "❌", correct: false }
        ],
        explanation: "每餐主食量约一个拳头大小（约150克），可根据医嘱调整"
    },
    {
        question: "以下哪种汤不能喝？",
        options: [
            { text: "海带汤", icon: "🌊", correct: true },
            { text: "白萝卜汤", icon: "🥕", correct: false },
            { text: "冬瓜汤", icon: "🥗", correct: false },
            { text: "西湖汤", icon: "🥣", correct: false }
        ],
        explanation: "海带含钾和碘都很高，不适合透析患者。可以喝清淡的白萝卜汤或冬瓜汤"
    },
    {
        question: "以下哪种肉类最适合？",
        options: [
            { text: "瘦猪肉", icon: "🥩", correct: true },
            { text: "肥肉", icon: "🍖", correct: false },
            { text: "内脏", icon: "🫀", correct: false },
            { text: "火腿肠", icon: "🌭", correct: false }
        ],
        explanation: "瘦肉蛋白质高磷低，内脏磷高，加工肉制品盐分高，都不适合"
    },
    {
        question: "饭前应该怎么吃药？",
        options: [
            { text: "遵医嘱服用", icon: "💊", correct: true },
            { text: "想起来就吃", icon: "🤔", correct: false },
            { text: "觉得难受再吃", icon: "😣", correct: false },
            { text: "自己调整量", icon: "❌", correct: false }
        ],
        explanation: "磷结合剂要在吃饭时服用，其他药物按医生要求的时间服用"
    },
    {
        question: "以下哪种调味料可以多用？",
        options: [
            { text: "醋", icon: "🍶", correct: true },
            { text: "酱油", icon: "🫙", correct: false },
            { text: "料酒", icon: "🍾", correct: false },
            { text: "蚝油", icon: "🥫", correct: false }
        ],
        explanation: "醋可以增加风味且不含钠，其他调味料含钠量都较高"
    },
    {
        question: "夏天解暑可以吃什么？",
        options: [
            { text: "冰镇黄瓜", icon: "🥒", correct: true },
            { text: "西瓜", icon: "🍉", correct: false },
            { text: "冰淇淋", icon: "🍦", correct: false },
            { text: "椰子水", icon: "🥥", correct: false }
        ],
        explanation: "黄瓜水分多又低钾，西瓜和椰子水钾高，冰淇淋磷高"
    },
    {
        question: "以下哪种主食可以搭配？",
        options: [
            { text: "白馒头", icon: "🍞", correct: true },
            { text: "全麦面包", icon: "🥖", correct: false },
            { text: "紫米饭", icon: "🍚", correct: false },
            { text: "红薯", icon: "🍠", correct: false }
        ],
        explanation: "白面制品钾含量低，全麦和杂粮类主食钾含量高"
    },
    {
        question: "做菜时应该？",
        options: [
            { text: "控油少盐", icon: "🥗", correct: true },
            { text: "放很多油", icon: "🫗", correct: false },
            { text: "放足味精", icon: "🧂", correct: false },
            { text: "煮得烂熟", icon: "♨️", correct: false }
        ],
        explanation: "清淡饮食，少油少盐，保持食材本味更健康"
    },
    {
        question: "以下哪种豆制品可以吃？",
        options: [
            { text: "豆腐花", icon: "🧊", correct: true },
            { text: "毛豆", icon: "🫘", correct: false },
            { text: "豆浆", icon: "🥛", correct: false },
            { text: "腐竹", icon: "🥢", correct: false }
        ],
        explanation: "豆腐花蛋白适中磷低，其他豆制品磷含量都较高"
    },
    {
        question: "饭后水果怎么吃？",
        options: [
            { text: "等半小时再吃", icon: "⏰", correct: true },
            { text: "马上吃", icon: "🍎", correct: false },
            { text: "吃到饱", icon: "🍇", correct: false },
            { text: "随便吃", icon: "🤷", correct: false }
        ],
        explanation: "饭后半小时再吃水果，每次限量150克，选择低钾水果"
    },
    {
        question: "便秘时可以吃什么？",
        options: [
            { text: "蒸南瓜", icon: "🎃", correct: true },
            { text: "枣子", icon: "🫘", correct: false },
            { text: "香蕉", icon: "🍌", correct: false },
            { text: "猕猴桃", icon: "🥝", correct: false }
        ],
        explanation: "南瓜含膳食纤维且钾含量适中，其他水果钾含量都较高"
    },
    {
        question: "以下哪种食物含磷最高？",
        options: [
            { text: "巧克力", icon: "🍫", correct: true },
            { text: "白米饭", icon: "🍚", correct: false },
            { text: "白面包", icon: "🍞", correct: false },
            { text: "青菜", icon: "🥬", correct: false }
        ],
        explanation: "巧克力含磷量很高，要尽量避免。主食和青菜含磷量相对较低"
    },
    {
        question: "以下哪种食物最咸？",
        options: [
            { text: "咸菜", icon: "🥬", correct: true },
            { text: "水煮肉", icon: "🍖", correct: false },
            { text: "蒸鱼", icon: "🐟", correct: false },
            { text: "炒青菜", icon: "🥦", correct: false }
        ],
        explanation: "腌制食品含钠量特别高，应该选择新鲜食材清淡烹饪"
    },
    {
        question: "喝汤时应该？",
        options: [
            { text: "只喝一小碗", icon: "🥣", correct: true },
            { text: "喝光汤汁", icon: "🍜", correct: false },
            { text: "大口喝", icon: "🫗", correct: false },
            { text: "加盐再喝", icon: "🧂", correct: false }
        ],
        explanation: "汤水要限量，每餐不超过100ml，太咸的汤最好不喝"
    },
    {
        question: "以下哪种食物组合不合适？",
        options: [
            { text: "奶茶配蛋糕", icon: "🧋", correct: true },
            { text: "馒头配鸡蛋", icon: "🥚", correct: false },
            { text: "米饭配青菜", icon: "🥬", correct: false },
            { text: "面条配瘦肉", icon: "🍜", correct: false }
        ],
        explanation: "奶茶和蛋糕都含磷高，不适合一起吃。其他是营养均衡的搭配"
    },
    {
        question: "饭前应该准备什么？",
        options: [
            { text: "量体重", icon: "⚖️", correct: true },
            { text: "喝很多水", icon: "💧", correct: false },
            { text: "吃零食", icon: "🍪", correct: false },
            { text: "剧烈运动", icon: "🏃", correct: false }
        ],
        explanation: "定时测体重可以帮助控制水分，合理安排饮食量"
    }
]; 