
import React, { useState, useEffect } from 'react';
import { BookOpen, Award, RotateCcw, Share2, Trophy } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
}

const FinancialQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the ideal emergency fund size for most people?",
      options: ["1-2 months of expenses", "3-6 months of expenses", "1 year of expenses", "No emergency fund needed"],
      correct: 1,
      explanation: "An emergency fund should cover 3-6 months of living expenses to handle unexpected situations like job loss or major expenses.",
      category: "Budgeting"
    },
    {
      id: 2,
      question: "Which investment typically offers the highest returns over the long term?",
      options: ["Fixed Deposits", "Gold", "Equity Mutual Funds", "Savings Account"],
      correct: 2,
      explanation: "Equity mutual funds have historically provided the highest returns over long periods, though they come with higher risk.",
      category: "Investment"
    },
    {
      id: 3,
      question: "What is a CIBIL score used for?",
      options: ["Tax calculation", "Credit worthiness assessment", "Investment analysis", "Insurance premium"],
      correct: 1,
      explanation: "CIBIL score ranges from 300-900 and helps lenders assess your creditworthiness when you apply for loans or credit cards.",
      category: "Credit"
    },
    {
      id: 4,
      question: "Which of these is a red flag in investment schemes?",
      options: ["Guaranteed high returns", "Regulated by SEBI", "Transparent fee structure", "Historical performance data"],
      correct: 0,
      explanation: "No legitimate investment can guarantee high returns. Be wary of promises that sound too good to be true.",
      category: "Fraud Prevention"
    },
    {
      id: 5,
      question: "What does SIP stand for in mutual funds?",
      options: ["Systematic Investment Plan", "Secure Investment Program", "Special Interest Policy", "Standard Investment Portfolio"],
      correct: 0,
      explanation: "SIP allows you to invest a fixed amount regularly in mutual funds, helping with disciplined investing and rupee cost averaging.",
      category: "Investment"
    },
    {
      id: 6,
      question: "Which tax-saving investment has the longest lock-in period?",
      options: ["ELSS Mutual Funds", "PPF", "NSC", "Tax Saver FD"],
      correct: 1,
      explanation: "PPF (Public Provident Fund) has a 15-year lock-in period, making it the longest among 80C investments.",
      category: "Tax Planning"
    },
    {
      id: 7,
      question: "What is inflation's effect on money?",
      options: ["Increases purchasing power", "Decreases purchasing power", "No effect on purchasing power", "Only affects rich people"],
      correct: 1,
      explanation: "Inflation reduces the purchasing power of money over time. ₹100 today will buy less in the future due to inflation.",
      category: "Economics"
    },
    {
      id: 8,
      question: "Which insurance should you buy first?",
      options: ["Car insurance", "Health insurance", "Life insurance", "Travel insurance"],
      correct: 1,
      explanation: "Health insurance should be your first priority as medical emergencies can be financially devastating and unpredictable.",
      category: "Insurance"
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newUserAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newUserAnswers);

    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
        // Save quiz result
        const quizResult = {
          score: selectedAnswer === questions[currentQuestion].correct ? score + 1 : score,
          total: questions.length,
          percentage: Math.round(((selectedAnswer === questions[currentQuestion].correct ? score + 1 : score) / questions.length) * 100),
          timestamp: new Date(),
          answers: newUserAnswers
        };
        localStorage.setItem('meneyQuizResult', JSON.stringify(quizResult));
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    setUserAnswers([]);
  };

  const shareResult = () => {
    const finalScore = score + (selectedAnswer === questions[currentQuestion].correct ? 1 : 0);
    const percentage = Math.round((finalScore / questions.length) * 100);
    const text = `I scored ${finalScore}/${questions.length} (${percentage}%) on MENEY's Financial Literacy Quiz! 🎯 Test your financial knowledge: ${window.location.origin}/quiz`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const getBadge = (percentage: number) => {
    if (percentage >= 90) return { name: "Financial Expert", color: "text-yellow-600", icon: "🏆" };
    if (percentage >= 75) return { name: "Money Manager", color: "text-blue-600", icon: "💎" };
    if (percentage >= 60) return { name: "Smart Saver", color: "text-green-600", icon: "⭐" };
    if (percentage >= 40) return { name: "Learning", color: "text-orange-600", icon: "📚" };
    return { name: "Beginner", color: "text-red-600", icon: "🌱" };
  };

  if (quizCompleted) {
    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);
    const badge = getBadge(percentage);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h1>
              <p className="text-gray-600">Here's how you performed</p>
            </div>

            {/* Score Display */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-8 mb-8">
              <div className="text-6xl font-bold mb-2">{finalScore}/{questions.length}</div>
              <div className="text-2xl mb-4">{percentage}%</div>
              <div className={`text-2xl ${badge.color} bg-white px-4 py-2 rounded-full inline-block`}>
                {badge.icon} {badge.name}
              </div>
            </div>

            {/* Performance Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Strengths</h3>
                <p className="text-green-700">
                  {percentage >= 75 ? "Excellent financial knowledge!" : 
                   percentage >= 50 ? "Good foundation in finance" : 
                   "Keep learning, you're improving!"}
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Next Steps</h3>
                <p className="text-blue-700">
                  {percentage < 60 ? "Focus on basics: budgeting and saving" :
                   percentage < 80 ? "Learn about investments and tax planning" :
                   "Explore advanced investment strategies"}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Take Quiz Again</span>
              </button>
              <button
                onClick={shareResult}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>Share Result</span>
              </button>
            </div>

            {/* Improvement Tips */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Tips to Improve:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Read financial books and blogs regularly</li>
                <li>• Start with basic concepts: budgeting, saving, investing</li>
                <li>• Use MENEY's other tools: Tax Assistant and Scam Detector</li>
                <li>• Follow reputable financial advisors and educators</li>
                <li>• Practice with small investments before going big</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MENEYonics</h1>
          <p className="text-gray-600">Financial Literacy Quiz Game</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {!showResult ? (
            <>
              <div className="mb-6">
                <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {currentQ.category}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {currentQ.question}
                </h2>
              </div>

              <div className="space-y-4 mb-8">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedAnswer === index
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                        selectedAnswer === index
                          ? 'border-purple-600 bg-purple-600'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswer === index && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-gray-800">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-4 rounded-xl font-semibold transition-colors"
              >
                {currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
              </button>
            </>
          ) : (
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                selectedAnswer === currentQ.correct
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-600'
              }`}>
                {selectedAnswer === currentQ.correct ? (
                  <Award className="w-8 h-8" />
                ) : (
                  <span className="text-2xl">❌</span>
                )}
              </div>

              <h3 className={`text-2xl font-bold mb-4 ${
                selectedAnswer === currentQ.correct ? 'text-green-800' : 'text-red-800'
              }`}>
                {selectedAnswer === currentQ.correct ? 'Correct!' : 'Incorrect'}
              </h3>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <p className="text-gray-700 mb-2">
                  <strong>Correct Answer:</strong> {currentQ.options[currentQ.correct]}
                </p>
                <p className="text-gray-600">{currentQ.explanation}</p>
              </div>

              <div className="text-gray-600">
                Loading next question...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialQuiz;
