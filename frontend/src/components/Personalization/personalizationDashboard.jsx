import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { BookOpen, GraduationCap, Lightbulb, Target, Brain } from 'lucide-react';

const PersonalizeDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      
      if (!user) {
        navigate('/login');
        return;
      }
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Mock recommendations based on user data
  const getRecommendedCourses = () => {
    if (!userData) return [];
    
    const recommendations = [
      {
        id: 1,
        title: 'Introduction to Algebra',
        description: 'Master the fundamentals of algebra with this comprehensive course.',
        level: 'Beginner',
        category: 'Mathematics',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 2,
        title: 'Chemistry Fundamentals',
        description: 'Learn the basics of chemistry through interactive lessons and experiments.',
        level: 'Intermediate',
        category: 'Science',
        image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 3,
        title: 'World History: Ancient Civilizations',
        description: 'Explore the fascinating history of ancient civilizations around the world.',
        level: 'Beginner',
        category: 'History',
        image: 'https://images.unsplash.com/photo-1599739291060-4578e77dac5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      }
    ];
    
    // Filter based on user interests and subjects
    return recommendations.filter(course => 
      userData.interests?.some(interest => course.category.includes(interest)) ||
      userData.subjects?.some(subject => course.category.includes(subject))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to EduLearn</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900">Your Profile</h2>
            
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-blue-50 rounded-lg p-4 flex items-start">
                <div className="flex-shrink-0">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">Grade</h3>
                  <p className="mt-1 text-sm text-gray-500">{userData?.grade || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4 flex items-start">
                <div className="flex-shrink-0">
                  <Lightbulb className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">Interests</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {userData?.interests?.slice(0, 2).join(', ') || 'Not specified'}
                    {userData?.interests && userData.interests.length > 2 ? ' & more' : ''}
                  </p>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 flex items-start">
                <div className="flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">Subjects</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {userData?.subjects?.slice(0, 2).join(', ') || 'Not specified'}
                    {userData?.subjects && userData.subjects.length > 2 ? ' & more' : ''}
                  </p>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 flex items-start">
                <div className="flex-shrink-0">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">Learning Style</h3>
                  <p className="mt-1 text-sm text-gray-500 capitalize">
                    {userData?.learningStyle || 'Not specified'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Courses</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {getRecommendedCourses().map(course => (
              <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {course.level}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{course.description}</p>
                  <div className="mt-4">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Start Learning
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Study Plan</h2>
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-4">
                <Target className="h-6 w-6 text-red-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Your Goal: {userData?.studyGoals}</h3>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-500 mb-4">
                  Based on your profile, we've created a personalized study plan to help you achieve your goals.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900">Week 1-2: Fundamentals</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Focus on building a strong foundation in your core subjects.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900">Week 3-4: Advanced Concepts</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Dive deeper into more complex topics and start applying your knowledge.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900">Week 5-6: Practice & Mastery</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Reinforce your learning through practice exercises and assessments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PersonalizeDashboard;