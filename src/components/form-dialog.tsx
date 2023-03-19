import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  Stack,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { createAssessment, getSearchResult } from "../api";
import { useQuery } from "react-query";
import { useSnackbar } from "notistack";

type Props = {
  onClose: () => void;
  type: "teachers" | "subjects";
  selectedValue: string;
};

type Form = {
  title: string;
  comment: string;
  grade: "A" | "B" | "C" | "D" | "FF";
  teacher: string;
  subject: string;
  semester: string;
};

const grades: ("A" | "B" | "C" | "D" | "FF")[] = ["A", "B", "C", "D", "FF"];

const getSemesters = () => {
  const result: string[] = [];
  const startYear = 2022;
  const stopYear = startYear + 10;

  const yearsArray = Array.from(
    { length: (stopYear - startYear) / 1 + 1 },
    (_, i) => startYear + i * 1
  );

  yearsArray.map((item) => {
    result.push(`${item}/1`);
    result.push(`${item}/2`);
  });

  return result;
};

export function FormDialog({ onClose, type, selectedValue }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const teachers = useQuery("teachers", () => getSearchResult("teachers"));
  const subjects = useQuery("subjects", () => getSearchResult("subjects"));
  const semesters = getSemesters();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      comment: "",
      grade: "",
      teacher: type === "teachers" ? selectedValue : "",
      subject: type === "subjects" ? selectedValue : "",
      semester: "",
    },
  });

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const result = await createAssessment({
      ...data,
      owner: "641272f8480cad945d9ebe96",
    });
    console.log(result);
    enqueueSnackbar("Avaliação criada com sucesso!", { variant: "success" });
    onClose();
  };

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Adicionar Avaliação</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit as any)}>
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack direction="row" spacing={2}>
            <Controller
              name="teacher"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="teacher-select-label">Professor</InputLabel>
                  <Select
                    {...field}
                    labelId="teacher-select-label"
                    id="teacher-select"
                    label="Professor"
                    readOnly={type === "teachers"}
                  >
                    {teachers &&
                      !!teachers.isSuccess &&
                      teachers.data.map((item: any) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="subject"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="subject-select-label">Disciplina</InputLabel>
                  <Select
                    {...field}
                    labelId="subject-select-label"
                    id="subject-select"
                    label="Disciplina"
                    readOnly={type === "subjects"}
                  >
                    {subjects &&
                      !!subjects.isSuccess &&
                      subjects.data.map((item: any) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Controller
              name="semester"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="semester-select-label">Semestre</InputLabel>
                  <Select
                    {...field}
                    labelId="semester-select-label"
                    id="semester-select"
                    label="Semestre"
                  >
                    {semesters.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="grade"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="grade-select-label">Conceito</InputLabel>
                  <Select
                    {...field}
                    labelId="grade-select-label"
                    id="grade-select"
                    label="Conceito"
                  >
                    {grades.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Stack>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField {...field} label="Título" />}
          />
          <Controller
            name="comment"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} multiline rows={4} label="Comentário" />
            )}
          />
          <Stack direction="row" spacing={2}>
            <Button onClick={onClose} variant="outlined">
              Cancelar
            </Button>
            <Button type="submit" variant="contained">
              Adicionar Avaliação
            </Button>
          </Stack>
        </Stack>
      </form>
    </Dialog>
  );
}
