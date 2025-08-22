import { Container, Typography, Box, Paper } from "@mui/material";
import AuthHomePage from "../components/HomePage/AuthHomePage";

function HomePage() {
  return (
    <Container sx={{ mt: 4 }}>
      {/* Welcome Section */}
      <Typography variant="h4" gutterBottom>
        Welcome to the Professor Quiz Platform
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
        Test your knowledge, attempt quizzes, and explore question sets created
        by admins. Students and admins can seamlessly interact with our
        platform.
      </Typography>

      {/* Features Section */}
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Key Features
      </Typography>

      {/* Flexbox instead of Grid */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          mb: 4,
        }}
      >
        <Paper sx={{ p: 2, backgroundColor: "#e0f7fa", flex: "1 1 300px" }}>
          <Typography variant="h6">Create Quizzes</Typography>
          <Typography variant="body2">
            Admins can easily create question sets.
          </Typography>
        </Paper>

        <Paper sx={{ p: 2, backgroundColor: "#ffe0b2", flex: "1 1 300px" }}>
          <Typography variant="h6">Attempt Quizzes</Typography>
          <Typography variant="body2">
            Students can attempt quizzes anytime.
          </Typography>
        </Paper>

        <Paper sx={{ p: 2, backgroundColor: "#c8e6c9", flex: "1 1 300px" }}>
          <Typography variant="h6">Track Performance</Typography>
          <Typography variant="body2">
            Monitor progress and quiz results with ease.
          </Typography>
        </Paper>
      </Box>

      <div >
        <AuthHomePage />
      </div>
    </Container>
  );
}

export default HomePage;
