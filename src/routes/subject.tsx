import React, { FC, ReactNode } from "react";
import { Button, Grid, Paper, Typography, Stack } from "@mui/material";
import { Filters } from "../components/filters";
import { Assessments } from "../components/assessments";
import { useLoaderData } from "react-router-dom";

type Props = {
  children?: ReactNode;
};

type Subject = {
  id: string;
  name: string;
  assessments: number;
  teachers: number;
  concept: "A" | "B" | "C" | "D" | "FF";
};

export const SubjectPage: FC<Props> = () => {
  // const subject = useLoaderData();
  const subject: Subject = {
    id: "1",
    name: "INF0001 - Laboratório de Software",
    assessments: 5,
    teachers: 6,
    concept: "A",
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }} elevation={4}>
          <Stack direction="row" justifyContent="space-between">
            <div>
              <Typography variant="caption">Disciplina</Typography>
              <Typography variant="h4">Laboratório de Sistemas</Typography>
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
            <Typography>{subject.assessments} Avaliações</Typography>
            <Typography>Média: {subject.concept}</Typography>
          </Stack>
          <Assessments />
        </Paper>
      </Grid>
    </Grid>
  );
};
