import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Login from './pages/login';
import Signup from './pages/signup';
import ForgotPassword from './pages/forgotPassword';
import Landing from './components/Landing';
import Quiz from './components/Quizzes';
import CourseList from './components/Dashboard/course/coursepages';
import Profile from "./components/profile";
import ProtectedRoute from "./components/ProtectedRoute";
import PersonalizeDashboard from "./components/Personalization/personalizationDashboard";
import RecommendationForm from "./components/Personalization/RegistrationForm/RegistrationForm";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={
            <ProtectedRoute>
                <Landing />
                </ProtectedRoute>} />
             
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/personalize-dashboard" element={<RecommendationForm/>}/>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
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