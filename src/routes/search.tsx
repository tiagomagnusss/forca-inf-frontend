import React, { FC, useState } from "react";
import {
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  Stack,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { Assessment } from "../components/assessments";

const colors = {
  A: "#6aa84f",
  B: "#93c47d",
  C: "#f1c232",
  D: "#cc0000",
  FF: "#999999",
};

type Result = {
  _id: string;
  type: string;
  name: string;
  assessments: Assessment[];
  code?: string;
  subjects?: number;
  teachers?: number;
  grade: "A" | "B" | "C" | "D" | "FF";
};

export const SearchPage: FC = () => {
  const result = useLoaderData() as Result[];
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const searchType = searchParams.get("type");

  return (
    <Grid container spacing={2} pb={4}>
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }} elevation={4}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
            <Typography variant="h5">
              Pesquisando por{" "}
              {searchType === "teachers" ? "Professores" : "Disciplinas"}
            </Typography>
            <Button
              component={Link}
              to={`/search?type=${
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
      {result
        .filter((i) =>
          `${i.code}${i.name}`.toLowerCase().includes(search.toLowerCase())
        )
        .map((item) => (
          <Grid item xs={4} height={200} key={item._id}>
            <Paper sx={{ p: 3 }} elevation={4}>
              <Stack spacing={2}>
                <Stack
                  spacing={2}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography
                    component={Link}
                    variant="h5"
                    to={`/${searchType}/${item._id}`}
                  >
                    {searchType === "subjects" && `${item.code} - `}
                    {item.name}
                  </Typography>
                  <Typography variant="h5" sx={{ color: colors[item.grade] }}>
                    {item.grade}
                  </Typography>
                </Stack>
                <Stack
                  spacing={2}
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  <Typography>{item.assessments.length} Avaliações</Typography>
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
