interface LearningProgress {
  userId: string;
  completedTopics: string[];
  quizScores: {
    topicId: string;
    attempts: number;
    bestScore: number;
    lastAttemptDate: Date;
  }[];
  nutritionGameProgress: {
    level: number;
    successfulMeals: number;
    lastPlayDate: Date;
  };
}

interface ProgressTracking {
  currentStreak: number;
  totalPoints: number;
  achievements: string[];
  weeklyGoals: {
    target: number;
    current: number;
    type: 'QUIZ' | 'NUTRITION' | 'SIMULATION';
  }[];
} 