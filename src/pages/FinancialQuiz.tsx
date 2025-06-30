
import React, { useState, useEffect } from 'react';
import { BookOpen, Award, RotateCcw, Share2, Trophy, Brain, Target, Star } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
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
      question: "What should be your FIRST financial priority after getting a job?",
      options: ["Investing in stocks", "Building an emergency fund", "Buying insurance", "Starting SIPs"],
      correct: 1,
      explanation: "An emergency fund covering 6-12 months of expenses should be your first priority. It protects you from unexpected financial shocks and prevents debt accumulation during emergencies.",
      category: "Financial Planning",
      difficulty: "Easy"
    },
    {
      id: 2,
      question: "Which investment option provides the best inflation-adjusted returns historically in India?",
      options: ["Fixed Deposits", "Gold", "Equity Mutual Funds", "PPF"],
      correct: 2,
      explanation: "Equity mutual funds have historically provided 12-15% returns, beating inflation (6-7%) significantly. While risky short-term, they're excellent for long-term wealth creation.",
      category: "Investment",
      difficulty: "Medium"
    },
    {
      id: 3,
      question: "What's the ideal CIBIL score for getting the best loan interest rates?",
      options: ["Above 600", "Above 700", "Above 750", "Above 800"],
      correct: 2,
      explanation: "A CIBIL score above 750 is considered excellent and gets you the best interest rates. Banks offer their lowest rates to borrowers with 750+ scores.",
      category: "Credit Management",
      difficulty: "Medium"
    },
    {
      id: 4,
      question: "Which of these is a classic sign of a Ponzi scheme?",
      options: ["Regulated by SEBI", "Guaranteed 30% annual returns", "Transparent fee structure", "Audited financial statements"],
      correct: 1,
      explanation: "Guaranteed high returns (especially 20%+ annually) are impossible in legitimate investments. Such promises are classic Ponzi scheme red flags.",
      category: "Fraud Prevention",
      difficulty: "Easy"
    },
    {
      id: 5,
      question: "What's the maximum amount you can invest in ELSS mutual funds for 80C tax deduction?",
      options: ["₹1 lakh", "₹1.5 lakh", "₹2 lakh", "No limit"],
      correct: 1,
      explanation: "Under Section 80C, you can claim deduction up to ₹1.5 lakh annually. ELSS has only 3-year lock-in compared to 15 years for PPF.",
      category: "Tax Planning",
      difficulty: "Medium"
    },
    {
      id: 6,
      question: "What happens to your money's purchasing power if inflation is 6% and your savings account gives 3% interest?",
      options: ["Increases by 3%", "Stays the same", "Decreases by 3%", "Increases by 9%"],
      correct: 2,
      explanation: "Real return = Nominal return - Inflation = 3% - 6% = -3%. Your money loses 3% purchasing power annually, meaning you can buy less with the same amount.",
      category: "Economics",
      difficulty: "Hard"
    },
    {
      id: 7,
      question: "Which health insurance is most important for a 25-year-old earning ₹50,000/month?",
      options: ["₹2 lakh basic cover", "₹5 lakh comprehensive cover", "₹10 lakh super premium", "₹1 lakh with parents' coverage"],
      correct: 1,
      explanation: "₹5 lakh comprehensive health insurance balances affordability with adequate coverage. It covers most medical emergencies without being too expensive for a young professional.",
      category: "Insurance",
      difficulty: "Medium"
    },
    {
      id: 8,
      question: "What's the 50-30-20 budgeting rule?",
      options: ["50% savings, 30% needs, 20% wants", "50% needs, 30% wants, 20% savings", "50% EMIs, 30% expenses, 20% fun", "50% stocks, 30% bonds, 20% cash"],
      correct: 1,
      explanation: "50% for needs (rent, food, utilities), 30% for wants (entertainment, dining out), 20% for savings and investments. This ensures balanced financial life.",
      category: "Budgeting",
      difficulty: "Easy"
    },
    {
      id: 9,
      question: "When should you start investing in equity markets?",
      options: ["Only after 40 years", "When you have ₹1 lakh surplus", "After building emergency fund", "Never, too risky"],
      correct: 2,
      explanation: "Start equity investing only after securing your emergency fund and basic insurance. This ensures you won't need to sell investments during emergencies.",
      category: "Investment Strategy",
      difficulty: "Medium"
    },
    {
      id: 10,
      question: "What's the biggest mistake people make with credit cards?",
      options: ["Not having one", "Paying minimum amount only", "Using for EMIs", "Having multiple cards"],
      correct: 1,
      explanation: "Paying only minimum amount leads to debt trap with 36-42% annual interest. Always pay full amount to avoid interest charges and maintain good credit score.",
      category: "Credit Management",
      difficulty: "Hard"
    },
    {
      id: 11,
      question: "Which government scheme provides ₹2 lakh life insurance for just ₹12/year?",
      options: ["PMJJBY", "PMSBY", "APY", "PMFBY"],
      correct: 0,
      explanation: "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY) provides ₹2 lakh life insurance coverage for an annual premium of just ₹330 (about ₹1 per day).",
      category: "Government Schemes",
      difficulty: "Easy"
    },
    {
      id: 12,
      question: "What's the key difference between growth and dividend mutual fund options?",
      options: ["Growth has higher returns", "Dividend gives regular income", "Growth reinvests profits, dividend pays out", "No difference"],
      correct: 2,
      explanation: "Growth option reinvests all profits back into the fund, compounding your wealth. Dividend option pays out profits, reducing the NAV. Growth is better for long-term wealth creation.",
      category: "Investment",
      difficulty: "Hard"
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
      <div className="min-h-screen bg-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">🎉 Quiz Completed!</h1>
              <p className="text-gray-600">Awesome work! Here's your financial literacy score</p>
            </div>

            {/* Enhanced Score Display */}
            <div className="bg-purple-600 text-white rounded-2xl p-8 mb-8">
              <div className="text-6xl font-bold mb-2">{finalScore}/{questions.length}</div>
              <div className="text-2xl mb-4">{percentage}%</div>
              <div className={`text-2xl bg-white px-6 py-3 rounded-full inline-block font-bold ${badge.color}`}>
                {badge.icon} {badge.name}
              </div>
              <p className="mt-4 text-purple-100">
                {percentage >= 80 ? "You're financially savvy! 🌟" :
                 percentage >= 60 ? "Good foundation, keep learning! 📚" :
                 "Great start, lots to learn! 🚀"}
              </p>
            </div>

            {/* Detailed Performance Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 p-6 rounded-xl">
                <Brain className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">Knowledge Level</h3>
                <p className="text-green-700">
                  {percentage >= 85 ? "Expert Level - You can guide others!" :
                   percentage >= 70 ? "Advanced - Strong understanding" :
                   percentage >= 50 ? "Intermediate - Good basics" :
                   "Beginner - Focus on fundamentals"}
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Next Focus</h3>
                <p className="text-blue-700">
                  {percentage < 50 ? "Emergency fund & basic budgeting" :
                   percentage < 70 ? "Investment basics & tax planning" :
                   "Advanced strategies & wealth building"}
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Strength Areas</h3>
                <p className="text-purple-700">
                  {finalScore >= 8 ? "Most financial concepts" :
                   finalScore >= 6 ? "Basic planning & awareness" :
                   "Financial awareness (good start!)"}
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
    <div className="min-h-screen bg-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MENEYonics</h1>
          <p className="text-gray-600">Advanced Financial Literacy Challenge</p>
          <p className="text-sm text-gray-500 mt-2">Test your money knowledge with real-world scenarios</p>
          
          {/* Stats */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="text-center">
              <span className="text-lg font-bold text-purple-600">12</span>
              <p className="text-xs text-gray-600">Questions</p>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold text-blue-600">3</span>
              <p className="text-xs text-gray-600">Difficulty Levels</p>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold text-green-600">5</span>
              <p className="text-xs text-gray-600">Categories</p>
            </div>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-1 rounded ${
                currentQ.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                currentQ.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {currentQ.difficulty}
              </span>
              <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Enhanced Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {!showResult ? (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {currentQ.category}
                  </span>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    currentQ.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    currentQ.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {currentQ.difficulty}
                  </span>
                </div>
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
