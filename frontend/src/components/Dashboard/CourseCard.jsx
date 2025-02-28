import React from 'react';

const CourseCard = ({ course }) => {
  // Default Dummy Data
  const dummyCourse = {
    title: "React Fundamentals",
    progress: 75,
    nextLesson: "Component Lifecycle",
  };

  // Use provided course data or fallback to dummy data
  const courseData = course || dummyCourse;

  return (
    <div className="border-2 border-indigo-100 rounded-lg p-4 transition-all duration-300 hover:shadow-md hover:border-indigo-300">
      <h3 className="font-bold text-lg text-indigo-800">{courseData.title}</h3>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 mt-3 mb-2">
        <div 
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full" 
          style={{ width: `${courseData.progress}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-gray-600 text-sm">{courseData.progress}% complete</span>
        <span className="text-purple-700 text-sm font-medium">Next: {courseData.nextLesson}</span>
      </div>
      
      <button className="mt-3 w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md font-medium hover:from-indigo-600 hover:to-purple-700 transition-colors duration-300">
        Continue Learning
      </button>
    </div>
  );
};

export default CourseCard;
