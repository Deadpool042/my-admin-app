import React, { useState } from "react";
import {
  Box,
  Autocomplete,
  TextField,
  Tooltip,
  Typography,
  useTheme,
  useMediaQuery,
  Fade
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useProductContext } from "pages/products/useProductContext";
import { Product } from "types/products/wc_product";

interface ProductOption {
  id: number;
  name: string;
}

const LinkedProductsFields: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(768));
  const { productData, setProductData } = useProductContext();

  const [suggestedProducts, setSuggestedProducts] = useState<ProductOption[]>(
    []
  );
  const [crossSellProducts, setCrossSellProducts] = useState<ProductOption[]>(
    []
  );

  const handleSuggestedProductsChange = (
    event: React.SyntheticEvent,
    value: ProductOption[]
  ) => {
    setSuggestedProducts(value);
    setProductData(prevData => ({
      ...prevData,
      upsell_ids: value.map(product => product.id)
    }));
  };

  const handleCrossSellProductsChange = (
    event: React.SyntheticEvent,
    value: ProductOption[]
  ) => {
    setCrossSellProducts(value);
    setProductData(prevData => ({
      ...prevData,
      cross_sell_ids: value.map(product => product.id)
    }));
  };

  // Exemple de données factices, à remplacer par les données réelles des produits
  const productOptions: ProductOption[] = [
    { id: 1, name: "Produit A" },
    { id: 2, name: "Produit B" },
    { id: 3, name: "Produit C" }
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Produits suggérés */}
      <Box>
        <Typography
          variant="subtitle1"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          Produits suggérés
          <Tooltip title="Produits recommandés affichés avec ce produit.">
            <InfoIcon
              color="action"
              fontSize="small"
            />
          </Tooltip>
        </Typography>
        <Autocomplete
          multiple
          options={productOptions} // Utilisation des options de produits
          getOptionLabel={option => option.name}
          value={suggestedProducts}
          onChange={handleSuggestedProductsChange}
          renderInput={params => (
            <TextField
              {...params}
              placeholder="Recherche d'un produit"
            />
          )}
          fullWidth
          sx={{ mt: 1 }}
        />
      </Box>

      {/* Ventes croisées */}
      <Fade
        in={productData.type !== "external"}
        mountOnEnter
        unmountOnExit
        timeout={500}>
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            Ventes croisées
            <Tooltip title="Produits complémentaires affichés avec ce produit dans le panier.">
              <InfoIcon
                color="action"
                fontSize="small"
              />
            </Tooltip>
          </Typography>
          <Autocomplete
            multiple
            options={productOptions} // Utilisation des options de produits
            getOptionLabel={option => option.name}
            value={crossSellProducts}
            onChange={handleCrossSellProductsChange}
            renderInput={params => (
              <TextField
                {...params}
                placeholder="Recherche d'un produit"
              />
            )}
            fullWidth
            sx={{ mt: 1 }}
          />
        </Box>
      </Fade>
    </Box>
  );
};

export default LinkedProductsFields;
