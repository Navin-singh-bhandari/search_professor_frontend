import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Stack,
} from "@mui/material";

export interface IListQuestionSet {
  _id: string;
  title: string;
  questionCount: number;
}

function ListQuestionSet() {
  const [questionSets, setQuestionSet] = useState<IListQuestionSet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    async function fetchData() {
      axios
        .get("http://localhost:3000/api/questions/set/list", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setQuestionSet(response?.data?.questionSet || []);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (questionSets.length === 0) {
    return (
      <Typography variant="body1" sx={{ mt: 3 }}>
        No question sets found.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Question Sets
      </Typography>

      <Stack spacing={2}>
        {questionSets.map((question) => {
          const TakeQuizHandler = () => {
            navigate(`/questionset/${question._id}/attempt`);
          };

          return (
            <Card key={question._id} variant="outlined">
              <CardContent
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box>
                  <Typography variant="h6">{question.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {question.questionCount} questions
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={TakeQuizHandler}
                >
                  Take Quiz
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}

export default ListQuestionSet;
