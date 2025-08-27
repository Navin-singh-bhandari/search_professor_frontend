import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

function EditProfilePage() {
  const defaultValues = {
    name: "",
    bio: "",
    email: "",
    skills: "React,Node",
  };

  const { register, reset, handleSubmit } = useForm({ defaultValues });

  useEffect(() => {
    // Simulate backend fetch
    const fetchProfile = async () => {
      try {
        const backendResponse = {
          name: "Nabin Bhandari",
          bio: "I am a software engineer with a passion for building web applications.",
          email: "Nabin@gmail.com",
          skills: "React, Node, Express",
        };
        reset(backendResponse);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchProfile();
  }, [reset]);

  const onUpdate = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/profile/update",
        data
      );
      if (response.data.success) {
        reset(response.data.data);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile. Try again!");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Card sx={{ width: "70%", p: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            ✏️ Edit Profile
          </Typography>
          <form onSubmit={handleSubmit(onUpdate)}>
            <Grid container spacing={3}>
              {/* Left column with avatar */}
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar sx={{ width: 100, height: 100 }}>
                  {defaultValues?.name?.[0] || "U"}
                </Avatar>
                <Button variant="outlined" size="small">
                  Change Avatar
                </Button>
              </Grid>

              {/* Right column with form */}
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Name"
                  margin="normal"
                  {...register("name")}
                />
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  {...register("email")}
                />
                <TextField
                  fullWidth
                  label="Bio"
                  margin="normal"
                  multiline
                  rows={3}
                  {...register("bio")}
                />
                <TextField
                  fullWidth
                  label="Skills"
                  margin="normal"
                  {...register("skills")}
                />

                <Box sx={{ mt: 3, textAlign: "right" }}>
                  <Button
                    variant="outlined"
                    sx={{ mr: 2 }}
                    onClick={() => reset(defaultValues)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Save Changes
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default EditProfilePage;
