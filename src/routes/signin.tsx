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

type Form = {
  name: string;
  mail: string;
  password: string;
};

export function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      mail: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Form> = (data) => {
    console.log(data);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
          Criar Conta
        </Typography>
        <Typography variant="body1" sx={{ pb: 4 }}>
          Crie uma conta ou faça login para escrever avaliações.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <TextField {...field} label="Nome" />}
            />
            <Controller
              name="mail"
              control={control}
              render={({ field }) => (
                <TextField {...field} type="email" label="Email" />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Senha
                  </InputLabel>
                  <OutlinedInput
                    {...field}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Senha"
                  />
                </FormControl>
              )}
            />
            <Button type="submit" variant="contained" size="large">
              Login
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/login"
            >
              Crie uma conta
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
