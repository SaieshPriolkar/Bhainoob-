import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./components/Landing";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Landing/>
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