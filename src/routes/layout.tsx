import React, { FC, useEffect } from "react";
import { CircularProgress, Container } from "@mui/material";
import { Navbar } from "../components/navbar";
import {
  Outlet,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";

export const Layout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation();

  useEffect(() => {
    if (location.pathname === "/") navigate("/home");
  }, [location.pathname, navigate]);

  return (
    <>
      <Navbar />
      <main>
        <Container maxWidth="xl" sx={{ mt: 3 }}>
          {navigation.state === "loading" && <CircularProgress />}
          <Outlet />
        </Container>
      </main>
    </>
  );
};
