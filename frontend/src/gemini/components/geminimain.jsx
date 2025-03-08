import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Award, BarChart2 } from 'lucide-react';
import { generateSubSections } from '../services/gemini';
import Quiz from './Quiz';
import CourseList from './CourseList';
import ProgressChart from './ProgressChart';

const App = () => {
  const [section, setSection] = useState('');
  const [isInputSubmitted, setIsInputSubmitted] = useState(false);
  const [currentSubSection, setCurrentSubSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subSections, setSubSections] = useState([]);
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [quizScore, setQuizScore] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState('');

  useEffect(() => {
    if (isInputSubmitted && section) {
      loadContent();
    }
  }, [isInputSubmitted, section]);

  useEffect(() => {
    if (currentCourse && isInputSubmitted) {
      updateCurrentCourse();
    }
  }, [progress, quizScore]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const generatedSections = await generateSubSections(section);
      setSubSections(generatedSections);

      const existingCourseIndex = courses.findIndex(course => course.title.toLowerCase() === section.toLowerCase());

      if (existingCourseIndex >= 0) {
        setCurrentCourse(courses[existingCourseIndex]);
        setProgress(courses[existingCourseIndex].progress);
        const subsectionIndex = Math.floor(courses[existingCourseIndex].progress / 20);
        setCurrentSubSection(Math.min(subsectionIndex, 4));
        if (courses[existingCourseIndex].progress === 100) {
          setShowQuiz(true);
        }
      } else {
        const newCourse = {
          id: Date.now().toString(),
          title: section,
          progress: 0,
          nextSection: generatedSections[0].title,
          progressData: [{ week: 1, progress: 0 }]
        };
        setCourses([...courses, newCourse]);
        setCurrentCourse(newCourse);
      }
    } catch (error) {
      console.error("Failed to load content:", error);
      setSubSections([
        { title: "Introduction", content: "Failed to generate content. Please try again." },
        { title: "Key Concepts", content: "Failed to generate content. Please try again." },
        { title: "Practical Applications", content: "Failed to generate content. Please try again." },
        { title: "Advanced Topics", content: "Failed to generate content. Please try again." },
        { title: "Summary", content: "Failed to generate content. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const updateCurrentCourse = () => {
    if (!currentCourse) return;

    const updatedCourse = {
      ...currentCourse,
      progress: progress,
      nextSection: progress < 100 
        ? subSections[Math.min(Math.floor(progress / 20), 4)].title 
        : "Quiz",
    };

    if (Math.abs(currentCourse.progress - progress) >= 20) {
      const lastWeek = currentCourse.progressData.length > 0 
        ? currentCourse.progressData[currentCourse.progressData.length - 1].week 
        : 0;

      updatedCourse.progressData = [
        ...currentCourse.progressData,
        { week: lastWeek + 1, progress }
      ];
    }

    if (quizScore !== null) {
      updatedCourse.quizScore = quizScore;
      updatedCourse.quizFeedback = quizFeedback;
    }

    setCourses(courses.map(course => 
      course.id === currentCourse.id ? updatedCourse : course
    ));

    setCurrentCourse(updatedCourse);
  };

  const handleSectionSubmit = (e) => {
    e.preventDefault();
    if (section.trim()) {
      setIsInputSubmitted(true);
      setProgress(0);
      setCurrentSubSection(0);
      setShowQuiz(false);
      setQuizAttempts(0);
      setQuizCompleted(false);
      setQuizScore(null);
      setQuizFeedback('');
    }
  };

  const handleNextSubSection = () => {
    if (currentSubSection < subSections.length - 1) {
      setCurrentSubSection(currentSubSection + 1);
      setProgress((currentSubSection + 1) * 20);
    } else if (currentSubSection === subSections.length - 1 && progress < 100) {
      setProgress(100);
      setShowQuiz(true);
    }
  };

  const handlePrevSubSection = () => {
    if (currentSubSection > 0) {
      setCurrentSubSection(currentSubSection - 1);
      setProgress(currentSubSection * 20);
    }
  };

  const handleQuizComplete = (score, feedback) => {
    setQuizCompleted(true);
    setQuizScore(score);
    setQuizFeedback(feedback);
  };

  const handleQuizRetry = () => {
    if (quizAttempts < 3) {
      setQuizAttempts(quizAttempts + 1);
      setQuizCompleted(false);
    }
  };

  const resetCourse = () => {
    setIsInputSubmitted(false);
    setSection('');
    setCurrentSubSection(0);
    setProgress(0);
    setShowQuiz(false);
    setQuizAttempts(0);
    setQuizCompleted(false);
    setCurrentCourse(null);
    setQuizScore(null);
    setQuizFeedback('');
  };

  const continueCourse = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setSection(course.title);
      setIsInputSubmitted(true);
      setCurrentCourse(course);
    }
  };

  if (!isInputSubmitted) {
    return (
      <div className="absolute  top-0 left-0 w-full min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-sm p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-900">     LearnHub</h2>
            </div>
          </div>
        </header>
        
        <main className="flex-grow p-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Welcome to LearnHub</h2>
                <p className="text-gray-600 mb-6 text-center">
                  Enter a topic you'd like to learn about and we'll create a personalized learning path for you.
                </p>
                
                <form onSubmit={handleSectionSubmit}>
                  <div className="mb-4">
                    <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-1">
                      What would you like to learn today?
                    </label>
                    <input
                      type="text"
                      id="section"
                      value={section}
                      onChange={(e) => setSection(e.target.value)}
                      className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., JavaScript, Machine Learning, Photography"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
                  >
                    Start Learning
                  </button>
                </form>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <CourseList 
                courses={courses} 
                onContinueCourse={continueCourse} 
              />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-900">   LearnHub</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="px-4 py-2 text-sm font-medium text-white bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={resetCourse}
            >
              New Topic
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
              Profile
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
              Quiz
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Learning: <span className="text-indigo-500 capitalize">{section}</span>
            </h2>
            <div className="mt-4 flex items-center">
              <div className="flex-grow bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="ml-4 text-sm font-medium text-gray-700">{progress}% Complete</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-black">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {loading ? (
                  <div className="p-6 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Generating content for {section}...</p>
                  </div>
                ) : !showQuiz ? (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold">
                        {currentSubSection + 1}. {subSections[currentSubSection]?.title || "Loading..."}
                      </h3>
                      <div className="text-sm text-gray-500">
                        Section {currentSubSection + 1} of {subSections.length}
                      </div>
                    </div>
                    
                    <div className="prose max-w-none mb-8">
                      <p>{subSections[currentSubSection]?.content || "Loading content..."}</p>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        onClick={handlePrevSubSection}
                        disabled={currentSubSection === 0}
                        className={`text-white flex items-center px-4 py-2 rounded-md ${
                          currentSubSection === 0
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <ChevronLeft className="text-white h-5 w-5 mr-1"/>
                        Previous
                      </button>
                      <button
                        onClick={handleNextSubSection}
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      >
                        {currentSubSection < subSections.length - 1 ? 'Next' : 'Complete'}
                        <ChevronRight className="h-5 w-5 ml-1" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {!quizCompleted ? (
                      <Quiz 
                        topic={section} 
                        quizAttempts={quizAttempts}
                        onQuizComplete={handleQuizComplete}
                        onRetry={handleQuizRetry}
                      />
                    ) : (
                      <div className="p-6">
                        <div className="text-center mb-6">
                          <Award className="h-12 w-12 text-indigo-600 mx-auto mb-2" />
                          <h3 className="text-2xl font-bold">Course Completed!</h3>
                          <p className="text-gray-600 mt-2">
                            Congratulations! You've completed the course on {section}.
                          </p>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-6">
                          <div className="flex items-center text-green-700 mb-2">
                            <Award className="h-5 w-5 mr-2" />
                            <h4 className="text-lg font-semibold">Quiz Completed!</h4>
                          </div>
                          <p className="text-gray-700 mb-4">
                            You scored {quizScore !== null ? `${quizScore}/5` : "N/A"} on the quiz.
                          </p>
                          <div className="bg-white p-4 rounded border border-green-100">
                            <h5 className="font-medium mb-2">Feedback:</h5>
                            <p className="text-sm text-gray-600">{quizFeedback}</p>
                          </div>
                        </div>
                        
                        <button
                          onClick={resetCourse}
                          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
                        >
                          Start a New Topic
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              {currentCourse && currentCourse.progressData.length > 0 && (
                <ProgressChart 
                  data={currentCourse.progressData}
                  topic={section}
                />
              )}
              
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Your Progress</h3>
                  <BarChart2 className="h-5 w-5 text-indigo-600" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{section}</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {quizCompleted && quizScore !== null && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Quiz Score</span>
                        <span>{(quizScore / 5) * 100}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(quizScore / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <CourseList 
                courses={courses.filter(course => course.title !== section)} 
                onContinueCourse={continueCourse} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;