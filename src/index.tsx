import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SnackbarProvider } from "notistack";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Layout } from "./routes/layout";
import { ResultPage } from "./routes/result";
import { SearchPage } from "./routes/search";
import { ErrorPage } from "./routes/error";
import { HomePage } from "./routes/home";
import { getSearchResult } from "./api";

const queryClient = new QueryClient();

const API_URL = process.env.REACT_APP_API_URL;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route path="home" element={<HomePage />} />
      <Route
        path="teachers/:teacherId"
        element={<ResultPage type="teachers" />}
        loader={async ({ params }) => {
          try {
            const teacher = await fetch(
              `${API_URL}/teachers/${params.teacherId}`
            );
            return teacher;
          } catch (err) {
            console.log(err);
            return err;
          }
        }}
      />
      <Route
        path="subjects/:subjectId"
        element={<ResultPage type="subjects" />}
        loader={async ({ params }) => {
          try {
            const subject = await fetch(
              `${API_URL}/subjects/${params.subjectId}`
            );
            return subject;
          } catch (err) {
            console.log(err);
            return err;
          }
        }}
      />
      <Route
        path="search"
        element={<SearchPage />}
        loader={async ({ params, request }) => {
          const type = new URL(request.url).searchParams.get("type") as
            | "teachers"
            | "subjects";
          return getSearchResult(type);
        }}
      />
    </Route>
  )
);

createRoot(document.getElementById("root") as HTMLElement).render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <CssBaseline enableColorScheme />
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
