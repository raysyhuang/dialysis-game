import React, { useState, useEffect } from 'react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correct: number;
  difficulty: number;  // 添加难度等级
  timeLimit: number;   // 添加答题时限
}

const QuizGame: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (currentQuestion) {
      setTimeLeft(currentQuestion.timeLimit);
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            clearInterval(timer);
            handleTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [currentQuestion]);

  const calculateScore = (difficulty: number, timeLeft: number): number => {
    const baseScore = difficulty * 10;
    const timeBonus = Math.floor(timeLeft / currentQuestion!.timeLimit * 5);
    return baseScore + timeBonus;
  };

  const handleAnswer = (selected: number) => {
    if (selected === currentQuestion?.correct) {
      const earnedScore = calculateScore(currentQuestion.difficulty, timeLeft);
      setScore(s => s + earnedScore);
      showConfettiAnimation();
    }
    fetchQuestion();
  };

  const fetchQuestion = () => {
    // Implementation of fetchQuestion
  };

  const showConfettiAnimation = () => {
    // Implementation of showConfettiAnimation
  };

  const handleTimeout = () => {
    // Implementation of handleTimeout
  };

  return (
    // JSX code
  );
};

export default QuizGame; 