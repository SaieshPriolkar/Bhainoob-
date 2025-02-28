import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./components/Landing";
import CourseCard from './components/Dashboard/CourseCard';
import Dashboard from './components/Dashbord';
import ProgressWidget from './components/Dashboard/ProgressWidget';
import RecommendationList from './components/Dashboard/RecommendationList';
import Quizzes from './components/Quizzes';



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Landing/>
      </div>
    ),
  },
  {
    path: "/coursecard",
    element: (
      <div>
        <CourseCard/>
      </div>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <div>
        <Dashboard/>
      </div>
    ),
  },
  {
    path: "/progresswidget",
    element: (
      <div>
        <ProgressWidget/>
      </div>
    ),
  },
  {
    path: "/recomendation",
    element: (
      <div>
        <RecommendationList/>
      </div>
    ),
  },
  {
    path: "/quizzes",
    element: (
      <div>
        <Quizzes/>
      </div>
    ),
  },


  
  
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App