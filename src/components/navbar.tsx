import React from "react";
import { AppBar, Container, Stack, Toolbar, Typography } from "@mui/material";
import logo from "../assets/gallows.png";
import { Link } from "react-router-dom";

export default function SearchAppBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logo} alt="Logo" height={40} />

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
              FORCA 2.0
            </Link>
          </Typography>
          <Stack direction="row" spacing={6}>
            <Link
              to="/search?type=teachers"
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
              }}
            >
              PROFESSORES
            </Link>
            <Link
              to="/search?type=subjects"
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
              }}
            >
              DISCIPLINAS
            </Link>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
