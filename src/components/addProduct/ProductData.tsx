import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  useMediaQuery,
  Collapse,
  FormControlLabel,
  Checkbox,
  SelectChangeEvent,
  Fade,
  Slide
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import InfoIcon from "@mui/icons-material/Info";
import LayersIcon from "@mui/icons-material/Layers";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LinkIcon from "@mui/icons-material/Link";
import TuneIcon from "@mui/icons-material/Tune";
import SettingsIcon from "@mui/icons-material/Settings";
import { useProductContext } from "pages/products/useProductContext";

import InventoryFields from "./ProductInventoryContent";
import ShippingFields from "./ShippingFields";
import LinkedProductsFields from "./LinkedProductsFields";
import AttributesFields from "./AttributesFields";
import AdvancedFields from "./AdvancedFields";
import VariationsFields from "./VariationsFields";
import { Product } from "types/products/wc_product";
import GeneralFields from "./GeneralFields";

const productTabs: Record<Product["type"], string[]> = {
  simple: [
    "Général",
    "Inventaire",
    "Expédition",
    "Produits liés",
    "Attributs",
    "Avancé"
  ],
  grouped: ["Inventaire", "Produits liés", "Attributs", "Avancé"],
  external: ["Général", "Inventaire", "Produits liés", "Attributs", "Avancé"],
  variable: [
    "Inventaire",
    "Expédition",
    "Produits liés",
    "Attributs",
    "Variations",
    "Avancé"
  ]
};

const ProductData: React.FC = () => {
  const { productData, setProductData } = useProductContext();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down(1024));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between(1024, 1600));

  const [tabIndex, setTabIndex] = useState(0);
  const [productType, setProductType] = useState<Product["type"]>(
    productData.type || "simple"
  );

  useEffect(() => {
    if (!productData.type) {
      setProductData(prevData => ({ ...prevData, type: "simple" }));
    }
  }, [productData.type, setProductData]);

  const handleProductTypeChange = (
    event: SelectChangeEvent<Product["type"]>
  ) => {
    const newType = event.target.value as Product["type"];
    setProductType(newType);
    setProductData(prevData => ({
      ...prevData,
      type: newType,
      virtual: false,
      downloadable: false
    }));
    setTabIndex(0); // Reset tab index when product type changes
  };

  const handleToggleVirtual = () => {
    setProductData(prevData => ({
      ...prevData,
      virtual: !prevData.virtual
    }));
  };

  const handleToggleDownloadable = () => {
    setProductData(prevData => ({
      ...prevData,
      downloadable: !prevData.downloadable
    }));
  };

  const currentTabs = productTabs[productType].filter(
    tab => !(tab === "Expédition" && productData.virtual)
  );

  const renderTabContent = () => {
    const tabLabel = currentTabs[tabIndex];

    switch (tabLabel) {
      case "Général":
        return (
          <>
            <Box
              sx={{
                width: "100%"
              }}>
              <GeneralFields />
            </Box>
          </>
        );
      case "Inventaire":
        return (
          <>
            <Box
              sx={{
                width: isSmallScreen ? "100%" : isMediumScreen ? "60%" : "40%"
              }}>
              <InventoryFields />
            </Box>
          </>
        );

      case "Expédition":
        return (
          <>
            <Box
              sx={{
                width: isSmallScreen ? "100%" : isMediumScreen ? "60%" : "40%"
              }}>
              <ShippingFields />
            </Box>
          </>
        );
      case "Produits liés":
        return (
          <>
            <Box
              sx={{
                width: isSmallScreen ? "100%" : isMediumScreen ? "60%" : "40%"
              }}>
              <LinkedProductsFields />
            </Box>
          </>
        );
      case "Attributs":
        return (
          <>
            <Box
              sx={{
                width: isSmallScreen ? "100%" : isMediumScreen ? "60%" : "40%"
              }}>
              <AttributesFields />
            </Box>
          </>
        );

      case "Avancé":
        return (
          <>
            <Box
              sx={{
                width: isSmallScreen ? "100%" : isMediumScreen ? "60%" : "40%"
              }}>
              <AdvancedFields />
            </Box>
          </>
        );
      case "Variations":
        return (
          <>
            <Box
              sx={{
                width: isSmallScreen ? "100%" : isMediumScreen ? "60%" : "40%"
              }}>
              <VariationsFields />
            </Box>
          </>
        );
      default:
        return null;
    }
  };

  const getTabIcon = (tabLabel: string) => {
    switch (tabLabel) {
      case "Général":
        return <InfoIcon />;
      case "Inventaire":
        return <InventoryIcon />;
      case "Expédition":
        return <LocalShippingIcon />;
      case "Produits liés":
        return <LinkIcon />;
      case "Attributs":
        return <TuneIcon />;
      case "Variations":
        return <LayersIcon />;
      case "Avancé":
        return <SettingsIcon />;
      default:
        return undefined;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 2
      }}>
      <FormControl sx={{ mb: 2 }}>
        <InputLabel>Type de produit</InputLabel>
        <Select
          value={productType}
          onChange={handleProductTypeChange}
          label="Type de produit">
          <MenuItem value="simple">Produit simple</MenuItem>
          <MenuItem value="grouped">Produit groupé</MenuItem>
          <MenuItem value="external">Produit externe</MenuItem>
          <MenuItem value="variable">Produit variable</MenuItem>
        </Select>
      </FormControl>

      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row"
        }}>
        <Tabs
          orientation={isSmallScreen ? "horizontal" : "vertical"}
          variant="scrollable"
          scrollButtons="auto"
          value={tabIndex}
          onChange={(event, newValue) => setTabIndex(newValue)}
          sx={{ borderColor: "divider", gap: 1 }}>
          {currentTabs.map((tabLabel, index) => (
            <Tab
              key={index}
              label={isSmallScreen ? "" : tabLabel}
              icon={getTabIcon(tabLabel)}
              iconPosition="start"
              sx={{
                transition:
                  "color 0.3s ease-in-out, background-color 0.3s ease-in-out",
                "&.Mui-selected": {
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.action.hover
                }
              }}
            />
          ))}
        </Tabs>

        <Box sx={{ flexGrow: 1, ml: { sm: 2 } }}>
          {/* Checkbox Virtuel et Téléchargeable */}
          <Slide
            direction="down"
            in={productType === "simple"}
            timeout={500}
            mountOnEnter
            unmountOnExit>
            <Box sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={productData.virtual ?? false}
                    onChange={handleToggleVirtual}
                  />
                }
                label="Virtuel"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={productData.downloadable ?? false}
                    onChange={handleToggleDownloadable}
                  />
                }
                label="Téléchargeable"
              />
            </Box>
          </Slide>

          <Fade
            in={true}
            timeout={800}
            key={tabIndex}>
            <Box sx={{ p: 1 }}>
              <Collapse
                in={true}
                timeout={500}
                mountOnEnter
                unmountOnExit>
                {renderTabContent()}
              </Collapse>
            </Box>
          </Fade>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductData;
