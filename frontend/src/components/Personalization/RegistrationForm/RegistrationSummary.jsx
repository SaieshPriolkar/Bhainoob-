import React, { useState } from 'react';
import { Check, Loader } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

const RegistrationSummary = ({ userData, prevStep }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        userData.email, 
        userData.password
      );
      
      const user = userCredential.user;
      
      // Store user data in Firestore (excluding password)
      const { password, ...userDataForFirestore } = userData;
      
      await setDoc(doc(db, 'users', user.uid), {
        ...userDataForFirestore,
        createdAt: new Date().toISOString(),
        uid: user.uid
      });
      
      // Navigate to dashboard or recommendations page
      navigate('/dashboard');
    } catch (err) {
      console.error('Error during registration:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-green-100 rounded-full">
            <Check className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Registration Summary</h2>
        <p className="text-gray-600 mt-2">Please review your information</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="mt-1">{userData.email}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Grade</h3>
            <p className="mt-1">{userData.grade}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Interests</h3>
            <div className="mt-1 flex flex-wrap gap-2">
              {userData.interests.map(interest => (
                <span key={interest} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {interest}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Subjects</h3>
            <div className="mt-1 flex flex-wrap gap-2">
              {userData.subjects.map(subject => (
                <span key={subject} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {subject}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Learning Style</h3>
            <p className="mt-1 capitalize">{userData.learningStyle}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Study Goals</h3>
            <p className="mt-1">{userData.studyGoals}</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
          disabled={isSubmitting}
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center"
        >
          {isSubmitting ? (
            <>
              <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Creating Account...
            </>
          ) : (
            'Complete Registration'
          )}
        </button>
      </div>
    </div>
  );
};

export default RegistrationSummary;