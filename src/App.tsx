import LoginComponent from "components/auth/LoginComponent";
import { useAuth } from "contexts/AuthContext";
import Dashboard from "pages/dashboard/Dashboard";
import Users from "pages/users/Users";
import Sidebar from "components/sidebar/sidebar";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import {
  Box,
  Button,
  IconButton,
  Slide,
  useMediaQuery,
  useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Products from "pages/products/Products";
import Orders from "pages/orders/Orders";
import { Settings } from "@mui/icons-material";
import Messages from "pages/messages/Messages";
import Suppliers from "pages/fournisseurs/Suppliers";
import Analytics from "pages/analytics/Analytics";
import Marketing from "pages/marketing/Marketing";
import Statistics from "pages/statistics/Statistics";
import { useEffect, useState } from "react";
import ProductDetail from "pages/products/ProductDetails";
import AddProductPage from "pages/products/AddProductPage";

function App() {
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up(1024));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(376));

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isHideSidebar, setHideSideBar] = useState(false);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const toggleSmallSidebar = () => setHideSideBar(prev => !prev);

  useEffect(() => {
    if (isLargeScreen) {
      setSidebarOpen(true);
    }
    if (isSmallScreen) {
      setHideSideBar(true);
      setSidebarOpen(true);
    }
  }, [isLargeScreen, isSmallScreen]);

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <Header />
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              display: "flex",
              width: "100%",
              minHeight: "85vh",
              p: 1,
              bgcolor: "background.paper",
              borderRadius: 1,
              backgroundImage: theme =>
                theme.palette.mode === "light"
                  ? "url('/admin/images/bg-light.webp')"
                  : "url('/admin/images/bg-dark.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "background-image 0.7s ease-in-out"
            }}>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1
              }}
            />
            {isSmallScreen ? (
              <Box
                sx={{
                  width: isHideSidebar ? 0 : 60, // 180 quand ouvert, 60 quand fermé, 0 si écran petit
                  overflow: "hidden",
                  flexShrink: 0,
                  zIndex: 2,
                  transition: "width 0.3s ease"
                }}>
                <Sidebar
                  isLargeScreen={isLargeScreen}
                  toggleSidebar={toggleSidebar}
                  isSidebarOpen={isSidebarOpen}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  width: isLargeScreen ? (isSidebarOpen ? 180 : 60) : 60, // 180 quand ouvert, 60 quand fermé, 0 si écran petit
                  overflow: "hidden",
                  flexShrink: 0,
                  zIndex: 2,
                  transition: "width 0.3s ease"
                }}>
                <Sidebar
                  isLargeScreen={isLargeScreen}
                  toggleSidebar={toggleSidebar}
                  isSidebarOpen={isSidebarOpen}
                />
              </Box>
            )}

            <Box
              component="main"
              role="main"
              aria-label="Contenu principal"
              sx={{
                transition: "width 0.3s ease",

                position: "relative",
                "&::before": {
                  content: '"main"', // Notez les guillemets pour que ce soit une chaîne de texte
                  display: "block",
                  position: "absolute",
                  left: "-9999px" // Cache le contenu mais le rend accessible aux lecteurs d'écran
                },
                flexGrow: 1,
                p: 1,
                minHeight: "87vh",
                maxHeight: "calc(90vh - 30px)",
                overflowY: "auto",
                zIndex: 2
              }}>
              {isSmallScreen && (
                <Box>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      toggleSmallSidebar(); // Action du bouton
                    }}>
                    <MenuIcon />
                  </IconButton>
                </Box>
              )}
              <Routes>
                <Route
                  path="/admin/"
                  element={<Dashboard />}
                />
                <Route
                  path="/admin/suppliers"
                  element={<Suppliers />}
                />
                <Route
                  path="/admin/analytics"
                  element={<Analytics />}
                />
                <Route
                  path="/admin/marketing"
                  element={<Marketing />}
                />
                <Route
                  path="/admin/statistics"
                  element={<Statistics />}
                />
                <Route
                  path="/admin/users"
                  element={<Users />}
                />
                <Route
                  path="/admin/products"
                  element={<Products />}
                />
                <Route
                  path="/admin/products/add-product"
                  Component={AddProductPage}
                />

                <Route
                  path="/admin/products/:id"
                  element={<ProductDetail />}
                />

                <Route
                  path="/admin/orders"
                  element={<Orders />}
                />
                <Route
                  path="/admin/settings"
                  element={<Settings />}
                />
                <Route
                  path="/admin/messages"
                  element={<Messages />}
                />
                <Route
                  path="*"
                  element={<Navigate to="/admin" />}
                />
              </Routes>
            </Box>
            {/* </Slide> */}
          </Box>
          <Footer />
        </>
      ) : (
        <Routes>
          <Route
            path="/admin/login"
            element={<LoginComponent />}
          />
          <Route
            path="*"
            element={<Navigate to="/admin/login" />}
          />
        </Routes>
      )}
    </Router>
  );
}

export default App;
