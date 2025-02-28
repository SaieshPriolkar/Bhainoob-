import React from 'react';
import { Brain } from 'lucide-react';

const learningStyles = [
  {
    id: 'visual',
    title: 'Visual Learner',
    description: 'You learn best through images, diagrams, and spatial understanding'
  },
  {
    id: 'auditory',
    title: 'Auditory Learner',
    description: 'You learn best through listening, discussions, and verbal instructions'
  },
  {
    id: 'reading',
    title: 'Reading/Writing Learner',
    description: 'You learn best through reading texts and writing notes'
  },
  {
    id: 'kinesthetic',
    title: 'Kinesthetic Learner',
    description: 'You learn best through hands-on activities and physical experiences'
  }
];

const LearningStyleSelection = ({ userData, setUserData, nextStep, prevStep }) => {
  const handleStyleSelect = (style) => {
    setUserData({ ...userData, learningStyle: style });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <Brain className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">How do you learn best?</h2>
        <p className="text-gray-600 mt-2">Select your preferred learning style</p>
      </div>

      <div className="space-y-3 mb-6">
        {learningStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => handleStyleSelect(style.id)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
              userData.learningStyle === style.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
            }`}
          >
            <h3 className="font-medium text-gray-800">{style.title}</h3>
            <p className="text-sm text-gray-600">{style.description}</p>
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
          disabled={!userData.learningStyle}
          className={`px-6 py-2 rounded-lg ${
            !userData.learningStyle
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

export default LearningStyleSelection;