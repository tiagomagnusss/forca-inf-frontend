import React, { FC, useState } from "react";
import {
  Button,
  Divider,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  Stack,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";

const colors = {
  A: "#6aa84f",
  B: "#93c47d",
  C: "#f1c232",
  D: "#cc0000",
  FF: "#999999",
};

type Result = {
  id: string;
  type: string;
  name: string;
  assessments: number;
  subjects?: number;
  teachers?: number;
  concept: "A" | "B" | "C" | "D" | "FF";
};

export const SearchPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const searchType = searchParams.get("type");

  const teachers: Result[] = [
    {
      id: "1",
      type: "teacher",
      name: "Marcelo Pimenta",
      assessments: 444,
      subjects: 5,
      concept: "A",
    },
    {
      id: "2",
      type: "teacher",
      name: "Renata Galante",
      assessments: 444,
      subjects: 5,
      concept: "B",
    },
    {
      id: "3",
      type: "teacher",
      name: "Dante Barone",
      assessments: 444,
      subjects: 5,
      concept: "C",
    },
    {
      id: "4",
      type: "teacher",
      name: "Luigi Carro",
      assessments: 444,
      subjects: 5,
      concept: "D",
    },
    {
      id: "5",
      type: "teacher",
      name: "Erika Cota",
      assessments: 444,
      subjects: 5,
      concept: "FF",
    },
  ];

  const subjects: Result[] = [
    {
      id: "1",
      type: "subject",
      name: "INF0001 - Laboratório de Software",
      assessments: 444,
      teachers: 5,
      concept: "A",
    },
    {
      id: "2",
      type: "subject",
      name: "INF0002 - Projeto de Banco de Dados",
      assessments: 444,
      teachers: 5,
      concept: "B",
    },
    {
      id: "3",
      type: "subject",
      name: "INF0003 - Fundamentos de Banco de Dados",
      assessments: 444,
      teachers: 5,
      concept: "C",
    },
    {
      id: "4",
      type: "subject",
      name: "INF0004 - Classificação e Pesquisa de Dados",
      assessments: 444,
      teachers: 5,
      concept: "D",
    },
    {
      id: "5",
      type: "subject",
      name: "INF0005 - Empreendimentos em Informática",
      assessments: 444,
      teachers: 5,
      concept: "FF",
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }} elevation={4}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
            <Typography variant="h5">
              Pesquisando por{" "}
              {searchType === "teachers" ? "Professores" : "Disciplinas"}
            </Typography>
            <Button
              href={`/search?type=${
                searchType === "teachers" ? "subjects" : "teachers"
              }`}
            >
              Trocar para{" "}
              {searchType === "teachers" ? "Disciplinas" : "Professores"}
            </Button>
          </Stack>

          <TextField
            placeholder="Pesquisar"
            label="Pesquisar"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Paper>
      </Grid>
      {(searchType === "teachers" ? teachers : subjects)
        .filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
        .map((item) => (
          <Grid item xs={3}>
            <Paper sx={{ p: 3 }} elevation={4}>
              <Stack spacing={2}>
                <Stack
                  spacing={2}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Link variant="h5" href={`/${item.type}/${item.id}`}>
                    {item.name}
                  </Link>
                  <Typography variant="h5" sx={{ color: colors[item.concept] }}>
                    {item.concept}
                  </Typography>
                </Stack>
                <Stack
                  spacing={2}
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  <Typography>{item.assessments} Avaliações</Typography>
                  {item.subjects && (
                    <Typography>{item.subjects} Disciplinas</Typography>
                  )}
                  {item.teachers && (
                    <Typography>{item.teachers} Professores</Typography>
                  )}
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        ))}
    </Grid>
  );
};
