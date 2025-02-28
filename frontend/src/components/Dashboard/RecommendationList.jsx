import React from 'react';

const RecommendationList = ({ recommendations }) => {
  // Function to determine badge color based on difficulty level
  const getBadgeColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-3">
      {recommendations.map((course) => (
        <div key={course.id} className="border-2 border-indigo-100 rounded-lg p-4 transition-all duration-300 hover:shadow-md hover:border-indigo-300">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-indigo-800">{course.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(course.difficulty)}`}>
              {course.difficulty}
            </span>
          </div>
          
          <div className="mt-2 flex items-center">
            <div className="bg-purple-100 text-purple-800 rounded-full px-2 py-1 text-sm font-medium">
              {course.match}% match
            </div>
            {/* <div className="ml-2 text-black">
              {Array(5).fill().map((_, i) => (
                <span key={i} className="material-icons text-sm">
                  {i < Math.floor(course.match / 20) ? 'star' : 'star_border'}
                </span>
              ))}
            </div> */}
          </div>
          
          <button className="mt-3 w-full py-2 bg-gradient-to-r from-indigo-500 to-indigo-500 text-white rounded-md font-medium hover:from-blue-600 hover:to-blue-500 transition-colors duration-300">
            Explore Course
          </button>
        </div>
      ))}

    </div>
  );
};

export default RecommendationList;