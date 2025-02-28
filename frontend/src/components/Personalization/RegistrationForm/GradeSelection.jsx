import React from 'react';
import { GraduationCap } from 'lucide-react';

const grades = [
  '6th Grade', '7th Grade', '8th Grade', '9th Grade', 
  '10th Grade', '11th Grade', '12th Grade', 'College Freshman',
  'College Sophomore', 'College Junior', 'College Senior', 'Graduate Student'
];

const GradeSelection = ({ userData, setUserData, nextStep }) => {
  const handleGradeSelect = (grade) => {
    setUserData({ ...userData, grade });
    nextStep();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <GraduationCap className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">What grade are you in?</h2>
        <p className="text-gray-600 mt-2">This helps us personalize your learning experience</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {grades.map((grade) => (
          <button
            key={grade}
            onClick={() => handleGradeSelect(grade)}
            className={`p-4 rounded-lg border-2 transition-all ${
              userData.grade === grade
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            {grade}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GradeSelection;