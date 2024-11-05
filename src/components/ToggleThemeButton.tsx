import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useThemeContext } from "contexts/ThemeContext";

const ToggleThemeButton: React.FC = () => {
  const { setThemeMode } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (newMode: "light" | "dark" | "system") => {
    setThemeMode(newMode);
    handleClose();
  };

  return (
    <>
      <Tooltip
        title="Changer le thème"
        arrow>
        <IconButton
          color="inherit"
          onClick={handleClick}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl)}
          aria-label="Changer le thème">
          <Brightness4Icon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        role="menu"
        aria-label="Menu de sélection de thème">
        <MenuItem
          onClick={() => handleMenuItemClick("system")}
          role="menuitem">
          Système
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("light")}
          role="menuitem">
          Clair
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("dark")}
          role="menuitem">
          Sombre
        </MenuItem>
      </Menu>
    </>
  );
};

export default ToggleThemeButton;
