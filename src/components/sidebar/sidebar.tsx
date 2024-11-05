import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  ListItemButton,
  Paper,
  useTheme,
  Slide,
  IconButton,
  Tooltip,
  useMediaQuery
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import MailIcon from "@mui/icons-material/Mail";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { Link, useLocation } from "react-router-dom";

const sidebarItems = [
  { label: "Accueil", icon: <HomeIcon />, route: "/" },
  { label: "Fournisseurs", icon: <BarChartIcon />, route: "/admin/suppliers" },
  { label: "Produits", icon: <InventoryIcon />, route: "/admin/products" },
  { label: "Commandes", icon: <CategoryIcon />, route: "/admin/orders" },
  { label: "Analytique", icon: <BarChartIcon />, route: "/admin/analytics" },
  { label: "Marketing", icon: <BarChartIcon />, route: "/admin/marketing" },
  { label: "Statistiques", icon: <BarChartIcon />, route: "/admin/statistics" },
  { label: "Utilisateurs", icon: <PeopleIcon />, route: "/admin/users" },
  { label: "Messages", icon: <MailIcon />, route: "/admin/messages" },
  { label: "Paramètres", icon: <SettingsIcon />, route: "/admin/settings" }
];

interface SidebarProps {
  isLargeScreen: boolean;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  isLargeScreen,
  toggleSidebar,
  isSidebarOpen
}) => {
  const theme = useTheme();
  const location = useLocation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Tableau d’état pour la visibilité de chaque élément
  const [visibleItems, setVisibleItems] = useState(
    Array(sidebarItems.length).fill(false)
  );

  // Définir chaque élément comme visible un par un
  useEffect(() => {
    sidebarItems.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => {
          const newVisibleItems = [...prev];
          newVisibleItems[index] = true;
          return newVisibleItems;
        });
      }, index * 100); // Délai de 100ms entre chaque élément
    });
  }, []);

  return (
    <Paper
      elevation={3}
      component="nav"
      role="navigation"
      aria-label="Menu de navigation latéral"
      sx={{
        width: isLargeScreen ? (isSidebarOpen ? 180 : 60) : 60,
        height: "100%",
        borderRadius: 2,
        bgcolor: theme.palette.background.default,
        backdropFilter: "blur(10px)",
        transition: "width 0.3s ease",
        position: "relative"
      }}>
      <Box sx={{ width: "100%", height: "100%" }}>
        {isLargeScreen && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 1
            }}>
            <IconButton onClick={toggleSidebar}>
              {isSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Box>
        )}

        <List>
          {sidebarItems.map((item, index) => (
            <ListItem
              key={index}
              disablePadding>
              <Slide
                key={index}
                direction="up"
                in
                style={{ transitionDelay: `${index * 100}ms` }} // délai basé sur l'index
              >
                <ListItemButton
                  component={Link}
                  to={item.route}
                  sx={{
                    color:
                      location.pathname === item.route
                        ? theme.palette.text.primary
                        : theme.palette.text.primary,
                    "&:hover": {
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.text.primary
                    },
                    bgcolor:
                      location.pathname === item.route
                        ? theme.palette.primary.main
                        : "transparent",
                    transition: "background-color 0.3s ease, color 0.3s ease"
                  }}>
                  {isSmallScreen ? (
                    <Tooltip
                      title={item.label}
                      arrow
                      placement="right">
                      <ListItemIcon
                        sx={{
                          color:
                            location.pathname === item.route
                              ? theme.palette.text.primary
                              : theme.palette.text.primary
                        }}>
                        {item.icon}
                      </ListItemIcon>
                    </Tooltip>
                  ) : (
                    <ListItemIcon
                      sx={{
                        color:
                          location.pathname === item.route
                            ? theme.palette.text.primary
                            : theme.palette.text.primary
                      }}>
                      {item.icon}
                    </ListItemIcon>
                  )}
                  <Slide
                    direction="left"
                    in>
                    <ListItemText
                      primary={item.label}
                      sx={{
                        opacity: isSidebarOpen ? 1 : 0,
                        width: isSidebarOpen ? "auto" : 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        transition: "opacity 0.3s ease, width 0.3s ease"
                      }}
                    />
                  </Slide>
                </ListItemButton>
              </Slide>
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default Sidebar;
