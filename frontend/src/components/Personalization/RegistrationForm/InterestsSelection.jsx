import React from 'react';
import { Lightbulb } from 'lucide-react';

const interests = [
  'Science & Technology', 'Mathematics', 'Literature & Writing',
  'History & Social Studies', 'Arts & Music', 'Foreign Languages',
  'Computer Science', 'Engineering', 'Business & Economics',
  'Health & Medicine', 'Environmental Studies', 'Physical Education'
];

const InterestsSelection = ({ userData, setUserData, nextStep, prevStep }) => {
  const toggleInterest = (interest) => {
    const updatedInterests = userData.interests.includes(interest)
      ? userData.interests.filter(i => i !== interest)
      : [...userData.interests, interest];
    
    setUserData({ ...userData, interests: updatedInterests });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-yellow-100 rounded-full">
            <Lightbulb className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">What are your interests?</h2>
        <p className="text-gray-600 mt-2">Select all that apply</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {interests.map((interest) => (
          <button
            key={interest}
            onClick={() => toggleInterest(interest)}
            className={`p-3 rounded-lg border-2 transition-all ${
              userData.interests.includes(interest)
                ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
            }`}
          >
            {interest}
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
          disabled={userData.interests.length === 0}
          className={`px-6 py-2 rounded-lg ${
            userData.interests.length === 0
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

export default InterestsSelection;