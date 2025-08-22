import axios from "axios";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

export interface QuestionSetForm {
  title: string;
  questions: {
    questionText: string;
    choices: { text: string; label: string; correctAnswer: boolean }[];
  }[];
}

function CreateQuestionSetForm() {
  const defaultValues: QuestionSetForm = {
    title: "",
    questions: [
      {
        questionText: "",
        choices: [],
      },
    ],
  };

  const methods = useForm({ defaultValues });
  const { watch, register, handleSubmit } = methods;

  const onSubmitHandler = (data: QuestionSetForm) => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .post("http://localhost:3000/api/admin/questionset/create", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        alert("Question Set Created Successfully ✅");
      })
      .catch(() => {
        alert("❌ Failed to create Question Set");
      });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Typography variant="h5" gutterBottom>
              Create Question Set
            </Typography>

            {/* Title Input */}
            <TextField
              label="Enter Title"
              fullWidth
              margin="normal"
              {...register("title")}
            />

            {/* Questions Section */}
            <CreateQuestions />

            <Box sx={{ mt: 3 }}>
              <Button type="submit" variant="contained" color="primary">
                Create Question Set
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Paper>
    </Container>
  );
}

function CreateQuestions() {
  const { register, control } = useFormContext<QuestionSetForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6">Questions</Typography>

      {fields?.map((field, index) => (
        <Paper
          key={field.id}
          sx={{
            p: 2,
            my: 2,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              label={`Question ${index + 1}`}
              {...register(`questions.${index}.questionText`)}
            />
            <IconButton color="error" onClick={() => remove(index)}>
              <Delete />
            </IconButton>
          </Box>

          {/* Choices Section */}
          <CreateChoices questionIndex={index} />
        </Paper>
      ))}

      <Button
        startIcon={<Add />}
        variant="outlined"
        onClick={() =>
          append({
            questionText: "",
            choices: [],
          })
        }
      >
        Add Question
      </Button>
    </Box>
  );
}

function CreateChoices({ questionIndex }: { questionIndex: number }) {
  const { register, control } = useFormContext<QuestionSetForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.choices`,
  });

  return (
    <Box sx={{ mt: 2, pl: 3 }}>
      <Typography variant="subtitle1">Choices</Typography>

      {fields?.map((field, index) => (
        <Box
          key={field.id}
          sx={{ display: "flex", alignItems: "center", my: 1, gap: 2 }}
        >
          <Checkbox
            {...register(
              `questions.${questionIndex}.choices.${index}.correctAnswer`
            )}
          />
          <TextField
            label={`Choice ${index + 1}`}
            {...register(`questions.${questionIndex}.choices.${index}.text`)}
            fullWidth
          />
          <IconButton color="error" onClick={() => remove(index)}>
            <Delete />
          </IconButton>
        </Box>
      ))}

      <Button
        startIcon={<Add />}
        size="small"
        variant="outlined"
        sx={{ mt: 1 }}
        onClick={() =>
          append({
            label: fields?.length.toString(),
            text: "",
            correctAnswer: false,
          })
        }
      >
        Add Choice
      </Button>
    </Box>
  );
}

export default CreateQuestionSetForm;
