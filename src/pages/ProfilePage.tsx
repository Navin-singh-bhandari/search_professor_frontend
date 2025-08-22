import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function ProfilePage() {
  const defaultValues = {
    name: "",
    bio: "",
    email: "",
    skills: "React,Node",
    config: {
      mode: "view",
    },
  };

  const methods = useForm({ defaultValues });
  const { watch, reset, setValue, register, handleSubmit } = methods;

  useEffect(() => {
    // Simulate backend fetch
    const fetchProfile = async () => {
      try {
        // Replace with actual API call:
        // const response = await axios.get('/api/profile');
        // reset(response.data);

        const backendResponse = {
          name: "Nabin Bhandari",
          bio: "I am a software engineer with a passion for building web applications.",
          email: "Nabin@gmail.com",
          skills: "React, Node, Express",
          config: { mode: "view" },
        };
        reset(backendResponse);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchProfile();
  }, [reset]);

  const data = watch();

  const OnClickEdit = () => {
    setValue("config.mode", "edit");
  };

  const GoBackButton = () => {
    setValue("config.mode", "view");
  };

  // Handle update permanently
  const onUpdate = async (data: any) => {
    try {
      const response = await axios.post("http://localhost:3000/api/profile/update", data);
      if (response.data.success) {
        reset(response.data.data); // update form with backend data
        setValue("config.mode", "view");
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile. Try again!");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Profile Page</h1>

      {data?.config?.mode === "view" && (
        <div>
          <button onClick={OnClickEdit} style={{ marginBottom: "1rem" }}>
            Edit Profile
          </button>
          <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", maxWidth: "400px" }}>
            <p><strong>Name:</strong> {data?.name}</p>
            <p><strong>Email:</strong> {data?.email}</p>
            <p><strong>Bio:</strong> {data?.bio}</p>
            <p><strong>Skills:</strong> {data?.skills}</p>
          </div>
        </div>
      )}

      {data?.config?.mode === "edit" && (
        <form
          style={{ display: "flex", flexDirection: "column", width: "400px" }}
          onSubmit={handleSubmit(onUpdate)}
        >
          <input {...register("name")} placeholder="Name" style={{ marginBottom: "0.5rem", padding: "0.5rem" }} />
          <input {...register("email")} placeholder="Email" style={{ marginBottom: "0.5rem", padding: "0.5rem" }} />
          <textarea {...register("bio")} placeholder="Bio" style={{ marginBottom: "0.5rem", padding: "0.5rem" }} />
          <input {...register("skills")} placeholder="Skills" style={{ marginBottom: "0.5rem", padding: "0.5rem" }} />
          <div style={{ marginTop: "1rem" }}>
            <button type="button" onClick={GoBackButton} style={{ marginRight: "0.5rem" }}>
              Go Back
            </button>
            <button type="submit">Update</button>
          </div>
        </form>
      )}
      
    </div>
    
  );
}

export default ProfilePage;
