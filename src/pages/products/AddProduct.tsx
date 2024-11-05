import React, { useState } from "react";
import { Box, Button, Typography, Tabs, Tab, Paper } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import ProductImages from "components/addProduct/ProductImages";
import ProductData from "components/addProduct/ProductData";
import ProductCategoriesTags from "components/addProduct/ProductCategoriesTags";
import ProductPublicationSettings from "components/addProduct/ProductPublicationSettings";
import ProductGeneralInfo from "components/addProduct/ProductGeneraIInfo";
import { useProductContext } from "./useProductContext";

const AddProduct: React.FC = () => {
  const { saveProduct } = useProductContext();
  const [tabIndex, setTabIndex] = useState("1");
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Logique pour soumettre les données du produit
    saveProduct();
  };

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom>
        Ajouter un Nouveau Produit
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: 1
        }}>
        <TabContext value={tabIndex}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="tabs">
            <Tab
              label="Informations Générales"
              value="1"
            />
            <Tab
              label="Images du produit"
              value="2"
            />
            <Tab
              label="Données du produit"
              value="3"
            />
            <Tab
              label="Catégories et étiquettes"
              value="4"
            />
            <Tab
              label="Paramètres de publication"
              value="5"
            />
          </Tabs>
          <form onSubmit={handleSubmit}>
            <TabPanel
              value="1"
              sx={{
                p: 1
              }}>
              <ProductGeneralInfo />
            </TabPanel>
            <TabPanel
              value="2"
              sx={{
                p: 1
              }}>
              <ProductImages />
            </TabPanel>
            <TabPanel
              value="3"
              sx={{
                p: 1
              }}>
              <ProductData />
            </TabPanel>
            <TabPanel
              value="4"
              sx={{
                p: 1
              }}>
              <ProductCategoriesTags />
            </TabPanel>
            <TabPanel
              value="5"
              sx={{
                p: 1
              }}>
              <ProductPublicationSettings />
            </TabPanel>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
                gap: 2
              }}>
              <Button
                type="submit"
                variant="contained"
                color="primary">
                Enregistrer le Produit
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary">
                Annuler
              </Button>
            </Box>
          </form>
        </TabContext>
      </Paper>
    </Box>
  );
};

export default AddProduct;
