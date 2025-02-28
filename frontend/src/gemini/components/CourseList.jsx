import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateSubSections } from '../services/gemini';

const CourseList = ({ courses = [], onAddCourse }) => {
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;

    setLoading(true);
    setError('');

    try {
      const subSections = await generateSubSections(newCourseTitle);
      const newCourse = {
        id: Date.now().toString(),
        title: newCourseTitle,
        progress: 0,
        nextSection: subSections.length > 0 ? subSections[0].title : 'Introduction',
        subSections,
      };

      onAddCourse(newCourse);
      setNewCourseTitle('');
    } catch (error) {
      setError('Failed to generate course content. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueCourse = (courseId) => {
    navigate(`/learning/${courseId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Current Courses</h2>

      {courses.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>You haven't started any courses yet.</p>
          <p className="mt-2 text-sm">Enter a topic in the search box to begin learning!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-indigo-600 mb-2">{course.title}</h3>

              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>{course.progress}% complete</span>
                  <span>Next: {course.nextSection}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={() => handleContinueCourse(course.id)}
                className="w-full mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
              >
                Continue Learning
              </button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleAddCourse} className="mt-6">
        <label htmlFor="new-course" className="block text-sm font-medium text-gray-700 mb-1">
          Enter a topic to start a new course
        </label>
        <div className="flex">
          <input
            type="text"
            id="new-course"
            value={newCourseTitle}
            onChange={(e) => setNewCourseTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., JavaScript, Machine Learning, Photography"
            required
          />
          <button
            type="submit"
            className="ml-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Course'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CourseList;