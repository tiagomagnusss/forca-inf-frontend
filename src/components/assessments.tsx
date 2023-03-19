import React, { FC } from "react";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export type Assessment = {
  _id: string;
  title: string;
  comment: string;
  semester: string;
  grade: "A" | "B" | "C" | "D" | "FF";
  teacher?: { name: string; _id: string };
  subject?: { name: string; code: string; _id: string };
  createdAt: Date;
};

type Props = {
  assessments: Assessment[];
  type: "teachers" | "subjects";
};

const colors = {
  A: "#6aa84f",
  B: "#93c47d",
  C: "#f1c232",
  D: "#cc0000",
  FF: "#999999",
};

export const Assessments: FC<Props> = ({ assessments, type }) => (
  <Stack spacing={3} sx={{ mt: 3 }}>
    {assessments.map(
      ({
        _id,
        grade,
        title,
        teacher,
        subject,
        comment,
        createdAt,
        semester,
      }) => (
        <Paper elevation={1} sx={{ p: 2 }} key={_id}>
          <Stack spacing={2}>
            <Stack
              spacing={2}
              direction="row"
              justifyContent="space-between"
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Typography variant="h5" sx={{ color: colors[grade] }}>
                {grade}
              </Typography>
              <Typography
                component={Link}
                variant="h6"
                to={`/${type === "subjects" ? "teachers" : "subjects"}/${
                  type === "teachers" ? subject?._id : teacher?._id
                }`}
              >
                {type === "teachers"
                  ? `${subject?.code} - ${subject?.name}`
                  : teacher?.name}
              </Typography>
              <Typography variant="h6">{semester}</Typography>
            </Stack>
            <Box sx={{ minHeight: 60 }}>
              <Typography variant="h6">{title}</Typography>
              <Typography>{comment}</Typography>
            </Box>
            <Typography variant="caption">
              Avaliação feita em{" "}
              {new Date(createdAt).toLocaleDateString("pt-BR")} -{" "}
              {new Date(createdAt).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </Stack>
        </Paper>
      )
    )}
  </Stack>
);
