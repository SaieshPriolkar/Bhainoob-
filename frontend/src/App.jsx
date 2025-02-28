import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Dashbord from './components/Dashbord';
import Login from './pages/login';
import Signup from './pages/signup';
import ForgotPassword from './pages/forgotPassword';
import Landing from './components/Landing';
import Quiz from './gemini/components/Quiz';
import Profile from "./components/profile";
import LearningModule from "./gemini/components/Learning"; 
import CourseList from "./gemini/components/CourseList";

function App() {
  const [courses, setCourses] = useState([]); // State to store courses

  const handleAddCourse = (newCourse) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  const handleContinueCourse = (courseId) => {
    console.log(`Continuing course with ID: ${courseId}`);
    // Add navigation logic here if needed
  };

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashbord />} />
            <Route path="/quizzes" element={<Quiz />} />
            <Route 
              path="/courselist" 
              element={<CourseList 
                courses={courses} 
                onAddCourse={handleAddCourse} 
                onContinueCourse={handleContinueCourse} 
              />} 
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/learning/:section" element={<LearningModule />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
