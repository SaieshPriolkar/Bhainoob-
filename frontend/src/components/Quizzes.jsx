import React, { useState } from 'react';

// Expanded question set with more questions per level
const quizzes = {
  Easy: [
    { id: 1, question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: '4' },
    { id: 2, question: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris', 'Rome'], answer: 'Paris' },
    { id: 3, question: 'Which planet is closest to the Sun?', options: ['Earth', 'Venus', 'Mercury', 'Mars'], answer: 'Mercury' },
    { id: 4, question: 'How many continents are there on Earth?', options: ['5', '6', '7', '8'], answer: '7' },
    { id: 5, question: 'What is the largest mammal?', options: ['Elephant', 'Giraffe', 'Blue Whale', 'Hippopotamus'], answer: 'Blue Whale' },
  ],
  Medium: [
    { id: 6, question: 'Who developed the theory of relativity?', options: ['Newton', 'Einstein', 'Galileo', 'Tesla'], answer: 'Einstein' },
    { id: 7, question: 'Which element has the chemical symbol "O"?', options: ['Oxygen', 'Gold', 'Silver', 'Hydrogen'], answer: 'Oxygen' },
    { id: 8, question: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], answer: 'Canberra' },
    { id: 9, question: 'In which year did World War II end?', options: ['1943', '1945', '1947', '1950'], answer: '1945' },
    { id: 10, question: 'How many bones are in the adult human body?', options: ['186', '206', '226', '246'], answer: '206' },
  ],
  Hard: [
    { id: 11, question: 'What is the derivative of sin(x)?', options: ['cos(x)', '-cos(x)', 'tan(x)', '-sin(x)'], answer: 'cos(x)' },
    { id: 12, question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], answer: 'Mars' },
    { id: 13, question: 'Who wrote "War and Peace"?', options: ['Fyodor Dostoevsky', 'Leo Tolstoy', 'Anton Chekhov', 'Ivan Turgenev'], answer: 'Leo Tolstoy' },
    { id: 14, question: 'What is the smallest prime number greater than 100?', options: ['101', '103', '107', '109'], answer: '101' },
    { id: 15, question: 'Which enzyme is responsible for DNA replication?', options: ['DNA Polymerase', 'RNA Polymerase', 'Helicase', 'Ligase'], answer: 'DNA Polymerase' },
  ],
};

const difficultyColors = {
  Easy: 'bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white',
  Medium: 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white',
  Hard: 'bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white'
};

const Quizzes = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerClick = (quizId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [quizId]: answer });
  };

  const handleSubmit = () => {
    let currentScore = 0;
    quizzes[difficulty].forEach(quiz => {
      if (selectedAnswers[quiz.id] === quiz.answer) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setDifficulty(null);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const getOptionClass = (quiz, option) => {
    const baseClass = "px-4 py-3 rounded-lg border transition-all duration-300";
    
    if (showResults) {
      if (option === quiz.answer) {
        return `${baseClass} bg-gradient-to-r from-indigo-300 to-black-500 text-white border-green-400 shadow-md`;
      } else if (selectedAnswers[quiz.id] === option) {
        return `${baseClass} bg-gradient-to-r from-red-400 to-red-500 text-white border-red-400`;
      } else {
        return `${baseClass} bg-white text-gray-500 border-gray-200`;
      }
    }
    
    return selectedAnswers[quiz.id] === option
      ? `${baseClass} bg-gradient-to-r from-purple-400 to-violet-500 text-white border-violet-400 shadow-md transform scale-105`
      : `${baseClass} bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 hover:shadow-sm`;
  };

  return (
    <div className="absolute top-0 left-0 min-h-screen w-full bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to indigo-100 mb-8 text-center">Knowledge Quiz</h1>
        
        {!difficulty ? (
          <div className="bg-white shadow-lg rounded-xl p-8 text-center border border-indigo-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Select Your Challenge Level</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {['Easy', 'Medium', 'Hard'].map(level => (
                <button 
                  key={level} 
                  className={`${difficultyColors[level]} shadow-md px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                  onClick={() => setDifficulty(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        ) : showResults ? (
          <div className="bg-white shadow-lg rounded-xl p-8 text-center border border-indigo-100">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6">Quiz Results</h2>
            <div className="mb-8">
              <div className="inline-block relative">
                <svg className="w-40 h-40" viewBox="0 0 100 100">
                  <circle 
                    className="text-gray-200" 
                    strokeWidth="10" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="40" 
                    cx="50" 
                    cy="50" 
                  />
                  <circle 
                    className={score/quizzes[difficulty].length >= 0.7 ? "text-green-500" : "text-amber-500"} 
                    strokeWidth="10" 
                    strokeDasharray={251.2} 
                    strokeDashoffset={251.2 - (251.2 * score / quizzes[difficulty].length)} 
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="40" 
                    cx="50" 
                    cy="50" 
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">
                    {score}/{quizzes[difficulty].length}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-xl mb-6">
              {score === quizzes[difficulty].length 
                ? "Perfect! You got all answers correct!" 
                : score >= quizzes[difficulty].length * 0.7 
                  ? "Great job! You did really well!" 
                  : "Good effort! Try again to improve your score."}
            </p>
            
            <div className="flex justify-center gap-4">
              <button 
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md"
                onClick={() => {setShowResults(false); setSelectedAnswers({});}}
              >
                Try Again
              </button>
              <button 
                className="px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 rounded-lg font-semibold hover:from-gray-300 hover:to-gray-400 transition-all duration-300 shadow-md"
                onClick={resetQuiz}
              >
                Choose New Level
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-xl p-8 border border-indigo-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                {difficulty} Level Quiz
              </h2>
              <div className="bg-indigo-100 px-4 py-2 rounded-full text-indigo-800 font-medium">
                {Object.keys(selectedAnswers).length}/{quizzes[difficulty].length} answered
              </div>
            </div>
            
            {quizzes[difficulty].map((quiz, index) => (
              <div key={quiz.id} className="mb-6 p-6 border border-indigo-50 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 shadow-sm">
                <p className="font-semibold text-lg text-gray-800 mb-4">
                  <span className="inline-flex items-center justify-center bg-indigo-600 text-white rounded-full w-8 h-8 mr-3">
                    {index + 1}
                  </span>
                  {quiz.question}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {quiz.options.map(option => (
                    <button
                      key={option}
                      className={getOptionClass(quiz, option)}
                      onClick={() => handleAnswerClick(quiz.id, option)}
                      disabled={showResults}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="flex justify-between mt-8">
              <button 
                className="px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 rounded-lg font-semibold hover:from-gray-300 hover:to-gray-400 transition-all duration-300 shadow-md"
                onClick={resetQuiz}
              >
                Change Level
              </button>
              
              <button 
                className={`px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-md
                  ${Object.keys(selectedAnswers).length === quizzes[difficulty].length 
                    ? "hover:from-indigo-600 hover:to-purple-700" 
                    : "opacity-50 cursor-not-allowed"}`}
                onClick={handleSubmit}
                disabled={Object.keys(selectedAnswers).length !== quizzes[difficulty].length}
              >
                Submit Answers
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizzes;