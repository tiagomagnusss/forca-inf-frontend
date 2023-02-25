import React, { FC } from "react";
import { Container } from "@mui/material";
import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";

export const Layout: FC = () => (
  <>
    <Navbar />
    <main>
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </main>
  </>
);
