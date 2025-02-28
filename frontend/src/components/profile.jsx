import React from 'react';

const Profile = () => {
  const userProfile = {
    email: "vigneshgaunker@gmail.com",
    grade: "College Junior",
    interests: ["Engineering"],
    subjects: ["Psychology"],
    learningStyle: "Reading",
    studyGoals: "Learn new skills for career advancement"
  };

  return (
    <div className="min-h-screen bg-blue-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Email Section */}
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Email</h3>
            <p className="text-black text-base font-medium">{userProfile.email}</p>
          </div>
          
          {/* Grade Section */}
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Grade</h3>
            <p className="text-black text-base font-medium">{userProfile.grade}</p>
          </div>
          
          {/* Interests Section */}
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Interests</h3>
            <div className="flex flex-wrap gap-2">
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
            <h3 className="text-gray-500 text-sm font-medium mb-1">Subjects</h3>
            <div className="flex flex-wrap gap-2">
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
        <div className="flex border-t border-gray-200">
          <button 
            className="w-1/2 py-4 text-gray-600 hover:bg-gray-50 transition-colors duration-200 font-medium"
            onClick={() => console.log("Back clicked")}
          >
            Back
          </button>
          <button 
            className="w-1/2 py-4 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 font-medium"
            onClick={() => console.log("Complete Registration clicked")}
          >
            Complete Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;