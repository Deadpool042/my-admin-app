import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Chargement..." }) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      color={theme.palette.text.primary}>
      <CircularProgress
        color="primary"
        size={60}
        thickness={5}
      />
      <Typography
        variant="h6"
        sx={{ mt: 2, color: theme.palette.text.secondary }}>
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;
