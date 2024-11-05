import React from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Typography,
  SelectChangeEvent,
  useTheme,
  useMediaQuery
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useProductContext } from "pages/products/useProductContext";

const ShippingFields: React.FC = () => {
  const { productData, setProductData } = useProductContext();
  const theme = useTheme();

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const weight = event.target.value;
    setProductData(prevData => ({ ...prevData, weight }));
  };

  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const length = event.target.value;
    setProductData(prevData => ({
      ...prevData,
      dimensions: {
        length,
        width: prevData.dimensions?.width || "",
        height: prevData.dimensions?.height || ""
      }
    }));
  };

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const width = event.target.value;
    setProductData(prevData => ({
      ...prevData,
      dimensions: {
        length: prevData.dimensions?.length || "",
        width,
        height: prevData.dimensions?.height || ""
      }
    }));
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const height = event.target.value;
    setProductData(prevData => ({
      ...prevData,
      dimensions: {
        length: prevData.dimensions?.length || "",
        width: prevData.dimensions?.width || "",
        height
      }
    }));
  };

  const handleShippingClassChange = (event: SelectChangeEvent<string>) => {
    const shippingClass = event.target.value;
    setProductData(prevData => ({
      ...prevData,
      shipping_class: shippingClass
    }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 2
      }}>
      {/* Poids */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          label="Poids (kg)"
          value={productData.weight || ""}
          onChange={handleWeightChange}
          fullWidth
          type="number"
        />
        <Tooltip title="Poids du produit en kilogrammes.">
          <InfoIcon
            color="action"
            fontSize="small"
          />
        </Tooltip>
      </Box>

      {/* Dimensions */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          Dimensions (cm)
          <Tooltip title="Dimensions du produit en centimètres.">
            <InfoIcon
              color="action"
              fontSize="small"
            />
          </Tooltip>
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            label="Longueur"
            value={productData.dimensions?.length || ""}
            onChange={handleLengthChange}
            type="number"
            fullWidth
          />
          <TextField
            label="Largeur"
            value={productData.dimensions?.width || ""}
            onChange={handleWidthChange}
            type="number"
            fullWidth
          />
          <TextField
            label="Hauteur"
            value={productData.dimensions?.height || ""}
            onChange={handleHeightChange}
            type="number"
            fullWidth
          />
        </Box>
      </Box>

      {/* Classe d'expédition */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <FormControl fullWidth>
          <InputLabel>Classe d'expédition</InputLabel>
          <Select
            value={productData.shipping_class || "none"}
            onChange={handleShippingClassChange}
            label="Classe d'expédition">
            <MenuItem value="none">Pas de classe d'expédition</MenuItem>
            <MenuItem value="fragile">Fragile</MenuItem>
            <MenuItem value="lourd">Lourd</MenuItem>
            {/* Ajoutez d'autres classes si nécessaire */}
          </Select>
        </FormControl>
        <Tooltip title="Sélectionnez la classe d'expédition appropriée pour ce produit.">
          <InfoIcon
            color="action"
            fontSize="small"
          />
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ShippingFields;
