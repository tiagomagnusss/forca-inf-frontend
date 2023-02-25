import { Box, Button, Typography, Stack } from "@mui/material";
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
    <img src={logo} alt="Logo" height={124} />
    <Typography variant="h1">FORCA 2.0</Typography>
    <Typography variant="body1">Revivemos o FORCA!</Typography>
    <Typography variant="body1">
      O FORCA (Fórum Colaborativo de Avaliação Docente) é uma ferramenta para
      <br />
      auxiliar os alunos do INF-UFRGS em épocas de matrícula.
      <br />
      Comece agora pesquisando por uma disciplina ou professor.
    </Typography>
    <Stack sx={{ mt: 4 }} direction="row" spacing={4}>
      <Button variant="contained" href="/search?type=subjects">
        Buscar Disciplinas
      </Button>
      <Button variant="contained" href="/search?type=teachers">
        Buscar Professores
      </Button>
    </Stack>
  </Box>
);
