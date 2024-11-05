import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { useAuth } from "contexts/AuthContext";

const LoginComponent: React.FC = () => {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const token = "dummy-token"; // Remplace par le vrai token reçu lors d'une connexion réussie
    login(token);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2
      }}>
      <Container maxWidth="xs">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          my={2}>
          <img
            src="/admin/images/logo.webp"
            alt="Logo"
            style={{
              width: "300px", // Ajustez selon la taille souhaitée
              height: "auto",
              maxWidth: "100%", // Pour qu'il soit responsive
              objectFit: "contain"
            }}
          />
        </Box>

        <Box
          sx={{
            mt: 8,
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: "background.paper"
          }}>
          <Typography
            variant="h5"
            component="h1"
            align="center"
            gutterBottom>
            Connexion
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Identifiant"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Mot de passe"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}>
            Se connecter
          </Button>
        </Box>
      </Container>
    </Container>
  );
};

export default LoginComponent;
