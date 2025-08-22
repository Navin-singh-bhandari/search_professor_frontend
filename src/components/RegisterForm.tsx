import axios from "axios";
import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

function RegisterForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalData = {
      name,
      email,
      password,
    };

    axios
      .post("http://localhost:3000/users/create", finalData)
      .then((response) => {
        alert("User registered successfully!");
      })
      .catch((error) => {
        console.log("error => ", error);
        const errors = error?.response?.data?.message || "An error occurred";
        alert(errors);
      });
  };
  return (
      <Box sx={{ width: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Register Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={handleNameChange}
        />
         <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
          />
        
        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
     </Box>
  );
}
export default RegisterForm;
