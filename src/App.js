import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './views/HomePage';
import Template from './views/Template';
import NavigationBar from './components/NavigationBar';
import ResultPage from './views/ResultPage';
import "./styles.css";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "results",
      element: <ResultPage />,
    },
    {
      path: "template",
      element: <Template />,
    },
  ])

  return (
    <div className="mainStyling">
      <NavigationBar />
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
