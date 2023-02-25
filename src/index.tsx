import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  redirect,
} from "react-router-dom";
import { Layout } from "./routes/layout";
import { TeacherPage } from "./routes/teacher";
import { SubjectPage } from "./routes/subject";
import { SearchPage } from "./routes/search";
import { ErrorPage } from "./routes/error";
import { HomePage } from "./routes/home";

const API_URL = "https://forca-2-0.onrender.com";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      errorElement={<ErrorPage />}
      // loader={() => redirect("/home")}
    >
      <Route path="home" element={<HomePage />} />
      <Route
        path="teacher/:teacherId"
        element={<TeacherPage />}
        // loader={({ params }) => {
        //   return fetch(`${API_URL}/teachers/${params.teacherId}`);
        // }}
      />
      <Route
        path="subject/:subjectId"
        element={<SubjectPage />}
        // loader={({ params }) => {
        //   return fetch(`${API_URL}/subjects/${params.subjectId}`);
        // }}
      />
      <Route path="search" element={<SearchPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
