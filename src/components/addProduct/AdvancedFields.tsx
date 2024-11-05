import React from "react";
import {
  Box,
  TextField,
  Tooltip,
  Checkbox,
  FormControlLabel,
  Fade
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useProductContext } from "pages/products/useProductContext";

const AdvancedFields: React.FC = () => {
  const { productData, setProductData } = useProductContext();

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductData(prevData => ({
      ...prevData,
      purchase_note: event.target.value
    }));
  };

  const handleMenuOrderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductData(prevData => ({
      ...prevData,
      menu_order: parseInt(event.target.value, 10)
    }));
  };

  const handleReviewsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductData(prevData => ({
      ...prevData,
      reviews_allowed: event.target.checked
    }));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Note de commande */}
      <Fade
        in={productData.type !== "grouped" && productData.type !== "external"}
        mountOnEnter
        unmountOnExit
        timeout={800}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            label="Note de commande"
            fullWidth
            multiline
            minRows={3}
            value={productData.purchase_note || ""}
            onChange={handleNoteChange}
            placeholder="Ajouter une note pour la commande"
          />
          <Tooltip title="Note visible par le client lors de la commande.">
            <InfoIcon
              color="action"
              fontSize="small"
            />
          </Tooltip>
        </Box>
      </Fade>

      {/* Ordre du menu */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          label="Ordre du menu"
          type="number"
          fullWidth
          value={productData.menu_order ?? 0}
          onChange={handleMenuOrderChange}
          placeholder="0"
        />
        <Tooltip title="Définit l'ordre d'affichage du produit dans la liste.">
          <InfoIcon
            color="action"
            fontSize="small"
          />
        </Tooltip>
      </Box>

      {/* Activer les avis */}
      <FormControlLabel
        control={
          <Checkbox
            checked={productData.reviews_allowed ?? true}
            onChange={handleReviewsChange}
          />
        }
        label="Activer les avis"
      />
    </Box>
  );
};

export default AdvancedFields;
