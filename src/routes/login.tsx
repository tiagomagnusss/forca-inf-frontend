import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Typography,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import logo from "../assets/gallows.png";
import { Link } from "react-router-dom";
import { login } from "../api";
import { googleLogout, GoogleLogin } from "@react-oauth/google";
import GoogleIcon from "@mui/icons-material/Google";
import { useStore } from "../hooks/useStore";

type Form = {
  mail: string;
  password: string;
};

export function LoginPage() {
  const { authData, setAuthData } = useStore((state: any) => state);
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      mail: "",
      password: "",
    },
  });

  // const onSubmit: SubmitHandler<Form> = async (data) => {
  //   await login();
  // };

  // const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const handleMouseDownPassword = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault();
  // };

  const onLogin = async (credentialResponse: any) => {
    const data = await login(credentialResponse.credential);

    if (!!data) setAuthData(data);
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 88px)",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Paper sx={{ p: 6, pt: 0 }} elevation={4}>
        <img src={logo} alt="Logo" height={124} />
        <Typography variant="h4" fontWeight="bold" sx={{ pt: 4, pb: 2 }}>
          Login
        </Typography>
        <Typography variant="body1" sx={{ pb: 4 }}>
          Crie uma conta ou faça login para escrever avaliações.
        </Typography>
        {authData ? (
          <Button
            variant="contained"
            size="large"
            startIcon={<GoogleIcon />}
            onClick={() => {
              googleLogout();
              localStorage.removeItem("AuthData");
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
      </Paper>
    </Box>
  );
}
