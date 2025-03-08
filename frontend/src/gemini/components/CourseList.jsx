import React from 'react';

const CourseList = ({ courses, onContinueCourse }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-black mb-4">Current Courses</h2>
      
      {courses.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>You haven't started any courses yet.</p>
          <p className="mt-2 text-sm">Enter a topic in the search box to begin learning!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {courses.map(course => (
            <div key={course.id} className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-indigo-600 mb-2">{course.title}</h3>
              
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>{course.progress}% complete</span>
                  <span>Next: {course.nextSection}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <button
                onClick={() => onContinueCourse(course.id)}
                className="w-full mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
              >
                Continue Learning
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;