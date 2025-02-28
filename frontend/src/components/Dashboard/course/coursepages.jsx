import React, { useState, useEffect } from 'react';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'ongoing', 'completed', 'not-started'
  const [expandedCourse, setExpandedCourse] = useState(null);

  // Simulated data - to be replaced with API calls
  useEffect(() => {
    // Fetch courses data from API
    setTimeout(() => {
      setCourses([
        // Ongoing courses
        { 
          id: 1, 
          title: "Introduction to Algebra", 
          instructor: "Dr. Sarah Johnson",
          description: "Learn the fundamentals of algebra including variables, equations, and functions.",
          thumbnail: "/algebra-thumbnail.jpg",
          progress: 75, 
          nextLesson: "Quadratic Equations",
          status: "ongoing",
          lastAccessed: "2 days ago",
          topics: [
            {
              id: "alg-101",
              title: "Variables and Constants",
              description: "Understanding the fundamental building blocks of algebra",
              duration: "12:35",
              videoUrl: "/videos/algebra/variables-constants.mp4",
              thumbnail: "/thumbnails/algebra/variables.jpg"
            },
            {
              id: "alg-102",
              title: "Linear Equations",
              description: "Solving equations with one variable",
              duration: "15:42",
              videoUrl: "/videos/algebra/linear-equations.mp4",
              thumbnail: "/thumbnails/algebra/linear-eq.jpg"
            },
            {
              id: "alg-103",
              title: "Quadratic Equations",
              description: "Solving second-degree polynomial equations",
              duration: "18:20",
              videoUrl: "/videos/algebra/quadratic-equations.mp4",
              thumbnail: "/thumbnails/algebra/quadratic-eq.jpg"
            }
          ]
        },
        { 
          id: 2, 
          title: "Creative Writing", 
          instructor: "Prof. Michael Torres",
          description: "Develop your creative writing skills through various exercises and projects.",
          thumbnail: "/writing-thumbnail.jpg",
          progress: 45, 
          nextLesson: "Character Development",
          status: "ongoing",
          lastAccessed: "5 hours ago",
          topics: [
            {
              id: "cw-101",
              title: "Narrative Structure",
              description: "Understanding the key elements of storytelling",
              duration: "22:15",
              videoUrl: "/videos/writing/narrative-structure.mp4",
              thumbnail: "/thumbnails/writing/narrative.jpg"
            },
            {
              id: "cw-102",
              title: "Character Development",
              description: "Creating complex and believable characters",
              duration: "19:50",
              videoUrl: "/videos/writing/character-development.mp4",
              thumbnail: "/thumbnails/writing/characters.jpg"
            },
            {
              id: "cw-103",
              title: "Dialogue Writing",
              description: "Crafting authentic and engaging dialogue",
              duration: "16:30",
              videoUrl: "/videos/writing/dialogue-writing.mp4",
              thumbnail: "/thumbnails/writing/dialogue.jpg"
            }
          ]
        },
        { 
          id: 3, 
          title: "Biology 101", 
          instructor: "Dr. Emily Chen",
          description: "Introduction to the study of living organisms and biological systems.",
          thumbnail: "/biology-thumbnail.jpg",
          progress: 90, 
          nextLesson: "Cellular Respiration",
          status: "ongoing",
          lastAccessed: "Yesterday",
          topics: [
            {
              id: "bio-101",
              title: "Cell Structure",
              description: "Understanding the fundamental unit of life",
              duration: "20:10",
              videoUrl: "/videos/biology/cell-structure.mp4",
              thumbnail: "/thumbnails/biology/cells.jpg"
            },
            {
              id: "bio-102",
              title: "DNA and Genetics",
              description: "Exploring heredity and genetic information",
              duration: "25:45",
              videoUrl: "/videos/biology/dna-genetics.mp4",
              thumbnail: "/thumbnails/biology/dna.jpg"
            },
            {
              id: "bio-103",
              title: "Cellular Respiration",
              description: "How cells convert nutrients into energy",
              duration: "18:30",
              videoUrl: "/videos/biology/cellular-respiration.mp4",
              thumbnail: "/thumbnails/biology/respiration.jpg"
            }
          ]
        },
        
        // Completed courses
        { 
          id: 4, 
          title: "Web Development Basics", 
          instructor: "John Smith",
          description: "Learn HTML, CSS and JavaScript to build modern websites.",
          thumbnail: "/webdev-thumbnail.jpg",
          progress: 100, 
          status: "completed",
          completedDate: "Jan 15, 2025",
          topics: [
            {
              id: "web-101",
              title: "HTML Fundamentals",
              description: "Building the structure of web pages",
              duration: "15:25",
              videoUrl: "/videos/webdev/html-fundamentals.mp4",
              thumbnail: "/thumbnails/webdev/html.jpg"
            },
            {
              id: "web-102",
              title: "CSS Styling",
              description: "Making your websites beautiful with cascading style sheets",
              duration: "18:40",
              videoUrl: "/videos/webdev/css-styling.mp4",
              thumbnail: "/thumbnails/webdev/css.jpg"
            },
            {
              id: "web-103",
              title: "JavaScript Basics",
              description: "Adding interactivity to your websites",
              duration: "22:15",
              videoUrl: "/videos/webdev/javascript-basics.mp4",
              thumbnail: "/thumbnails/webdev/javascript.jpg"
            }
          ]
        },
        { 
          id: 5, 
          title: "Introduction to Psychology", 
          instructor: "Dr. Rebecca Williams",
          description: "Explore the human mind and behavior through scientific study.",
          thumbnail: "/psychology-thumbnail.jpg",
          progress: 100, 
          status: "completed",
          completedDate: "Dec 10, 2024",
          topics: [
            {
              id: "psy-101",
              title: "History of Psychology",
              description: "The evolution of psychological thought and practice",
              duration: "17:30",
              videoUrl: "/videos/psychology/history.mp4",
              thumbnail: "/thumbnails/psychology/history.jpg"
            },
            {
              id: "psy-102",
              title: "Brain and Behavior",
              description: "How neural processes influence human behavior",
              duration: "23:15",
              videoUrl: "/videos/psychology/brain-behavior.mp4",
              thumbnail: "/thumbnails/psychology/brain.jpg"
            },
            {
              id: "psy-103",
              title: "Learning and Memory",
              description: "Understanding how we acquire, store, and recall information",
              duration: "19:45",
              videoUrl: "/videos/psychology/learning-memory.mp4",
              thumbnail: "/thumbnails/psychology/memory.jpg"
            }
          ]
        },
        
        // Not started courses
        { 
          id: 6, 
          title: "Machine Learning Fundamentals", 
          instructor: "Dr. James Wilson",
          description: "An introduction to machine learning concepts and applications.",
          thumbnail: "/ml-thumbnail.jpg",
          progress: 0, 
          status: "not-started",
          enrolledDate: "Feb 20, 2025",
          topics: [
            {
              id: "ml-101",
              title: "Introduction to AI and ML",
              description: "Understanding the landscape of artificial intelligence and machine learning",
              duration: "16:20",
              videoUrl: "/videos/ml/intro-ai-ml.mp4",
              thumbnail: "/thumbnails/ml/intro.jpg"
            },
            {
              id: "ml-102",
              title: "Supervised Learning",
              description: "Training models with labeled data",
              duration: "24:10",
              videoUrl: "/videos/ml/supervised-learning.mp4",
              thumbnail: "/thumbnails/ml/supervised.jpg"
            },
            {
              id: "ml-103",
              title: "Neural Networks",
              description: "Understanding the building blocks of deep learning",
              duration: "28:35",
              videoUrl: "/videos/ml/neural-networks.mp4",
              thumbnail: "/thumbnails/ml/neural.jpg"
            }
          ]
        },
        { 
          id: 7, 
          title: "Art History", 
          instructor: "Prof. Lisa Anderson",
          description: "A survey of major art movements throughout history.",
          thumbnail: "/art-thumbnail.jpg",
          progress: 0, 
          status: "not-started",
          enrolledDate: "Feb 25, 2025",
          topics: [
            {
              id: "art-101",
              title: "Renaissance Art",
              description: "Exploring the artistic achievements of the Renaissance period",
              duration: "21:15",
              videoUrl: "/videos/art/renaissance.mp4",
              thumbnail: "/thumbnails/art/renaissance.jpg"
            },
            {
              id: "art-102",
              title: "Impressionism",
              description: "Understanding the revolutionary art movement of the late 19th century",
              duration: "19:30",
              videoUrl: "/videos/art/impressionism.mp4",
              thumbnail: "/thumbnails/art/impressionism.jpg"
            },
            {
              id: "art-103",
              title: "Modern Art",
              description: "Exploring artistic movements of the 20th century",
              duration: "22:45",
              videoUrl: "/videos/art/modern-art.mp4",
              thumbnail: "/thumbnails/art/modern.jpg"
            }
          ]
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter courses based on selected filter
  const filteredCourses = filter === 'all' 
    ? courses 
    : courses.filter(course => course.status === filter);

  // Sort courses to show ongoing first, then not-started, then completed
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    const order = { "ongoing": 0, "not-started": 1, "completed": 2 };
    return order[a.status] - order[b.status];
  });

  // Toggle topic expansion for a course
  const toggleCourseExpansion = (courseId) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-indigo-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className=" absolute left-0 top-0 min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-purple-800">My Courses</h1>
            <p className="text-gray-600">Manage and track your learning journey</p>
          </div>
          
          {/* Filter buttons */}
          <div className="flex space-x-2 mt-4 md:mt-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'all' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white text-gray-700 border hover:bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('ongoing')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'ongoing' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border hover:bg-gray-50'
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'completed' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-gray-700 border hover:bg-gray-50'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter('not-started')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'not-started' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-white text-gray-700 border hover:bg-gray-50'
              }`}
            >
              Not Started
            </button>
          </div>
        </div>
      </div>

      {/* Course Categories */}
      {filter === 'all' && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCourses
              .filter(course => course.status === 'ongoing')
              .map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  isExpanded={expandedCourse === course.id}
                  toggleExpansion={() => toggleCourseExpansion(course.id)}
                />
              ))}
          </div>
        </div>
      )}

      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCourses.map(course => (
          <CourseCard 
            key={course.id} 
            course={course} 
            isExpanded={expandedCourse === course.id}
            toggleExpansion={() => toggleCourseExpansion(course.id)}
          />
        ))}
      </div>
      
      {/* If no courses match the filter */}
      {filteredCourses.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-10 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses found</h3>
          <p className="text-gray-600">Try a different filter or explore new courses</p>
          <button 
            onClick={() => window.location.href = '/explore'}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Browse Courses
          </button>
        </div>
      )}

      {/* Back to Dashboard Button */}
      <div className="mt-8 text-center">
        <button 
          onClick={() => window.location.href = '/dashboard'}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

// Course Card Component
const CourseCard = ({ course, isExpanded, toggleExpansion }) => {
  // Status badge styling
  const statusBadge = {
    ongoing: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    "not-started": "bg-yellow-100 text-yellow-800"
  };

  // Status text
  const statusText = {
    ongoing: "In Progress",
    completed: "Completed",
    "not-started": "Not Started"
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Course thumbnail - placeholder */}
      <div className="h-40 bg-gray-300 relative">
        <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium ${statusBadge[course.status]}`}>
          {statusText[course.status]}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{course.instructor}</p>
        <p className="text-sm text-gray-700 mb-4">{course.description}</p>
        
        {/* Progress bar for ongoing courses */}
        {course.status === 'ongoing' && (
          <>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-purple-600 h-2 rounded-full" 
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Next Lesson:</span> {course.nextLesson}
            </p>
            <p className="text-xs text-gray-500 mt-2">Last accessed {course.lastAccessed}</p>
          </>
        )}
        
        {/* Completed date for completed courses */}
        {course.status === 'completed' && (
          <p className="text-sm text-gray-600 mt-2">
            Completed on {course.completedDate}
          </p>
        )}
        
        {/* Enrolled date for not-started courses */}
        {course.status === 'not-started' && (
          <p className="text-sm text-gray-600 mt-2">
            Enrolled on {course.enrolledDate}
          </p>
        )}
        
        {/* Show topics button */}
        <div className="flex space-x-2 mt-4">
          <button 
            className={`flex-1 py-2 rounded-lg font-medium 
              ${course.status === 'ongoing' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : course.status === 'completed'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-yellow-500 hover:bg-yellow-600 text-white'
              }`}
          >
            {course.status === 'ongoing' 
              ? 'Continue Course' 
              : course.status === 'completed'
                ? 'Review Course'
                : 'Start Course'
            }
          </button>
          
          <button 
            onClick={toggleExpansion}
            className="px-4 py-2 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            {isExpanded ? 'Hide Topics' : 'Show Topics'}
          </button>
        </div>
        
        {/* Topics list - expanded view */}
        {isExpanded && course.topics && (
          <div className="mt-4 border-t pt-4">
            <h4 className="font-bold text-gray-800 mb-3">Course Topics</h4>
            <div className="space-y-4">
              {course.topics.map((topic) => (
                <TopicItem key={topic.id} topic={topic} courseStatus={course.status} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Topic Item Component
const TopicItem = ({ topic, courseStatus }) => {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row">
        {/* Topic thumbnail */}
        <div 
          className="h-32 sm:h-auto sm:w-1/3 bg-gray-300 relative"
          style={{ backgroundImage: `url(${topic.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute bottom-0 right-0 bg-black bg-opacity-75 text-white text-xs px-2 py-1">
            {topic.duration}
          </div>
        </div>
        
        <div className="p-4 sm:w-2/3">
          <h5 className="font-bold text-gray-800">{topic.title}</h5>
          <p className="text-sm text-gray-600 mb-3">{topic.description}</p>
          
          <button 
            className={`text-sm px-3 py-1 rounded font-medium
              ${courseStatus === 'ongoing' 
                ? 'bg-blue-100 hover:bg-blue-200 text-blue-800' 
                : courseStatus === 'completed'
                  ? 'bg-green-100 hover:bg-green-200 text-green-800'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
          >
            {courseStatus === 'ongoing' 
              ? 'Watch Video' 
              : courseStatus === 'completed'
                ? 'Review Video'
                : 'Preview Video'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;