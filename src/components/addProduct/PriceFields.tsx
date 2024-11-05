// src/components/PriceFields.tsx
import React, { useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { useProductContext } from "pages/products/useProductContext";

const PriceFields: React.FC = () => {
  const { productData, setProductData } = useProductContext();
  const [regularPrice, setRegularPrice] = React.useState(
    productData.regular_price ?? ""
  );
  const [salePrice, setSalePrice] = React.useState(
    productData.sale_price ?? ""
  );

  // Met à jour le contexte à chaque modification des prix
  useEffect(() => {
    setProductData(prevData => ({
      ...prevData,
      regular_price: regularPrice,
      sale_price: salePrice
    }));
  }, [regularPrice, salePrice, setProductData]);

  return (
    <Box>
      <TextField
        label="Tarif régulier (€)"
        fullWidth
        sx={{ mb: 2 }}
        value={regularPrice}
        onChange={e => setRegularPrice(e.target.value)}
      />
      <TextField
        label="Tarif promo (€)"
        fullWidth
        sx={{ mb: 2 }}
        value={salePrice}
        onChange={e => setSalePrice(e.target.value)}
      />
    </Box>
  );
};

export default PriceFields;
