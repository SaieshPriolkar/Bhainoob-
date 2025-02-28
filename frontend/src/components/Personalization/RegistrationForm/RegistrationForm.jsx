import React, { useState } from 'react';
import EmailPasswordForm from './EmailPasswordForm';
import GradeSelection from './GradeSelection';
import InterestsSelection from './InterestsSelection';
import SubjectsSelection from './SubjectsSelection';
import LearningStyleSelection from './LearningStyleSelection';
import StudyGoalsSelection from './StudyGoalsSelection';
import RegistrationSummary from './RegistrationSummary';

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    interests: [],
    subjects: []
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <EmailPasswordForm userData={userData} setUserData={setUserData} nextStep={nextStep} />;
      case 2:
        return <GradeSelection userData={userData} setUserData={setUserData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <InterestsSelection userData={userData} setUserData={setUserData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <SubjectsSelection userData={userData} setUserData={setUserData} nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <LearningStyleSelection userData={userData} setUserData={setUserData} nextStep={nextStep} prevStep={prevStep} />;
      case 6:
        return <StudyGoalsSelection userData={userData} setUserData={setUserData} nextStep={nextStep} prevStep={prevStep} />;
      case 7:
        return <RegistrationSummary userData={userData} setUserData={setUserData} nextStep={nextStep} prevStep={prevStep} />;
      default:
        return <EmailPasswordForm userData={userData} setUserData={setUserData} nextStep={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          EduLearn Platform
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${(step / 7) * 100}%` }}
              ></div>
            </div>
            <div className="mt-2 text-xs text-gray-500 text-right">
              Step {step} of 7
            </div>
          </div>
          
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;