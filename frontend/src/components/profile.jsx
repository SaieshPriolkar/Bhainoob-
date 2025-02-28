import React from 'react';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const navigate = useNavigate();
  const userProfile = {
    email: "vigneshgaunker@gmail.com",
    grade: "College Junior",
    interests: ["Engineering"],
    subjects: ["Psychology"],
    learningStyle: "Reading",
    studyGoals: "Learn new skills for career advancement"
  };

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing auth state)
    navigate('/');
  };
  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-r from-blue-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Email Section */}
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Email</h3>
            <p className="text-black text-base font-medium break-words">{userProfile.email}</p>
          </div>
          
          {/* Grade Section */}
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Grade</h3>
            <p className="text-black text-base font-medium">{userProfile.grade}</p>
          </div>
          
          {/* Interests Section */}
          <div>
           <h3 className="text-gray-500 text-sm font-medium mb-1 text-center">Interests</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {userProfile.interests.map((interest, index) => (
                <span 
                  key={index} 
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
          
          {/* Subjects Section */}
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1 text-center">Subjects</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {userProfile.subjects.map((subject, index) => (
                <span 
                  key={index} 
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
          
          {/* Learning Style Section */}
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Learning Style</h3>
            <p className="text-black text-base font-medium">{userProfile.learningStyle}</p>
          </div>
          
          {/* Study Goals Section */}
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Study Goals</h3>
            <p className="text-black text-base font-medium">{userProfile.studyGoals}</p>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-center p-4 gap-4 border-t border-gray-200">
          <button 
            className="w-32 py-2 text-sm bg-purple-100 text-gray-700  text-white rounded-md hover:bg-gray-300 transition-colors duration-200 font-medium"
            onClick={() => console.log("Back clicked")}
          >
            Back
          </button>
          <button 
            className="w-30  py-2 text-sm bg-purple-100 text-white rounded-md hover:bg-purple-600 transition-colors duration-200 font-medium"
            onClick={handleLogout}
          >
           Log Out 
          </button>
        </div>
      </div>
    </div>
  );
};
export default Profile;