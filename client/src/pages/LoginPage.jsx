import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Paper,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Join Chat");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currState === "Join Chat" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
    login(currState === "Join Chat" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#121212",
        p: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: { xs: "90%", sm: 400 },
          p: 4,
          borderRadius: 3,
          backgroundColor: "#ffffff",
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h4" color="textPrimary" align="center">
            {currState}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {currState === "Join Chat" && !isDataSubmitted && (
                <TextField
                  variant="outlined"
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  fullWidth
                />
              )}

              {!isDataSubmitted && (
                <>
                  <TextField
                    variant="outlined"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                  />

                  <TextField
                    variant="outlined"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                  />
                </>
              )}

              {currState === "Join Chat" && isDataSubmitted && (
                <TextField
                  variant="outlined"
                  label="Short Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                />
              )}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  "&:hover": { backgroundColor: "#333333" },
                  py: 1.5,
                }}
              >
                {currState === "Join Chat" ? "Create Account" : "Enter Chat"}
              </Button>

              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                sx={{ mt: 1 }}
              >
                {currState === "Join Chat"
                  ? "Already have an account? "
                  : "Don't have an account? "}
                <Box
                  component="span"
                  sx={{
                    color: "#000000",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setCurrState(
                      currState === "Join Chat" ? "Enter Chat" : "Join Chat"
                    );
                    setIsDataSubmitted(false);
                  }}
                >
                  {currState === "Join Chat"
                    ? "Enter Chat here"
                    : "Join Chat here"}
                </Box>
              </Typography>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Box>
  );
};

export default LoginPage;
