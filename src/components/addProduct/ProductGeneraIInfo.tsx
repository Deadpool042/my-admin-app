import { Box, TextField, Typography } from "@mui/material";
import { useProductContext } from "pages/products/useProductContext";

const ProductGeneralInfo: React.FC = () => {
  const { productData, setProductData } = useProductContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2, mb: 2 }}>
      <Typography
        variant="h6"
        gutterBottom>
        Informations Générales
      </Typography>
      <TextField
        label="Nom du produit"
        name="name"
        value={productData.name ?? ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Slug"
        name="slug"
        value={productData.slug}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description courte"
        name="shortDescription"
        value={productData.short_description ?? ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={2}
      />
      <TextField
        label="Description longue"
        name="longDescription"
        value={productData.description ?? ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
    </Box>
  );
};

export default ProductGeneralInfo;
