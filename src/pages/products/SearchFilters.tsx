import React from "react";
import {
  Box,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  TextField,
  useMediaQuery,
  ListSubheader,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Typography
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useTheme } from "@mui/material/styles";
import {
  Category,
  useFetchCategoriesQuery
} from "api/redux/products/categoriesProductsApi";
import { StarBorder } from "@mui/icons-material";

interface SearchFiltersProps {
  totalFilteredProducts: number;
  onApplyFilters: (filters: {
    category: string;
    productType: string;
    stockStatus: string;
    productName: string;
  }) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  totalFilteredProducts,
  onApplyFilters
}) => {
  const { data: categories, error, isLoading } = useFetchCategoriesQuery({});
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [category, setCategory] = React.useState("");

  const [productType, setProductType] = React.useState("");
  const [stockStatus, setStockStatus] = React.useState("");
  const [productName, setProductName] = React.useState("");

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleProductTypeChange = (event: SelectChangeEvent) => {
    setProductType(event.target.value);
  };

  const handleStockStatusChange = (event: SelectChangeEvent) => {
    setStockStatus(event.target.value);
  };

  const handleProductNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductName(event.target.value);
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      category,
      productType,
      stockStatus,
      productName
    });
  };

  return <h1>Filtres</h1>;
};

export default SearchFilters;
