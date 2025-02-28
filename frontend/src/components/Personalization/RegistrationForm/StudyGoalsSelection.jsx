import React, { useState } from 'react';
import { Target } from 'lucide-react';

const studyGoals = [
  'Improve grades in school',
  'Prepare for standardized tests',
  'Learn new skills for career advancement',
  'Personal enrichment and curiosity',
  'Prepare for college/university',
  'Help with homework and assignments',
  'Other (please specify)'
];

const StudyGoalsSelection = ({ userData, setUserData, nextStep, prevStep }) => {
  const [otherGoal, setOtherGoal] = useState('');

  const handleGoalSelect = (goal) => {
    if (goal === 'Other (please specify)') {
      setUserData({ ...userData, studyGoals: otherGoal });
    } else {
      setUserData({ ...userData, studyGoals: goal });
    }
  };

  const handleSubmit = () => {
    if (userData.studyGoals === 'Other (please specify)') {
      setUserData({ ...userData, studyGoals: otherGoal });
    }
    nextStep();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-red-100 rounded-full">
            <Target className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">What are your study goals?</h2>
        <p className="text-gray-600 mt-2">Select your primary goal</p>
      </div>

      <div className="space-y-3 mb-6">
        {studyGoals.map((goal) => (
          <div key={goal}>
            <button
              onClick={() => handleGoalSelect(goal)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                userData.studyGoals === goal || (goal === 'Other (please specify)' && userData.studyGoals === otherGoal)
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
              }`}
            >
              {goal}
            </button>
            {goal === 'Other (please specify)' && userData.studyGoals === 'Other (please specify)' && (
              <input
                type="text"
                value={otherGoal}
                onChange={(e) => setOtherGoal(e.target.value)}
                placeholder="Please specify your goal"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!userData.studyGoals && !otherGoal}
          className={`px-6 py-2 rounded-lg ${
            !userData.studyGoals && !otherGoal
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default StudyGoalsSelection;