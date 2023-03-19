import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Assessment } from "./assessments";

type Props = { assessments: Assessment[]; type: "teachers" | "subjects" };

export function Filters({ assessments, type }: Props) {
  const semesters = [...new Set(assessments.map((a) => a.semester))];
  const grades = [...new Set(assessments.map((a) => a.grade))];
  const subjects = assessments
    .map((a) => a.subject)
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t?._id === value?._id)
    );

  const teachers = assessments
    .map((a) => a.teacher)
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t?._id === value?._id)
    );

  const [checked, setChecked] = useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const filters: { title: string; options: any[] }[] = [
    { title: "Semestre", options: semesters },
    { title: "Conceito", options: grades },
  ];

  filters.push(
    type === "teachers"
      ? { title: "Disciplina", options: subjects }
      : { title: "Professores", options: teachers }
  );

  return (
    <Box sx={{ mt: 3 }}>
      {filters.map((filter) => (
        <Accordion
          defaultExpanded
          disableGutters
          elevation={0}
          key={filter.title}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{filter.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {filter.options.map((value, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(index)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(index) !== -1}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={typeof value === "string" ? value : value?.name}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
