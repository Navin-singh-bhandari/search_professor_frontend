import { Card, CardContent, Typography, Avatar, Box, Badge } from "@mui/material";

function MyInformation({
  id,
  name,
  email,
}: {
  id: string;
  name: string;
  email?: string;
}) {
  return (
    <Card
      sx={{
        maxWidth: 360,
        p: 2,
        borderRadius: 4,
        backgroundColor: "#27552eff", // entire box color
        color: "#ffffff", // text color for contrast
        boxShadow: "4px 4px 10px rgba(0,0,0,0.3), -4px -4px 10px rgba(255,255,255,0.1)", // toned down
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "6px 6px 12px rgba(0,0,0,0.35), -6px -6px 12px rgba(255,255,255,0.1)",
        },
        mb: 3, // spacing between multiple cards
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Badge
          color="primary"
          overlap="circular"
          variant="dot"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Avatar sx={{ bgcolor: "#ffffff", color: "#183b1bff", width: 50, height: 50 }}>
            {name.charAt(0).toUpperCase()}
          </Avatar>
        </Badge>
        <Typography
          variant="h6"
          sx={{ ml: 2, fontWeight: "bold" }}
        >
          {name}
        </Typography>
      </Box>

      <CardContent sx={{ p: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: "bold", mb: 0.5 }}>
          ID: {id}
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          {email ? `Email: ${email}` : "No Email Found"}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MyInformation;
