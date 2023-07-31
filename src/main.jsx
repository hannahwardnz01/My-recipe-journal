import * as React from "react";
import * as ReactDOM from "react-dom/client";
import ErrorPage from "./error-page";
import Root, { loader as rootLoader, action as rootAction,
} from "./routes/root";
import EditRecipe from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Homepage from "./routes/homepage";
import Lunch from "./routes/lunch"
import Vegetarian from "./routes/vegetarian";
import Recipe from "./routes/recipe"; 
import {recipeLoader, recipesLoader, multiLoader} from "./firebase_setup/read"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: 
    [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Homepage />, loader: recipesLoader,},
          {
            path: "homepage",
            element: <Homepage />,
            loader: recipesLoader,
          },
          {
            path: "vegetarian",
            element: <Vegetarian />,
            loader: recipesLoader,
          },
          {
            path: "lunch",
            element: <Lunch />,
            loader: recipesLoader,
          },     
          {
            path: "recipes/:recipeID",
            element: <Recipe />,
            loader: multiLoader,
          },
          {
            path: "recipes/:recipeID/edit",
            element: <EditRecipe />,
            loader: recipeLoader,
            //action: editAction,
          },
          {
            path: "recipes/:recipeID/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);