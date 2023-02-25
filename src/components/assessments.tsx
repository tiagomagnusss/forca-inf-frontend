import React, { FC, ReactNode } from "react";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";

type Props = {
  children?: ReactNode;
};

export const Assessments: FC<Props> = () => {
  const assessments = [
    {
      title: "Example ",
      teacher: "Example Teacher or Subject",
      semester: "2022/2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
      createdAt: new Date(),
    },
    {
      title: "Example ",
      teacher: "Example",
      semester: "2022/2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
      createdAt: new Date(),
    },
    {
      title: "Example ",
      teacher: "Example",
      semester: "2022/2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
      createdAt: new Date(),
    },
  ];
  return (
    <Stack spacing={3} sx={{ mt: 3 }}>
      {assessments.map((assessment, index) => (
        <Paper elevation={1} sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Stack
              spacing={2}
              direction="row"
              justifyContent="space-between"
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Typography>
                {assessment.title} #{index}
              </Typography>
              <Typography>{assessment.teacher}</Typography>
              <Typography>{assessment.semester}</Typography>
            </Stack>
            <Box sx={{ minHeight: 60 }}>
              <Typography>{assessment.description}</Typography>
            </Box>
            <Typography>
              Avaliação feita em{" "}
              {assessment.createdAt.toLocaleDateString("pt-BR")} -{" "}
              {assessment.createdAt.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};
