import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Tooltip
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ToggleThemeButton from "components/ToggleThemeButton";
import { useAuth } from "contexts/AuthContext";
import { base_site_url } from "api/config";

const Header: React.FC = () => {
  const { logout } = useAuth();

  return (
    <AppBar
      component="header"
      position="static"
      role="banner"
      aria-label="En-tête du site"
      sx={{
        borderBottom: theme =>
          `2px solid ${
            theme.palette.mode === "dark"
              ? theme.palette.primary.main
              : theme.palette.secondary.main
          }`
      }}>
      <Toolbar>
        <Tooltip
          title="Logo du site"
          arrow>
          <Box
            component="img"
            src="/admin/images/logo.webp"
            alt="Logo"
            sx={{
              width: { xs: 100, md: 150 },
              transition: "width 0.3s ease",
              mr: 2,
              filter: theme =>
                theme.palette.mode === "light" ? "brightness(0)" : "none"
            }}
          />
        </Tooltip>

        <Tooltip
          title="Accéder au site principal"
          arrow>
          <Button
            aria-label="Lien vers le site"
            href={base_site_url}
            color="inherit">
            Voir le site
          </Button>
        </Tooltip>

        <Box sx={{ flexGrow: 1 }} />

        <Tooltip
          title="Déconnexion"
          arrow>
          <IconButton
            aria-label="Déconnexion"
            color="inherit"
            onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>

        <ToggleThemeButton />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
