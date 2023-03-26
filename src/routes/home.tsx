import { Box, Paper, Button, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/gallows.png";

export const HomePage = () => (
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
      <Typography variant="h1" fontWeight="bold" sx={{ pb: 2 }}>
        FORCA 2.0
      </Typography>
      <Typography variant="h4" sx={{ pb: 2 }}>
        Revivemos o FORCA!
      </Typography>
      <Typography variant="h6" fontWeight="normal">
        O FORCA (Fórum Colaborativo de Avaliação Docente) é uma ferramenta para
        <br />
        auxiliar os alunos do INF-UFRGS em épocas de matrícula.
        <br />
        Comece agora pesquisando por uma disciplina ou professor.
      </Typography>
      <Stack sx={{ mt: 4 }} direction="row" spacing={4} justifyContent="center">
        <Button
          component={Link}
          variant="contained"
          to="/search?type=subjects"
          size="large"
        >
          Buscar Disciplinas
        </Button>
        <Button
          component={Link}
          variant="contained"
          to="/search?type=teachers"
          size="large"
        >
          Buscar Professores
        </Button>
      </Stack>
    </Paper>
  </Box>
);
