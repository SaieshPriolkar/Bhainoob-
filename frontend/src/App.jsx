import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Dashbord from './components/Dashbord';
import Login from './pages/login';
import Signup from './pages/signup';
import ForgotPassword from './pages/forgotPassword';
import Landing from './components/Landing';
import Quiz from './components/Quizzes';
import CourseList from './components/Dashboard/course/coursepages';
import Profile from "./components/profile";
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={
            
                <Landing />
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashbord />} />
            <Route path="/quizzes" element={<Quiz />} />
            <Route path="/Courselist" element={<CourseList/>} />
            <Route path="/profile" element={<Profile/>} />

          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;