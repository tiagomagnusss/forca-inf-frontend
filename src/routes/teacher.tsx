import React, { FC, ReactNode } from "react";
import { Button, Grid, Paper, Typography, Stack } from "@mui/material";
import { Filters } from "../components/filters";
import { Assessments } from "../components/assessments";
import { useLoaderData } from "react-router-dom";

type Props = {
  children?: ReactNode;
};

type Teacher = {
  id: string;
  name: string;
  assessments: number;
  subjects: number;
  concept: "A" | "B" | "C" | "D" | "FF";
};

export const TeacherPage: FC<Props> = () => {
  // const teacher = useLoaderData();
  const teacher: Teacher = {
    id: "1",
    name: "Marcelo Pimenta",
    assessments: 5,
    subjects: 6,
    concept: "A",
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }} elevation={4}>
          <Stack direction="row" justifyContent="space-between">
            <div>
              <Typography variant="caption">Professor</Typography>
              <Typography variant="h4">{teacher.name}</Typography>
            </div>
            <Button>Adicionar avaliação</Button>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{ p: 3 }} elevation={4}>
          <Typography>Filtros</Typography>
          <Filters />
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper sx={{ p: 3 }} elevation={4}>
          <Stack direction="row" justifyContent="space-between">
            <Typography>{teacher.assessments} Avaliações</Typography>
            <Typography>{teacher.concept}</Typography>
          </Stack>
          <Assessments />
        </Paper>
      </Grid>
    </Grid>
  );
};
