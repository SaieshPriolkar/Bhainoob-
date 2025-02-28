import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Award, BarChart2 } from "lucide-react";
import Quiz from "./Quiz";
import CourseList from './CourseList';
import ProgressChart from "./ProgressChart";

const LearningModule = ({ courses = [], onUpdateCourse }) => {
  const { section } = useParams();
  const [progress, setProgress] = useState(0);
  const [currentSubSection, setCurrentSubSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [quizAttempts, setQuizAttempts] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [subSections, setSubSections] = useState([]);
  
  useEffect(() => {
    const course = courses.find(c => c.id === section);
    if (course) {
      setSubSections(course.subSections);
      setLoading(false);
    }
  }, [section, courses]);

  useEffect(() => {
    if (subSections.length > 0) {
      setProgress(((currentSubSection + 1) / subSections.length) * 100);
    }
  }, [currentSubSection, subSections]);

  const handleNextSubSection = () => {
    if (currentSubSection < subSections.length - 1) {
      setCurrentSubSection((prev) => prev + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handlePrevSubSection = () => {
    if (currentSubSection > 0) {
      setCurrentSubSection((prev) => prev - 1);
    }
  };

  const handleQuizComplete = (score, feedback) => {
    setQuizScore(score);
    setQuizFeedback(feedback);
    setQuizCompleted(true);
  };

  const handleQuizRetry = () => {
    setQuizAttempts((prev) => prev + 1);
    setQuizCompleted(false);
  };

  const resetCourse = () => {
    setCurrentSubSection(0);
    setShowQuiz(false);
    setQuizCompleted(false);
    setQuizScore(null);
    setQuizFeedback("");
  };

  return (
    <main className="flex-grow p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Learning: <span className="text-indigo-600">{section}</span>
          </h2>
          <div className="mt-4 flex items-center">
            <div className="flex-grow bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="ml-4 text-sm font-medium text-gray-700">{progress.toFixed(2)}% Complete</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {loading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Generating content for {section}...</p>
                </div>
              ) : !showQuiz ? (
                <div className="p-6">
                  <h3 className="text-xl font-semibold">
                    {currentSubSection + 1}. {subSections[currentSubSection]?.title || "Loading..."}
                  </h3>
                  <p className="mt-4">{subSections[currentSubSection]?.content || "Loading content..."}</p>

                  <div className="flex justify-between mt-6">
                    <button onClick={handlePrevSubSection} disabled={currentSubSection === 0}
                      className={`px-4 py-2 rounded-md ${currentSubSection === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      <ChevronLeft className="h-5 w-5 mr-1" /> Previous
                    </button>
                    <button onClick={handleNextSubSection}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                      {currentSubSection < subSections.length - 1 ? 'Next' : 'Complete'}
                      <ChevronRight className="h-5 w-5 ml-1" />
                    </button>
                  </div>
                </div>
              ) : (
                <Quiz topic={section} quizAttempts={quizAttempts} onQuizComplete={handleQuizComplete} onRetry={handleQuizRetry} />
              )}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            {progress > 0 && (
              <ProgressChart data={[{ name: section, progress }]} topic={section} />
            )}

            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="font-semibold text-gray-900">Your Progress</h3>
              <BarChart2 className="h-5 w-5 text-indigo-600" />
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-sm mt-2">{progress.toFixed(2)}% Completed</p>
              </div>
            </div>

            <CourseList courses={courses.filter(course => course.id !== section)} onContinueCourse={() => {}} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LearningModule;