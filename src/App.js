import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './views/HomePage';
import SearchPage from './views/SearchPage';
import Template from './views/Template';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "searchpage",
      element: <SearchPage />,
    },
    {
      path: "template",
      element: <Template />,
    },
  ])

  const mainStyling = {
    display: "flex",
  }

  return (
    <div style={mainStyling}>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
