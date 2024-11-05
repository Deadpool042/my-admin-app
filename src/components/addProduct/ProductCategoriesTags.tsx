import React from "react";
import { Box, Typography, Divider, Chip } from "@mui/material";

const ProductCategoriesTags = () => {
  return (
    <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography
        variant="h6"
        gutterBottom>
        Catégories et Étiquettes du Produit
      </Typography>

      {/* Section des Catégories */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Catégories :</Typography>
        <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
          {/* Exemple de catégories */}
          <Chip label="Catégorie 1" />
          <Chip label="Catégorie 2" />
          <Chip label="Catégorie 3" />
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Section des Étiquettes */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Étiquettes :</Typography>
        <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
          {/* Exemple d'étiquettes */}
          <Chip label="Étiquette A" />
          <Chip label="Étiquette B" />
          <Chip label="Étiquette C" />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCategoriesTags;
