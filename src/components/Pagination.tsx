import React from "react";
import {
  Box,
  IconButton,
  Typography,
  Button,
  useMediaQuery
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTheme } from "@mui/material/styles";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
  maxPageNumbersToShow?: number;
  showFirstLastButtons?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  maxPageNumbersToShow = 5,
  showFirstLastButtons = true
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isDarkMode = theme.palette.mode === "dark";

  const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);

  const handlePrevious = () => currentPage > 1 && onPageChange(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && onPageChange(currentPage + 1);
  const handlePageClick = (pageNumber: number) =>
    pageNumber !== currentPage && onPageChange(pageNumber);

  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(
      currentPage - Math.floor(maxPageNumbersToShow / 2),
      1
    );
    let endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);

    if (endPage - startPage < maxPageNumbersToShow - 1) {
      startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  if (totalItems <= itemsPerPage) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        my: 3
      }}>
      {/* Affiche le nombre total d'items */}
      <Typography
        variant="body2"
        sx={{
          mb: 1,
          fontSize: "1rem",
          fontWeight: "bold",
          color: isDarkMode
            ? theme.palette.primary.contrastText
            : theme.palette.text.primary,
          backgroundColor: isDarkMode
            ? "rgba(0, 0, 0, 0.5)"
            : "rgba(255, 255, 255, 0.7)",
          padding: "4px 8px",
          borderRadius: "4px"
        }}>
        Total: {totalItems} produits
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          backgroundColor: isDarkMode
            ? "rgba(0, 0, 0, 0.5)"
            : "rgba(255, 255, 255, 0.7)",
          padding: "8px 12px",
          borderRadius: "8px"
        }}>
        {showFirstLastButtons && !isSmallScreen && (
          <IconButton
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            aria-label="Première page"
            sx={{
              color:
                currentPage === 1
                  ? theme.palette.action.disabled
                  : theme.palette.primary.main
            }}>
            <FirstPageIcon />
          </IconButton>
        )}

        <IconButton
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Page précédente"
          sx={{
            color:
              currentPage === 1
                ? theme.palette.action.disabled
                : theme.palette.primary.main
          }}>
          <ArrowBackIcon />
        </IconButton>

        {isSmallScreen ? (
          <Typography
            variant="body2"
            sx={{
              mx: 1,
              fontSize: "1rem",
              color: isDarkMode
                ? theme.palette.primary.contrastText
                : theme.palette.text.primary
            }}>
            Page {currentPage} / {totalPages}
          </Typography>
        ) : (
          pageNumbers.map(pageNumber => (
            <Button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              variant={pageNumber === currentPage ? "contained" : "text"}
              color="primary"
              sx={{
                minWidth: "50px",
                mx: 0.3,
                backgroundColor:
                  pageNumber === currentPage
                    ? theme.palette.primary.main
                    : "transparent",
                color:
                  pageNumber === currentPage
                    ? theme.palette.primary.contrastText
                    : isDarkMode
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                "&:hover": {
                  backgroundColor:
                    pageNumber === currentPage
                      ? theme.palette.primary.dark
                      : theme.palette.action.hover
                },
                fontWeight: pageNumber === currentPage ? "bold" : "normal"
              }}>
              {pageNumber}
            </Button>
          ))
        )}

        <IconButton
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Page suivante"
          sx={{
            color:
              currentPage === totalPages
                ? theme.palette.action.disabled
                : theme.palette.primary.main
          }}>
          <ArrowForwardIcon />
        </IconButton>

        {showFirstLastButtons && !isSmallScreen && (
          <IconButton
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Dernière page"
            sx={{
              color:
                currentPage === totalPages
                  ? theme.palette.action.disabled
                  : theme.palette.primary.main
            }}>
            <LastPageIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Pagination;
