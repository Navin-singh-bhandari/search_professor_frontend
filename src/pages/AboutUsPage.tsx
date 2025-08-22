import { Container, Typography } from "@mui/material";

function AboutUsPage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Welcome to our platform! This website is designed to help students and
        professionals connect in an educational and interactive way.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Our main goal is to provide a seamless experience for creating and
        attempting quizzes. Admins can easily create question sets, manage
        content, and monitor responses, while students can attempt quizzes and
        track their progress.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Key features of our platform include:
      </Typography>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li>Admin dashboard for creating and managing question sets.</li>
        <li>Students can attempt quizzes and view their performance.</li>
        <li>Secure login and role-based access control for admins and students.</li>
        <li>Responsive design, accessible from any device.</li>
        <li>Interactive UI to make learning and testing more engaging.</li>
      </ul>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Our mission is to bridge the gap between professors and students, making
        learning more structured, efficient, and interactive. Whether you are
        an admin managing educational content or a student testing your knowledge,
        our platform is here to provide a smooth and productive experience.
      </Typography>
      <Typography variant="body1">
        Thank you for choosing our platform. We continuously strive to improve
        and bring innovative features that enhance the learning journey.
      </Typography>
    </Container>
  );
}

export default AboutUsPage;
