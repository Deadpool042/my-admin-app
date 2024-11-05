import { Box, Typography } from "@mui/material";
import { useGetProductByIdQuery } from "api/redux/products/productsApi";
import React from "react";
import { useParams } from "react-router-dom";
import Loading from "components/Loading"; // Assumez que vous avez un composant de chargement

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const productId = id ? parseInt(id, 10) : 0; // Gérer le cas où id est undefined

  const {
    data: product,
    error,
    isLoading
  } = useGetProductByIdQuery(productId, {
    skip: !id // Ignore la requête si id est undefined
  });

  if (isLoading) return <Loading message="Chargement du produit..." />;

  if (error) {
    return (
      <Typography color="error">
        Erreur lors du chargement du produit.
      </Typography>
    );
  }

  if (!product) {
    return <Typography color="textSecondary">Produit introuvable.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4">{product.name}</Typography>
      <Typography
        variant="body1"
        paragraph>
        {product.description}
      </Typography>
      <Typography variant="h6">Prix : {product.price}€</Typography>
    </Box>
  );
};

export default ProductDetail;
