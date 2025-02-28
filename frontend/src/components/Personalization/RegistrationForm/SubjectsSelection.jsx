import React from 'react';
import { BookOpen } from 'lucide-react';

const subjects = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology',
  'Computer Science', 'English Literature', 'History',
  'Geography', 'Economics', 'Psychology', 'Foreign Languages',
  'Art & Design', 'Music', 'Physical Education'
];

const SubjectsSelection = ({ userData, setUserData, nextStep, prevStep }) => {
  const toggleSubject = (subject) => {
    const updatedSubjects = userData.subjects.includes(subject)
      ? userData.subjects.filter(s => s !== subject)
      : [...userData.subjects, subject];
    
    setUserData({ ...userData, subjects: updatedSubjects });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-green-100 rounded-full">
            <BookOpen className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">What subjects do you want to study?</h2>
        <p className="text-gray-600 mt-2">Select all that apply</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => toggleSubject(subject)}
            className={`p-3 rounded-lg border-2 transition-all ${
              userData.subjects.includes(subject)
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
            }`}
          >
            {subject}
          </button>
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
          onClick={nextStep}
          disabled={userData.subjects.length === 0}
          className={`px-6 py-2 rounded-lg ${
            userData.subjects.length === 0
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

export default SubjectsSelection;