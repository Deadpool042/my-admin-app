import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Tooltip,
  Fade,
  Collapse,
  useTheme,
  useMediaQuery
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useProductContext } from "pages/products/useProductContext";

const InventoryFields: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(1024));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between(1024, 1600));
  const { productData, setProductData } = useProductContext();

  const [sku, setSku] = useState(productData.sku || "");
  const [manageStock, setManageStock] = useState(
    productData.manage_stock || false
  );
  const [stockQuantity, setStockQuantity] = useState<string>(
    productData.stock_quantity?.toString() || ""
  );
  const [stockStatus, setStockStatus] = useState<
    "instock" | "outofstock" | "onbackorder"
  >(productData.stock_status || "instock");
  const [backorderStatus, setBackorderStatus] = useState<
    "no" | "notify" | "yes"
  >(productData.backorders || "no");

  const [lowStockThreshold, setLowStockThreshold] = useState("");
  const [soldIndividually, setSoldIndividually] = useState(
    productData.sold_individually || false
  );

  useEffect(() => {
    setProductData(prevData => ({
      ...prevData,
      sku,
      manage_stock: manageStock,
      stock_quantity: stockQuantity ? parseInt(stockQuantity, 10) : null,
      stock_status: stockStatus,
      backorders: backorderStatus,
      sold_individually: soldIndividually
    }));
  }, [
    sku,
    manageStock,
    stockQuantity,
    stockStatus,
    backorderStatus,
    soldIndividually,
    setProductData
  ]);

  return (
    <Fade
      in
      timeout={800}
      unmountOnExit
      mountOnEnter>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: isSmallScreen ? "100%" : isMediumScreen ? "60%" : "40%"
        }}>
        <Box sx={{ display: "flex" }}>
          <TextField
            label="UGS"
            fullWidth
            value={sku}
            onChange={e => setSku(e.target.value)}
          />
          <Tooltip title="Identifiant unique pour le produit.">
            <InfoIcon
              fontSize="small"
              color="action"
              sx={{ ml: 1 }}
            />
          </Tooltip>
        </Box>

        <Fade
          in={productData.type !== "grouped" && productData.type !== "external"}
          unmountOnExit
          mountOnEnter
          timeout={500}>
          <FormControlLabel
            control={
              <Checkbox
                checked={manageStock}
                onChange={e => setManageStock(e.target.checked)}
              />
            }
            label="Suivre la quantité en stock pour ce produit"
          />
        </Fade>

        <Collapse
          in={manageStock}
          timeout={800}
          mountOnEnter
          unmountOnExit>
          <Box sx={{ display: "flex" }}>
            <TextField
              type="number"
              label="Quantité"
              fullWidth
              value={stockQuantity}
              onChange={e => setStockQuantity(e.target.value)}
            />
            <Tooltip title="Quantité en stock pour ce produit.">
              <InfoIcon
                fontSize="small"
                color="action"
                sx={{ ml: 1 }}
              />
            </Tooltip>
          </Box>
        </Collapse>

        <Collapse
          in={
            !manageStock &&
            productData.type !== "grouped" &&
            productData.type !== "variable" &&
            productData.type !== "external"
          }
          timeout={800}
          mountOnEnter
          unmountOnExit>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ display: "flex", alignItems: "center" }}>
              État du stock
              <Tooltip title="Définit le statut de disponibilité du produit.">
                <InfoIcon
                  fontSize="small"
                  color="action"
                  sx={{ ml: 1 }}
                />
              </Tooltip>
            </Typography>
            <RadioGroup
              value={stockStatus}
              onChange={e =>
                setStockStatus(
                  e.target.value as "instock" | "outofstock" | "onbackorder"
                )
              }>
              <FormControlLabel
                value="instock"
                control={<Radio />}
                label="En stock"
              />
              <FormControlLabel
                value="outofstock"
                control={<Radio />}
                label="Rupture de stock"
              />
              <FormControlLabel
                value="onbackorder"
                control={<Radio />}
                label="En réapprovisionnement"
              />
            </RadioGroup>
          </Box>
        </Collapse>

        <Collapse
          in={manageStock}
          timeout={800}
          mountOnEnter
          unmountOnExit>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ display: "flex", alignItems: "center" }}>
              Autoriser les commandes en réapprovisionnement ?
              <Tooltip title="Permet de définir si les commandes sont autorisées en cas de rupture de stock.">
                <InfoIcon
                  fontSize="small"
                  color="action"
                  sx={{ ml: 1 }}
                />
              </Tooltip>
            </Typography>
            <RadioGroup
              value={backorderStatus}
              onChange={e =>
                setBackorderStatus(e.target.value as "no" | "yes" | "notify")
              }>
              <FormControlLabel
                value="no"
                control={<Radio />}
                label="Ne pas autoriser"
              />
              <FormControlLabel
                value="notify"
                control={<Radio />}
                label="Autoriser, mais avec notification client"
              />
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label="Autoriser"
              />
            </RadioGroup>
          </Box>
        </Collapse>

        {manageStock && (
          <Box sx={{ display: "flex" }}>
            <TextField
              type="number"
              label="Seuil de stock faible"
              fullWidth
              value={lowStockThreshold}
              onChange={e => setLowStockThreshold(e.target.value)}
              placeholder="Seuil à l'échelle de la boutique"
            />
            <Tooltip title="Définit le seuil à partir duquel le stock est considéré comme faible.">
              <InfoIcon
                fontSize="small"
                color="action"
                sx={{ ml: 1 }}
              />
            </Tooltip>
          </Box>
        )}
        <Fade
          in={productData.type !== "grouped" && productData.type !== "external"}
          mountOnEnter
          unmountOnExit
          timeout={600}>
          <FormControlLabel
            control={
              <Checkbox
                checked={soldIndividually}
                onChange={e => setSoldIndividually(e.target.checked)}
              />
            }
            label="Limiter les achats à 1 article par commande"
          />
        </Fade>
      </Box>
    </Fade>
  );
};

export default InventoryFields;
