import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CourseCard from './Dashboard/CourseCard';
import ProgressWidget from '../components/Dashboard/ProgressWidget';
import RecommendationList from '../components/Dashboard/RecommendationList';
import { User, ChevronDown, LogOut, Settings, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

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
          <div className="flex items-center mt-4 md:mt-0 space-x-4">
            <button 
              onClick={() => window.location.href = "/profile"} 
              className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl flex items-center shadow-md transition duration-300"
            >
              <span className="mr-2">Profile</span>
            </button>
            <button 
              onClick={() => window.location.href = "/quizzes"} 
              className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl flex items-center shadow-md transition duration-300"
            >
              <span className="mr-2">Quizzes</span>
            </button>
            <button 
              onClick={() => window.location.href = "/courselist"} 
              className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl flex items-center shadow-md transition duration-300"
            >
              <span className="mr-2">Course List</span>
            </button>
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
              unit="hours"
              color="bg-blue-400" 
            />
            <ProgressWidget 
              title="Quizzes Completed" 
              current={7} 
              target={10} 
              unit="quizzes"
              color="bg-blue-500" 
            />
            <ProgressWidget 
              title="New Concepts" 
              current={18} 
              target={25} 
              unit="concepts"
              color="bg-blue-600" 
            />
          </div>
        </div>
      </div>


      {/* Enhanced floating quiz button */}
      <div className="fixed bottom-6 right-6 z-10 group">
        <button 
          onClick={() => window.location.href = "/quizzes"} 
          className="bg-white text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 flex items-center justify-center text-xl font-bold p-6 rounded-full border-2 border-indigo-200">
          Take a Quiz
        </button>
      </div>
      
    </div>
  );
};

export default Dashboard;