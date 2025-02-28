import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CourseCard from './Dashboard/CourseCard';
import ProgressWidget from '../components/Dashboard/ProgressWidget';
import RecommendationList from '../components/Dashboard/RecommendationList';
<<<<<<< HEAD
import { User, ChevronDown, LogOut, Settings, HelpCircle } from 'lucide-react';
=======
import { useNavigate } from 'react-router-dom';
>>>>>>> 8d3f21ce848522c91cd2aca0d3f6a4eeeb5de52e

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
<<<<<<< HEAD
  const [dropdownOpen, setDropdownOpen] = useState(false);
=======
  const navigate = useNavigate();
>>>>>>> 8d3f21ce848522c91cd2aca0d3f6a4eeeb5de52e

  // Simulated data - to be replaced with API calls
  useEffect(() => {
    // Fetch user data from API
    setTimeout(() => {
      setUserData({
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        accountType: "Premium",
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
          { id: 3, title: "Biology", progress: 90, nextLesson: "Cellular Respiration" },
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(false);
    };
    
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-blue-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 min-h-screen w-full bg-blue-100 p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-black">Welcome back, </span>
              <span className="text-indigo-600">{userData.name}!</span>
            </h1>
            <p className="text-black">Continue your learning journey</p>
          </div>
<<<<<<< HEAD
          <div className="flex flex-col sm:flex-row items-center mt-4 md:mt-0 space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Streak Card */}
            <div className="bg-blue-50 p-4 rounded-xl flex items-center shadow-md">
              <span className="material-icons mr-2 text-black">local_fire_department</span>
              <span className="font-bold text-black">{userData.streak} day streak</span>
            </div>
            
            {/* Points Card */}
            <div className="bg-blue-50 p-4 rounded-xl flex items-center shadow-md">
              <span className="material-icons mr-2 text-black">stars</span>
              <span className="font-bold text-black">{userData.totalPoints} points</span>
            </div>
            
            {/* Account Dropdown - Updated to be small, white, same location */}
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                }}
                className="bg-white p-2 rounded-xl flex items-center shadow-md hover:bg-blue"
              >
                <User className="h-12 w-5 text-white" />
                <ChevronDown className="h-4 w-4 ml-1 text-white" />
              </button>
              
              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-bold text-black">{userData.name}</p>
                    <p className="text-xs text-gray-600">{userData.email}</p>
                    <p className="text-xs font-medium text-indigo-600 mt-1">{userData.accountType}</p>
                  </div>
                  <a href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                    <User className="h-4 w-4 mr-2 text-indigo-600" />
                    My Profile
                  </a>
                  <a href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                    <Settings className="h-4 w-4 mr-2 text-indigo-600" />
                    Account Settings
                  </a>
                  <a href="/help" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                    <HelpCircle className="h-4 w-4 mr-2 text-indigo-600" />
                    Help Center
                  </a>
                  <div className="border-t border-gray-100 my-1"></div>
                  <a href="/logout" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="h-4 w-4 mr-2 text-red-600" />
                    Log Out
                  </a>
                </div>
              )}
            </div>
=======
          <div className="flex items-center mt-4 md:mt-0 space-x-4">
            <button 
              onClick={() => window.location.href = "/profile"} 
              className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl flex items-center shadow-md transition duration-300"
            >
              <span className="mr-2">Profile</span>
            </button>
            <button 
              onClick={() => navigate("/quizzes")}
              className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl flex items-center shadow-md transition duration-300"
            >
              <span className="mr-2">Quizzes</span>
            </button>
            <button 
              onClick={() => navigate("/Courselist")}
              className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl flex items-center shadow-md transition duration-300"
            >
              <span className="mr-2">Course List</span>
            </button>
>>>>>>> 8d3f21ce848522c91cd2aca0d3f6a4eeeb5de52e
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Progress */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:col-span-2">
          <h2 className="text-2xl font-bold text-black mb-6">Your Learning Progress</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userData.progress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EBF4FF" />
                <XAxis dataKey="name" stroke="#000000" />
                <YAxis domain={[0, 100]} stroke="#000000" />
                <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }} />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#2563EB" 
                  strokeWidth={3} 
                  dot={{ fill: '#2563EB', r: 6, strokeWidth: 2, stroke: "white" }}
                  activeDot={{ r: 8, stroke: "white", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Courses */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-black mb-6">Current Courses</h2>
          <div className="space-y-6">
            {userData.courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-black mb-4">Recommended For You</h2>
          <p className="text-black mb-6">Based on your learning patterns and interests</p>
          <RecommendationList recommendations={userData.recommendations} />
        </div>

        {/* Weekly Goals */}  
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:col-span-2">
          <h2 className="text-2xl font-bold text-black mb-6">Weekly Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProgressWidget 
              title="Study Time" 
              current={12} 
              target={15} 
              unit="Hours"
              color="bg-blue-400" 
            />
            <ProgressWidget 
              title="Quizzes Completed" 
              current={7} 
              target={10} 
              unit="Quizzes"
              color="bg-blue-500" 
            />
            <ProgressWidget 
              title="New Concepts" 
              current={18} 
              target={25} 
              unit="Concepts"
              color="bg-blue-600" 
            />
          </div>
        </div>
      </div>
<<<<<<< HEAD

      {/* Enhanced floating quiz button */}
      <div className="fixed bottom-6 right-6 z-10 group">
        <button 
          onClick={() => window.location.href = "/quizzes"} 
          className="bg-white text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 flex items-center justify-center text-xl font-bold p-6 rounded-full border-2 border-indigo-200">
          Take a Quiz
        </button>
      </div>
=======
>>>>>>> 8d3f21ce848522c91cd2aca0d3f6a4eeeb5de52e
    </div>
  );
};

export default Dashboard;