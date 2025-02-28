import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import { generateQuiz, analyzeQuizPerformance } from '../services/gemini';

const Quiz = ({ topic, quizAttempts, onQuizComplete, onRetry }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [difficulty, setDifficulty] = useState('medium');

  useEffect(() => {
    const loadQuiz = async () => {
      setLoading(true);
      try {
        // Determine difficulty based on previous attempts
        let quizDifficulty = 'medium';
        if (quizAttempts === 1) quizDifficulty = 'easy';
        else if (quizAttempts === 2) quizDifficulty = 'medium';
        else if (quizAttempts >= 3) quizDifficulty = 'hard';
        
        setDifficulty(quizDifficulty);
        const quizQuestions = await generateQuiz(topic, quizDifficulty);
        setQuestions(quizQuestions);
      } catch (error) {
        console.error("Failed to load quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [topic, quizAttempts]);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    // Update score if answer is correct
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Move to next question or show results
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    // Calculate final score including the last question
    const finalScore = selectedOption === questions[currentQuestion].correctAnswer 
      ? score + 1 
      : score;
    
    setScore(finalScore);
    
    try {
      const analysis = await analyzeQuizPerformance(finalScore, questions.length);
      setFeedback(analysis.feedback);
      onQuizComplete(finalScore, analysis.feedback);
    } catch (error) {
      console.error("Failed to analyze quiz performance:", error);
      setFeedback("Keep practicing to improve your understanding of the topic.");
      onQuizComplete(finalScore, "Keep practicing to improve your understanding of the topic.");
    }
    
    setShowResults(true);
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Generating your {difficulty} quiz...</p>
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="p-6">
        <div className="text-center mb-6">
          <Award className="h-12 w-12 text-indigo-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold">Quiz Results</h3>
          <div className="mt-4 text-3xl font-bold">
            {score} / {questions.length}
            <span className="ml-2 text-lg font-normal text-gray-600">({percentage}%)</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h4 className="text-lg font-semibold mb-2">Feedback</h4>
          <p className="text-gray-700">{feedback}</p>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={onRetry}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">Question {currentQuestion + 1} of {questions.length}</h3>
          <div className="text-sm font-medium text-indigo-600">
            Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {questions.length > 0 && (
        <>
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-4">{questions[currentQuestion].question}</h4>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedOption === index 
                      ? 'border-indigo-600 bg-indigo-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                      selectedOption === index 
                        ? 'border-indigo-600 bg-indigo-600' 
                        : 'border-gray-400'
                    }`}>
                      {selectedOption === index && (
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
            className={`w-full py-2 px-4 rounded-md transition duration-200 ${
              selectedOption === null
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;