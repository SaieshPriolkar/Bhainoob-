import React, { useState } from 'react';

const quizzes = {
  Easy: [
    { id: 1, question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: '4' },
    { id: 2, question: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris', 'Rome'], answer: 'Paris' },
  ],
  Medium: [
    { id: 3, question: 'Who developed the theory of relativity?', options: ['Newton', 'Einstein', 'Galileo', 'Tesla'], answer: 'Einstein' },
    { id: 4, question: 'Which element has the chemical symbol "O"?', options: ['Oxygen', 'Gold', 'Silver', 'Hydrogen'], answer: 'Oxygen' },
  ],
  Hard: [
    { id: 5, question: 'What is the derivative of sin(x)?', options: ['cos(x)', '-cos(x)', 'tan(x)', '-sin(x)'], answer: 'cos(x)' },
    { id: 6, question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], answer: 'Mars' },
  ],
};

const Quizzes = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswerClick = (quizId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [quizId]: answer });
  };

  return (
    <div className=" absolute top-0 left-0 min-h-screen w-full bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      <h1 className="text-3xl font-bold text-yellow-300 mb-6">Quizzes</h1>
      
      {!difficulty ? (
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold text-white mb-4">Select Difficulty Level</h2>
          <div className="flex space-x-4">
            {['Easy', 'Medium', 'Hard'].map(level => (
              <button 
                key={level} 
                className="bg-yellow-400 shadow-md px-6 py-3 rounded-lg text-blue-900 font-semibold hover:bg-yellow-300"
                onClick={() => setDifficulty(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">{difficulty} Level Questions</h2>
          {quizzes[difficulty].map(quiz => (
            <div key={quiz.id} className="mb-4 p-4 border rounded-lg bg-blue-50">
              <p className="font-semibold text-lg text-blue-800">{quiz.question}</p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {quiz.options.map(option => (
                  <button
                    key={option}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedAnswers[quiz.id] === option 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white text-pink-700 hover:bg-pink-100'
                    }`}
                    onClick={() => handleAnswerClick(quiz.id, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button 
            className="mt-6 px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600"
            onClick={() => { setDifficulty(null); setSelectedAnswers({}); }}
          >
            Choose Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Quizzes;