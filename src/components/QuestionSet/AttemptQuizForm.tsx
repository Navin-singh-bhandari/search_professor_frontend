import React, { useState } from "react";
import type { IAttempQuestionForm } from "../../pages/QuestionSet/AttemptQuizPage";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Stack,
} from "@mui/material";

export interface IAttemptQuizFinalData {
  questionSet: string;
  responses: {
    questionId: string;
    selectedChoicesIds: string[];
  }[];
}

function AttemptQuizForm({
  questionSet,
}: {
  questionSet: IAttempQuestionForm;
}) {
  const [result, setResult] = useState<any>(null);

  const defaultValues: IAttempQuestionForm = {
    ...questionSet,
  };

  const methods = useForm({ defaultValues });
  const { watch, register, handleSubmit } = methods;

  console.log("form values => ", watch());

  const onSubmitHandler = (data: IAttempQuestionForm) => {
    const accessToken = localStorage.getItem("accessToken");

    const finalData: IAttemptQuizFinalData = {
      questionSet: data?._id,
      responses: data?.questions?.map((question) => {
        return {
          questionId: question?._id,
          selectedChoicesIds: question?.choices
            ?.filter((choice) => choice?.selected)
            ?.map((ch) => ch?._id),
        };
      }),
    };

    axios
      .post("http://localhost:3000/api/questions/answer/attempt", finalData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        alert("Answer Set Updated Successfully");
        setResult(res.data.data);
      })
      .catch((err) => {
        console.error("Error submitting answers:", err);
      });
  };

  if (result) {
    return (
      <Typography variant="h6" sx={{ mt: 2 }}>
        ✅ Your Score is <strong>{result?.score || 0}</strong> out of{" "}
        <strong>{result?.total || 0}</strong> questions attempted.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quiz Title
              </Typography>
              <TextField
                fullWidth
                label="Enter Title"
                {...register("title")}
              />
            </CardContent>
          </Card>

          <CreateQuestions />

          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              Submit Answer
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Box>
  );
}

function CreateQuestions() {
  const { control } = useFormContext<IAttempQuestionForm>();

  const { fields } = useFieldArray({
    control,
    name: "questions",
  });

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Questions
      </Typography>
      {fields?.map((field, index) => (
        <Card key={index} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              {field?.questionText}
            </Typography>
            <CreateChoices questionIndex={index} />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

function CreateChoices({ questionIndex }: { questionIndex: number }) {
  const { register, control } = useFormContext<IAttempQuestionForm>();

  const { fields } = useFieldArray({
    control,
    name: `questions.${questionIndex}.choices`,
  });

  return (
    <Box sx={{ pl: 2 }}>
      {fields?.map((field, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              {...register(
                `questions.${questionIndex}.choices.${index}.selected`
              )}
            />
          }
          label={field?.text}
        />
      ))}
    </Box>
  );
}

export default AttemptQuizForm;
