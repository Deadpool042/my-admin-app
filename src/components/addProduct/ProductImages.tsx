import React from "react";
import { Box, Typography } from "@mui/material";

const ProductImages = () => {
  // Chemin relatif de l'image dans le dossier public
  const mainImageSrc = "/admin/images/default_picture.png";
  const galleryImagesSrc = [
    "/admin/images/default_picture.png",
    "/admin/images/default_picture.png",
    "/admin/images/default_picture.png"
  ];

  return (
    <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography
        variant="h6"
        gutterBottom>
        Images du Produit
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2
        }}>
        {/* <Box
          sx={{
            flex: 1,
            border: "2px dashed #ccc",
            borderRadius: 2,
            p: 2,
            textAlign: "center"
          }}>
          <Typography>
            Zone de dépôt d'images (fonctionnalité à implémenter)
          </Typography>
        </Box> */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1">Image Principale :</Typography>
          <img
            src={mainImageSrc}
            alt="Image Principale"
            style={{ width: "100%", borderRadius: 4 }}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Galerie d'Images :</Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: { xs: "center", sm: "flex-start" }
          }}>
          {galleryImagesSrc.map((src, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: "100%", sm: "calc(33.333% - 16px)" },
                borderRadius: 2,
                overflow: "hidden"
              }}>
              <img
                src={src}
                alt={`Galerie ${index + 1}`}
                style={{ width: "100%", borderRadius: 4 }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductImages;
