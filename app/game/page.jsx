"use client"
import { useState, useEffect } from "react"
import { Leaf, RotateCcw, Timer, Zap, TreePine, Star, Trophy, Flame, CheckCircle, XCircle, Clock } from "lucide-react"

const CarbonFootprintGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState("start") // 'start', 'playing', 'finished'
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const [level, setLevel] = useState(1)

  const questions = [
    {
      question: "Which transportation method has the lowest carbon footprint?",
      options: ["Car", "Bus", "Bicycle", "Train"],
      correct: 2,
      explanation: "Bicycles have zero emissions and are the most eco-friendly transportation option!",
      category: "Transport",
    },
    {
      question: "What percentage of global greenhouse gas emissions comes from livestock?",
      options: ["5%", "10%", "14.5%", "20%"],
      correct: 2,
      explanation: "Livestock farming contributes approximately 14.5% of global greenhouse gas emissions.",
      category: "Agriculture",
    },
    {
      question: "Which appliance typically uses the most electricity in a home?",
      options: ["Refrigerator", "Air Conditioner", "Washing Machine", "TV"],
      correct: 1,
      explanation: "Air conditioning typically accounts for the largest portion of home electricity use.",
      category: "Energy",
    },
    {
      question: "How much water does it take to produce one cotton t-shirt?",
      options: ["100 liters", "500 liters", "1,000 liters", "2,700 liters"],
      correct: 3,
      explanation: "It takes approximately 2,700 liters of water to produce one cotton t-shirt!",
      category: "Fashion",
    },
    {
      question: "Which renewable energy source is most widely used globally?",
      options: ["Solar", "Wind", "Hydroelectric", "Geothermal"],
      correct: 2,
      explanation: "Hydroelectric power is the most widely used renewable energy source worldwide.",
      category: "Energy",
    },
    {
      question: "What is the best way to reduce food waste's carbon impact?",
      options: ["Eat less meat", "Buy local only", "Compost scraps", "Reduce food waste"],
      correct: 3,
      explanation: "Reducing food waste is the most effective way to minimize your food-related carbon footprint.",
      category: "Food",
    },
    {
      question: "How much can switching to LED bulbs reduce energy consumption?",
      options: ["25%", "50%", "75%", "90%"],
      correct: 2,
      explanation: "LED bulbs use about 75% less energy than traditional incandescent bulbs.",
      category: "Energy",
    },
    {
      question: "Which country has the highest per capita carbon footprint?",
      options: ["China", "United States", "Qatar", "Germany"],
      correct: 2,
      explanation: "Qatar has the highest per capita carbon emissions due to its oil industry and high consumption.",
      category: "Global",
    },
  ]

  useEffect(() => {
    let timer
    if (gameState === "playing" && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0 && gameState === "playing") {
      handleTimeUp()
    }
    return () => clearTimeout(timer)
  }, [timeLeft, gameState])

  const startGame = () => {
    setGameState("playing")
    setCurrentQuestion(0)
    setScore(0)
    setStreak(0)
    setLevel(1)
    setTimeLeft(15)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const handleAnswer = (selectedIndex) => {
    if (showResult) return
    setSelectedAnswer(selectedIndex)
    setShowResult(true)

    if (selectedIndex === questions[currentQuestion].correct) {
      const timeBonus = Math.floor(timeLeft / 3)
      const streakBonus = streak * 10
      const levelBonus = level * 5
      const totalPoints = 100 + timeBonus + streakBonus + levelBonus
      setScore(score + totalPoints)
      setStreak(streak + 1)
      if (streak + 1 >= 3) {
        setLevel(Math.min(level + 1, 5))
      }
    } else {
      setStreak(0)
    }
  }

  const handleTimeUp = () => {
    setSelectedAnswer(null)
    setShowResult(true)
    setStreak(0)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setTimeLeft(15)
    } else {
      setGameState("finished")
    }
  }

  const resetGame = () => {
    setGameState("start")
    setCurrentQuestion(0)
    setScore(0)
    setStreak(0)
    setLevel(1)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / (questions.length * 100)) * 100
    if (percentage >= 80) return "🌟 Eco Champion! You're a carbon footprint expert!"
    if (percentage >= 60) return "🌿 Environmental Enthusiast! Great job!"
    if (percentage >= 40) return "🌱 Good start! Keep learning about sustainability!"
    return "🌍 Every step counts! Keep learning about our planet!"
  }

  const getProgressWidth = () => {
    return `${((currentQuestion + 1) / questions.length) * 100}%`
  }

  const getTimerColor = () => {
    if (timeLeft <= 5) return "#ef4444"
    if (timeLeft <= 10) return "#f59e0b"
    return "#10b981"
  }

  if (gameState === "start") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-200/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-teal-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-cyan-200/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl max-w-lg w-full border border-white/20">
          {/* Animated logo */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <Leaf size={48} color="white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
              <Star size={16} color="white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent text-center mb-4">
            EcoTrivia Challenge
          </h1>

          <p className="text-gray-600 text-center mb-8 leading-relaxed">
            Test your knowledge about carbon footprints and environmental impact! Answer questions quickly for bonus
            points and build your streak!
          </p>

          {/* Game stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl">
              <div className="text-2xl font-bold text-emerald-600 mb-1">8</div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
              <div className="text-2xl font-bold text-blue-600 mb-1">15s</div>
              <div className="text-sm text-gray-600">Per Question</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
              <div className="text-2xl font-bold text-purple-600 mb-1">100+</div>
              <div className="text-sm text-gray-600">Points</div>
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
          >
            🚀 Start Game
          </button>
        </div>
      </div>
    )
  }

  if (gameState === "finished") {
    const percentage = Math.round((score / (questions.length * 100)) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl max-w-lg w-full border border-white/20">
          {/* Confetti effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
              <Trophy size={64} color="white" />
            </div>

            <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Game Complete!
            </h2>

            <p className="text-gray-600 text-center mb-6 text-lg">{getScoreMessage()}</p>

            {/* Score display */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl mb-6 text-center border border-emerald-200">
              <div className="text-5xl font-bold text-emerald-600 mb-2">{score}</div>
              <div className="text-gray-600">Total Points</div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                <div className="text-2xl font-bold text-blue-600 mb-1">{percentage}%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                <div className="text-2xl font-bold text-purple-600 mb-1">{level}</div>
                <div className="text-sm text-gray-600">Level Reached</div>
              </div>
            </div>

            <button
              onClick={resetGame}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg flex items-center justify-center gap-3"
            >
              <RotateCcw size={20} />
              Play Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Game header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl mb-6 overflow-hidden border border-white/20">
          {/* Top bar */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Leaf size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">EcoTrivia</h1>
                  <p className="text-emerald-100">
                    Question {currentQuestion + 1} of {questions.length}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{score}</div>
                  <div className="text-sm text-emerald-100">Points</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1">
                    <Flame size={20} className="text-orange-300" />
                    <span className="text-2xl font-bold">{streak}</span>
                  </div>
                  <div className="text-sm text-emerald-100">Streak</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-gray-200 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-500 ease-out"
              style={{ width: getProgressWidth() }}
            />
          </div>

          {/* Timer and level bar */}
          <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 flex justify-between items-center border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
                style={{ backgroundColor: `${getTimerColor()}20`, color: getTimerColor() }}
              >
                <Timer size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: getTimerColor() }}>
                  {timeLeft}s
                </div>
                <div className="text-sm text-gray-500">Time left</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                <Zap size={20} color="white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">Level {level}</div>
                <div className="text-sm text-gray-500">Current level</div>
              </div>
            </div>
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
          {/* Category badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TreePine size={16} />
            {questions[currentQuestion].category}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
            {questions[currentQuestion].question}
          </h2>

          {/* Answer options */}
          <div className="grid gap-4 mb-8">
            {questions[currentQuestion].options.map((option, index) => {
              const baseClasses =
                "p-6 rounded-2xl border-2 transition-all duration-300 text-left font-medium relative overflow-hidden group"
              let colorClasses = ""

              if (showResult) {
                if (index === questions[currentQuestion].correct) {
                  colorClasses = "bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-400 text-emerald-800"
                } else if (index === selectedAnswer) {
                  colorClasses = "bg-gradient-to-r from-red-50 to-red-100 border-red-400 text-red-800"
                } else {
                  colorClasses = "bg-gray-50 border-gray-200 text-gray-600"
                }
              } else {
                colorClasses =
                  "bg-white border-gray-200 text-gray-700 hover:border-emerald-400 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:shadow-lg transform hover:scale-[1.02] cursor-pointer"
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={`${baseClasses} ${colorClasses}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        showResult && index === questions[currentQuestion].correct
                          ? "bg-emerald-500 text-white"
                          : showResult && index === selectedAnswer
                            ? "bg-red-500 text-white"
                            : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1">{option}</span>
                    {showResult && index === questions[currentQuestion].correct && (
                      <CheckCircle size={24} className="text-emerald-500" />
                    )}
                    {showResult && index === selectedAnswer && index !== questions[currentQuestion].correct && (
                      <XCircle size={24} className="text-red-500" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl mb-8 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                {selectedAnswer === questions[currentQuestion].correct ? (
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle size={16} color="white" />
                  </div>
                ) : selectedAnswer === null ? (
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Clock size={16} color="white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <XCircle size={16} color="white" />
                  </div>
                )}
                <span className="font-bold text-gray-800">
                  {selectedAnswer === questions[currentQuestion].correct
                    ? "🎉 Excellent!"
                    : selectedAnswer === null
                      ? "⏰ Time's up!"
                      : "💡 Good try!"}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">{questions[currentQuestion].explanation}</p>
            </div>
          )}

          {/* Next button */}
          {showResult && (
            <div className="text-center">
              <button
                onClick={nextQuestion}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
              >
                {currentQuestion < questions.length - 1 ? "➡️ Next Question" : "🏆 View Results"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CarbonFootprintGame
