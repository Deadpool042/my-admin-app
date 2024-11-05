import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      bottom="0"
      sx={{
        py: 2,
        textAlign: "center",
        borderTop: "1px solid",
        borderColor: "divider",
        height: "30px",
        width: "100%"
      }}>
      <Typography variant="body2">
        © {currentYear}{" "}
        <Link
          href="https://www.c2projetweb.fr"
          target="_blank"
          rel="noopener">
          C2 Projet Web - Création Originale
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
