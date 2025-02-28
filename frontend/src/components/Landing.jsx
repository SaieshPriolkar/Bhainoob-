import React, { useState } from 'react';
import { ArrowRight, Brain, BarChart2, Book, Award, Play, Menu, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const AdaptiveLearningLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  // Sample progress data
  const progressData = [
    { week: 'Week 1', value: 20 },
    { week: 'Week 2', value: 35 },
    { week: 'Week 3', value: 30 },
    { week: 'Week 4', value: 45 },
    { week: 'Week 5', value: 60 },
    { week: 'Week 6', value: 75 },
    { week: 'Week 7', value: 90 },
  ];

  const features = [
    {
      icon: <Brain className="h-12 w-12 mb-4 text-indigo-600" />,
      title: "AI-driven Personalization",
      description: "Content that adapts to your unique learning style and pace"
    },
    {
      icon: <BarChart2 className="h-12 w-12 mb-4 text-indigo-600" />,
      title: "Real-time Performance Tracking",
      description: "Continuously monitor your progress with actionable insights"
    },
    {
      icon: <Book className="h-12 w-12 mb-4 text-indigo-600" />,
      title: "Interactive Quizzes & Assessments",
      description: "Dynamic tests that adjust difficulty as you improve"
    },
    {
      icon: <Award className="h-12 w-12 mb-4 text-indigo-600" />,
      title: "Intelligent Feedback System",
      description: "Personalized suggestions to strengthen your weak areas"
    }
  ];

  return (
    <div className="absolute top-0 left-0 min-h-screen w-full bg-blue-100 p-6">
    
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo Image */}
            <img 
              src="images.png" 
              alt="Logo" 
              className="h-12 w-12 mr-4"
            />
            <span className="text-2xl font-bold text-indigo-600">AdaptLearn</span>
          </div>
          
         
            <div className="hidden md:flex items-center space-x-8">
              
            <button
                className="mt-2  bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
                onClick={() => navigate("./login")}
              >
                Get Started
              </button>


            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">Features</a>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">How It Works</a>
              <a href="#progress" className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">Your Progress</a>
              <button className="mt-2 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Learning that adapts to</span>
                  <span className="block text-indigo-600">how YOU learn</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Our AI-powered platform customizes educational content in real-time based on your unique learning patterns and progress, ensuring you master concepts at your own pace.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                <div className="rounded-md shadow">
  <a 
    href="https://drive.google.com/file/d/1lJjQiO67zCvWW0CgDf6O2eRx2WHBDF4K/view?usp=sharing" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
  >
    Watch a Demo <Play className="ml-2 h-5 w-5" />
  </a>
</div>

</div>

                  
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a href="#how-it-works" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                      How It Works
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="/api/placeholder/800/600" alt="Student learning" />
        </div> */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
   
    
  </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Personalized Learning Experience
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our platform adapts to your learning style, providing a unique educational journey.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                  <div>
                    {feature.icon}
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How AdaptLearn Works
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Four simple steps to revolutionize your learning experience
            </p>
          </div>

          <div className="mt-10">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-8 md:mb-0 md:w-1/4 px-4 text-center">
                <div className="bg-indigo-100 rounded-full p-3 inline-flex mx-auto">
                  <span className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center">1</span>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Assessment</h3>
                <p className="mt-2 text-base text-gray-500">Complete an initial assessment to gauge your current knowledge level</p>
              </div>
              
              <div className="mb-8 md:mb-0 md:w-1/4 px-4 text-center">
                <div className="bg-indigo-100 rounded-full p-3 inline-flex mx-auto">
                  <span className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center">2</span>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Personalization</h3>
                <p className="mt-2 text-base text-gray-500">AI analyzes your learning patterns to create customized content</p>
              </div>
              
              <div className="mb-8 md:mb-0 md:w-1/4 px-4 text-center">
                <div className="bg-indigo-100 rounded-full p-3 inline-flex mx-auto">
                  <span className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center">3</span>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Adaptive Learning</h3>
                <p className="mt-2 text-base text-gray-500">Engage with content that adjusts in real-time to your progress</p>
              </div>
              
              <div className="md:w-1/4 px-4 text-center">
                <div className="bg-indigo-100 rounded-full p-3 inline-flex mx-auto">
                  <span className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center">4</span>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Mastery</h3>
                <p className="mt-2 text-base text-gray-500">Track your progress and achieve mastery at your own pace</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Chart Section
      <div id="progress" className="py-12 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Watch Your Progress Soar
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Track your learning journey with real-time analytics and insights
            </p>
          </div>

          <div className="mt-10 bg-white shadow rounded-lg p-6">
            {/* Custom Progress Chart */}
            {/* <div className="h-64 sm:h-80 relative">
              <div className="absolute inset-0 flex items-end">
                {progressData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="relative w-full px-1">
                      <div 
                        className="bg-indigo-600 rounded-t-sm mx-auto" 
                        style={{ 
                          height: `${item.value}%`, 
                          width: '60%',
                          maxWidth: '40px'
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2 w-full text-center truncate">{item.week}</span>
                  </div>
                ))}
              </div>
              
              {/* Y-axis labels */}
              {/* <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-xs text-gray-500 py-2">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div> */}
              
              {/* Horizontal guide lines
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-b border-gray-200 h-1/4"></div>
                <div className="border-b border-gray-200 h-1/4"></div>
                <div className="border-b border-gray-200 h-1/4"></div>
                <div className="border-b border-gray-200 h-1/4"></div>
              </div>
            </div>
             */}
            {/* <div className="mt-6 text-center">
              <p className="text-lg font-medium text-gray-900">Your learning efficiency has increased by 65%</p>
              <p className="mt-2 text-base text-gray-500">Our AI has identified your optimal learning times and methods</p>
              <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                View Detailed Analytics <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>  */} *

      {/* Testimonial Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Learners Say
            </h2>
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <p className="text-gray-600 italic">"The adaptive learning platform identified my weak areas and helped me improve. My test scores went up by 40% in just two months!"</p>
              <p className="mt-4 font-medium">Sarah K., Science Student</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <p className="text-gray-600 italic">"As a teacher, I've seen unprecedented engagement from my students. The personalized approach keeps them motivated and excited to learn."</p>
              <p className="mt-4 font-medium">Michael R., High School Teacher</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">J</span>
              </div>
              <p className="text-gray-600 italic">"I used to struggle with math, but the adaptive quizzes and personalized feedback made it click for me. Now I'm acing every test!"</p>
              <p className="mt-4 font-medium">Jamie L., Math Student</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-100">
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
    <h2 className="text-3xl font-extrabold tracking-tight text-blue-800 sm:text-4xl">
      <span className="block">Ready to transform your learning?</span>
      <span className="block text-blue-500">Get started with AdaptLearn today.</span>
    </h2>
    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
      <div className="inline-flex rounded-md shadow">
        <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50">
          Start Free Trial
        </a>
      </div>
      <div className="ml-3 inline-flex rounded-md shadow">
  <a 
    href="https://drive.google.com/file/d/1lJjQiO67zCvWW0CgDf6O2eRx2WHBDF4K/view?usp=sharing" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
  >
    Watch a Demo <Play className="ml-2 h-5 w-5" />
  </a>
</div>

    </div>
  </div>
</div>
      {/* Footer */}
      <footer className="bg-blue-50">
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
    <div className="xl:grid xl:grid-cols-3 xl:gap-8">
      <div className="space-y-8 xl:col-span-1">
        <h2 className="text-2xl font-bold text-blue-800">AdaptLearn</h2>
        <p className="text-blue-600 text-base">
          Revolutionizing education through AI-powered personalized learning.
        </p>
        <div className="flex space-x-6">
          {/* Social media icons would go here */}
        </div>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
        <div className="md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h3 className="text-sm font-semibold text-blue-700 tracking-wider uppercase">Platform</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-blue-600 hover:text-blue-800">Features</a></li>
              <li><a href="#" className="text-base text-blue-600 hover:text-blue-800">How It Works</a></li>
              <li><a href="#" className="text-base text-blue-600 hover:text-blue-800">Pricing</a></li>
              <li><a href="#" className="text-base text-blue-600 hover:text-blue-800">FAQ</a></li>
            </ul>
          </div>
          <div className="mt-12 md:mt-0">
            <h3 className="text-sm font-semibold text-blue-700 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-blue-600 hover:text-blue-800">Blog</a></li>
              <li><a href="#" className="text-base text-blue-600 hover:text-blue-800">Guides</a></li>
              <li><a href="#" className="text-base text-blue-600 hover:text-blue-800">Support</a></li>
              <li><a href="#" className="text-base text-blue-600 hover:text-blue-800">API</a></li>
            </ul>
          </div>
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h3 className="text-sm font-semibold text-blue-700 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-blue-600 hover:text-blue-800">About</a></li>
              <li><a href="#" className="text-base text-blue-600 hover:text-blue-800">Careers</a></li>
              <li><a href="#" className="text-base text-blue-600 hover:text-blue-800">Partners</a></li>
              <li><a href="#" className="text-base text-blue-600 hover:text-blue-800">Contact</a></li>
            </ul>
          </div>
          <div className="mt-12 md:mt-0">
            <h3 className="text-sm font-semibold text-blue-700 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-blue-600 hover:text-blue-800">Privacy</a></li>
              <li><a href="#" className="text-base text-blue-600 hover:text-blue-800">Terms</a></li>
              <li><a href="#" className="text-base text-blue-600 hover:text-blue-800">Data Policy</a></li>
              <li><a href="#" className="text-base text-blue-600 hover:text-blue-800">Cookies</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-12 border-t border-blue-200 pt-8">
      <p className="text-base text-blue-500 xl:text-center">
        &copy; 2025 AdaptLearn. All rights reserved.
      </p>
    </div>
  </div>
</footer>
</div>
  );
}

export default AdaptiveLearningLandingPage;