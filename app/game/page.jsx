"use client"
import React, { useState, useEffect } from 'react';
import { Leaf, Award, RotateCcw, Timer, Zap, TreePine, Recycle } from 'lucide-react';

const CarbonFootprintGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'finished'
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [level, setLevel] = useState(1);

  const questions = [
    {
      question: "Which transportation method has the lowest carbon footprint?",
      options: ["Car", "Bus", "Bicycle", "Train"],
      correct: 2,
      explanation: "Bicycles have zero emissions and are the most eco-friendly transportation option!"
    },
    {
      question: "What percentage of global greenhouse gas emissions comes from livestock?",
      options: ["5%", "10%", "14.5%", "20%"],
      correct: 2,
      explanation: "Livestock farming contributes approximately 14.5% of global greenhouse gas emissions."
    },
    {
      question: "Which appliance typically uses the most electricity in a home?",
      options: ["Refrigerator", "Air Conditioner", "Washing Machine", "TV"],
      correct: 1,
      explanation: "Air conditioning typically accounts for the largest portion of home electricity use."
    },
    {
      question: "How much water does it take to produce one cotton t-shirt?",
      options: ["100 liters", "500 liters", "1,000 liters", "2,700 liters"],
      correct: 3,
      explanation: "It takes approximately 2,700 liters of water to produce one cotton t-shirt!"
    },
    {
      question: "Which renewable energy source is most widely used globally?",
      options: ["Solar", "Wind", "Hydroelectric", "Geothermal"],
      correct: 2,
      explanation: "Hydroelectric power is the most widely used renewable energy source worldwide."
    },
    {
      question: "What is the best way to reduce food waste's carbon impact?",
      options: ["Eat less meat", "Buy local only", "Compost scraps", "Reduce food waste"],
      correct: 3,
      explanation: "Reducing food waste is the most effective way to minimize your food-related carbon footprint."
    },
    {
      question: "How much can switching to LED bulbs reduce energy consumption?",
      options: ["25%", "50%", "75%", "90%"],
      correct: 2,
      explanation: "LED bulbs use about 75% less energy than traditional incandescent bulbs."
    },
    {
      question: "Which country has the highest per capita carbon footprint?",
      options: ["China", "United States", "Qatar", "Germany"],
      correct: 2,
      explanation: "Qatar has the highest per capita carbon emissions due to its oil industry and high consumption."
    }
  ];

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameState]);

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setLevel(1);
    setTimeLeft(15);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (selectedIndex) => {
    if (showResult) return;
    
    setSelectedAnswer(selectedIndex);
    setShowResult(true);
    
    if (selectedIndex === questions[currentQuestion].correct) {
      const timeBonus = Math.floor(timeLeft / 3);
      const streakBonus = streak * 10;
      const levelBonus = level * 5;
      const totalPoints = 100 + timeBonus + streakBonus + levelBonus;
      
      setScore(score + totalPoints);
      setStreak(streak + 1);
      
      if (streak + 1 >= 3) {
        setLevel(Math.min(level + 1, 5));
      }
    } else {
      setStreak(0);
    }
  };

  const handleTimeUp = () => {
    setSelectedAnswer(null);
    setShowResult(true);
    setStreak(0);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(15);
    } else {
      setGameState('finished');
    }
  };

  const resetGame = () => {
    setGameState('start');
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setLevel(1);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / (questions.length * 100)) * 100;
    if (percentage >= 80) return "🌟 Eco Champion! You're a carbon footprint expert!";
    if (percentage >= 60) return "🌿 Environmental Enthusiast! Great job!";
    if (percentage >= 40) return "🌱 Good start! Keep learning about sustainability!";
    return "🌍 Every step counts! Keep learning about our planet!";
  };

  const getProgressWidth = () => {
    return `${((currentQuestion + 1) / questions.length) * 100}%`;
  };

  if (gameState === 'start') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f8ff 0%, #e8f5e8 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '500px',
          width: '90%'
        }}>
          <div style={{
            backgroundColor: '#22c55e',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            animation: 'pulse 2s infinite'
          }}>
            <Leaf size={40} color="white" />
          </div>
          <h1 style={{
            color: '#16a34a',
            fontSize: '2.5rem',
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            EcoTrivia Challenge
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '1.1rem',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Test your knowledge about carbon footprints and environmental impact! 
            Answer questions quickly for bonus points and build your streak!
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#22c55e', fontSize: '2rem', fontWeight: 'bold' }}>8</div>
              <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Questions</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#22c55e', fontSize: '2rem', fontWeight: 'bold' }}>15s</div>
              <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Per Question</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#22c55e', fontSize: '2rem', fontWeight: 'bold' }}>100+</div>
              <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Points</div>
            </div>
          </div>
          <button 
            onClick={startGame}
            style={{
              backgroundColor: '#22c55e',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f8ff 0%, #e8f5e8 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '500px',
          width: '90%'
        }}>
          <div style={{
            backgroundColor: '#22c55e',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            animation: 'bounce 1s infinite'
          }}>
            <Award size={50} color="white" />
          </div>
          <h2 style={{
            color: '#16a34a',
            fontSize: '2.5rem',
            marginBottom: '1rem'
          }}>
            Game Complete!
          </h2>
          <p style={{
            color: '#6b7280',
            fontSize: '1.2rem',
            marginBottom: '2rem'
          }}>
            {getScoreMessage()}
          </p>
          <div style={{
            backgroundColor: '#f0f8ff',
            padding: '1.5rem',
            borderRadius: '15px',
            marginBottom: '2rem'
          }}>
            <div style={{
              color: '#22c55e',
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem'
            }}>
              {score}
            </div>
            <div style={{ color: '#6b7280' }}>Total Points</div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#22c55e', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {Math.round((score / (questions.length * 100)) * 100)}%
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Accuracy</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#22c55e', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {level}
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Level Reached</div>
            </div>
          </div>
          <button 
            onClick={resetGame}
            style={{
              backgroundColor: '#22c55e',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              margin: '0 auto'
            }}
          >
            <RotateCcw size={20} />
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f8ff 0%, #e8f5e8 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#22c55e',
          color: 'white',
          padding: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Leaf size={30} />
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>EcoTrivia</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Question {currentQuestion + 1} of {questions.length}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{score}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Points</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{streak}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Streak</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          backgroundColor: '#f3f4f6',
          height: '8px',
          position: 'relative'
        }}>
          <div style={{
            backgroundColor: '#22c55e',
            height: '100%',
            width: getProgressWidth(),
            transition: 'width 0.3s ease'
          }}></div>
        </div>

        {/* Timer and Level */}
        <div style={{
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f8fffe',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: timeLeft <= 5 ? '#ef4444' : '#22c55e'
          }}>
            <Timer size={20} />
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{timeLeft}s</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#22c55e'
          }}>
            <Zap size={20} />
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Level {level}</span>
          </div>
        </div>

        {/* Question */}
        <div style={{ padding: '2rem' }}>
          <h2 style={{
            color: '#1f2937',
            fontSize: '1.5rem',
            marginBottom: '2rem',
            lineHeight: '1.4'
          }}>
            {questions[currentQuestion].question}
          </h2>

          {/* Answer Options */}
          <div style={{
            display: 'grid',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {questions[currentQuestion].options.map((option, index) => {
              let backgroundColor = '#f9fafb';
              let borderColor = '#e5e7eb';
              let color = '#374151';
              
              if (showResult) {
                if (index === questions[currentQuestion].correct) {
                  backgroundColor = '#dcfce7';
                  borderColor = '#22c55e';
                  color = '#166534';
                } else if (index === selectedAnswer) {
                  backgroundColor = '#fee2e2';
                  borderColor = '#ef4444';
                  color = '#dc2626';
                }
              } else if (selectedAnswer === index) {
                backgroundColor = '#e0f2fe';
                borderColor = '#0284c7';
                color = '#0369a1';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  style={{
                    backgroundColor,
                    border: `2px solid ${borderColor}`,
                    color,
                    padding: '1rem',
                    borderRadius: '10px',
                    cursor: showResult ? 'default' : 'pointer',
                    fontSize: '1rem',
                    textAlign: 'left',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseOver={(e) => {
                    if (!showResult) {
                      e.target.style.borderColor = '#22c55e';
                      e.target.style.backgroundColor = '#f0f8ff';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!showResult) {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.backgroundColor = '#f9fafb';
                    }
                  }}
                >
                  <span style={{
                    backgroundColor: borderColor,
                    color: 'white',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div style={{
              backgroundColor: '#f0f8ff',
              padding: '1.5rem',
              borderRadius: '10px',
              marginBottom: '2rem',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                color: '#1f2937',
                fontSize: '1rem',
                marginBottom: '0.5rem'
              }}>
                {selectedAnswer === questions[currentQuestion].correct ? 
                  '✅ Correct!' : 
                  selectedAnswer === null ? 
                  '⏰ Time\'s up!' : 
                  '❌ Not quite right!'
                }
              </div>
              <div style={{
                color: '#6b7280',
                fontSize: '0.95rem',
                lineHeight: '1.5'
              }}>
                {questions[currentQuestion].explanation}
              </div>
            </div>
          )}

          {/* Next Button */}
          {showResult && (
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={nextQuestion}
                style={{
                  backgroundColor: '#22c55e',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprintGame;