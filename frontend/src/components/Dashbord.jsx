import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CourseCard from '../components/Dashboard/CourseCard';
import ProgressWidget from '../components/Dashboard/ProgressWidget';
import RecommendationList from '../components/Dashboard/RecommendationList';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated data - to be replaced with API calls
  useEffect(() => {
    // Fetch user data from API
    setTimeout(() => {
      setUserData({
        name: "Alex Johnson",
        progress: [
          { name: 'Week 1', score: 65 },
          { name: 'Week 2', score: 70 },
          { name: 'Week 3', score: 68 },
          { name: 'Week 4', score: 75 },
          { name: 'Week 5', score: 82 },
          { name: 'Week 6', score: 85 },
        ],
        courses: [
          { id: 1, title: "Introduction to Algebra", progress: 75, nextLesson: "Quadratic Equations" },
          { id: 2, title: "Creative Writing", progress: 45, nextLesson: "Character Development" },
          { id: 3, title: "Biology 101", progress: 90, nextLesson: "Cellular Respiration" },
        ],
        recommendations: [
          { id: 4, title: "Data Science Fundamentals", difficulty: "Intermediate", match: 95 },
          { id: 5, title: "World History", difficulty: "Beginner", match: 88 },
          { id: 6, title: "Physics Mechanics", difficulty: "Advanced", match: 82 },
        ],
        streak: 7,
        totalPoints: 1240
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-indigo-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 min-h-screen w-full bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-purple-800">Welcome back, {userData.name}!</h1>
            <p className="text-gray-600">Continue your learning journey</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <div className="bg-yellow-400 text-yellow-800 p-3 rounded-lg flex items-center mr-4">
              <span className="material-icons mr-1">local_fire_department</span>
              <span className="font-bold">{userData.streak} day streak</span>
            </div>
            <div className="bg-blue-400 text-blue-800 p-3 rounded-lg flex items-center">
              <span className="material-icons mr-1">stars</span>
              <span className="font-bold">{userData.totalPoints} points</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Your Learning Progress</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userData.progress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8e44ad" 
                  strokeWidth={3} 
                  dot={{ fill: '#8e44ad', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Courses */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Current Courses</h2>
          <div className="space-y-4">
            {userData.courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Recommended For You</h2>
          <p className="text-gray-600 mb-4">Based on your learning patterns and interests</p>
          <RecommendationList recommendations={userData.recommendations} />
        </div>

        {/* Weekly Goals */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Weekly Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ProgressWidget 
              title="Study Time" 
              current={12} 
              target={15} 
              unit="hours"
              color="bg-pink-500" 
            />
            <ProgressWidget 
              title="Quizzes Completed" 
              current={7} 
              target={10} 
              unit="quizzes"
              color="bg-green-500" 
            />
            <ProgressWidget 
              title="New Concepts" 
              current={18} 
              target={25} 
              unit="concepts"
              color="bg-blue-500" 
            />
          </div>
        </div>
      </div>

      {/* Enhanced floating quiz button */}
      <div className="fixed bottom-6 right-6 z-10 group">
        <button 
          onClick={() => window.location.href = "/quizzes"} 
          className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold p-4 w-16 h-16 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-300 flex items-center justify-center text-2xl "  >
          Quiz
        </button>
      </div>
    </div>
  );
};

export default Dashboard;