import axios from "axios";
import { useContext, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { AuthContext, type IAuthContext } from "../App";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { isAuth, setAuthState } = useContext<IAuthContext>(AuthContext);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalData = {
      email,
      password,
    };

    axios
      .post("http://localhost:3000/users/login", finalData)
      .then((response) => {
        const token = response.data.accessToken;
        localStorage.setItem("accessToken", token);
        window.location.href = "/";

        window.location.href = "/";
        // alert("User logged in successfully!");
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
        Login Form
      </Typography>
      <form onSubmit={handleSubmit}>

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
          Click Me
        </Button>
      </form>
    </Box>
  );
}
export default LoginForm;
