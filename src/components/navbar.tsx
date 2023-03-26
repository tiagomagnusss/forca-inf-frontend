import React from "react";
import {
  AppBar,
  Button,
  Container,
  Stack,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import logo from "../assets/gallows.png";
import { Link } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useStore } from "../hooks/useStore";
import { login } from "../api";

export function Navbar() {
  const { authData, setAuthData } = useStore((state: any) => state);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogin = async (credentialResponse: any) => {
    const { data, accessToken } = await login(credentialResponse.credential);
    localStorage.setItem("accessToken", accessToken);
    if (!!data) {
      setAuthData(data);
    }
  };

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
          <Stack direction="row" spacing={6} alignItems="center">
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
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle fontSize="large" />
            </IconButton>
          </Stack>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {authData && (
              <MenuItem sx={{ textAlign: "center" }}>
                Logado como <br />
                {authData?.name || ""}
              </MenuItem>
            )}
            <MenuItem sx={{ justifyContent: "center" }}>
              {authData ? (
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => {
                    googleLogout();
                    setAuthData(null);
                    window.location.reload();
                  }}
                >
                  Logout
                </Button>
              ) : (
                <GoogleLogin
                  onSuccess={onLogin}
                  onError={() => console.log("Login failed")}
                />
              )}
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
