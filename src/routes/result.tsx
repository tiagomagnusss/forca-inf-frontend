import React, { FC, ReactNode, useState } from "react";
import { Button, Grid, Paper, Typography, Stack } from "@mui/material";
import { Filters } from "../components/filters";
import { Assessment, Assessments } from "../components/assessments";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { FormDialog } from "../components/form-dialog";
import { useSnackbar } from "notistack";
import { useStore } from "../hooks/useStore";

type Props = {
  children?: ReactNode;
  type: "teachers" | "subjects";
};

type Subject = {
  _id: string;
  name: string;
  code: string;
  assessments: Assessment[];
  teachers: number;
};

type Teacher = {
  _id: string;
  name: string;
  assessments: Assessment[];
  subjects: number;
};

export const ResultPage: FC<Props> = ({ type }) => {
  const { enqueueSnackbar } = useSnackbar();
  const result = useLoaderData() as Subject | Teacher;
  const isTeacher = type === "teachers";
  const [openForm, setOpenForm] = useState(false);
  const { authData } = useStore((state: any) => state);
  const navigate = useNavigate();
  const location = useLocation();

  const onOpenForm = () => {
    if (!authData)
      enqueueSnackbar(
        "Você precisa estar logado para escrever uma avaliação.",
        { variant: "error" }
      );
    else setOpenForm(true);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }} elevation={4}>
          <Stack direction="row" justifyContent="space-between">
            <div>
              <Typography variant="caption">
                {isTeacher ? "Professor" : "Disciplina"}
              </Typography>
              <Typography variant="h4">
                {!isTeacher && `${(result as Subject).code} - `} {result.name}
              </Typography>
            </div>
            <Button onClick={onOpenForm}>Adicionar avaliação</Button>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{ p: 3 }} elevation={4}>
          <Typography>Filtros</Typography>
          <Filters type={type} assessments={result.assessments} />
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper sx={{ p: 3 }} elevation={4}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">
              {result.assessments.length} Avaliações
            </Typography>
          </Stack>
          <Assessments type={type} assessments={result.assessments} />
        </Paper>
      </Grid>
      {openForm && (
        <FormDialog
          type={type}
          selectedValue={result._id}
          onClose={() => {
            setOpenForm(false);
            navigate(location.pathname, { replace: true });
          }}
        />
      )}
    </Grid>
  );
};
