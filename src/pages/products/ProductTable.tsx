import React from "react";
import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  useTheme
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Product } from "types/products/wc_product";
import { useNavigate } from "react-router-dom";

interface ProductTableProps {
  products: Product[];
  onSelectProduct: (id: number) => void;
  selectedProducts: number[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleFeatured: (product: Product) => void; // Passe l'objet complet ici
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onSelectProduct,
  selectedProducts,
  onToggleFeatured,
  onView,
  onEdit,
  onDelete
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const getStockStatus = (product: Product) => {
    if (product.stock_status === "instock") {
      return {
        text: `En stock${
          product.manage_stock && product.stock_quantity
            ? ` (${product.stock_quantity})`
            : ""
        }`,
        color: theme.palette.success.main
      };
    } else if (product.stock_status === "outofstock") {
      return { text: "Rupture de stock", color: theme.palette.error.main };
    } else if (product.stock_status === "onbackorder") {
      return {
        text: "En réapprovisionnement",
        color: theme.palette.warning.main
      };
    }
    return { text: "Indisponible", color: theme.palette.text.secondary };
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <TableContainer
      component={Box}
      sx={{
        display: { xs: "none", md: "block" },
        mt: 2,
        p: 2,
        borderRadius: "8px",
        boxShadow: theme.shadows[1],
        backgroundColor: theme.palette.background.paper
      }}>
      <Table aria-label="tableau de gestion des produits">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox color="primary" />
            </TableCell>
            <TableCell sx={{ color: theme.palette.primary.main }}>
              Image
            </TableCell>
            <TableCell sx={{ color: theme.palette.primary.main }}>
              Nom
            </TableCell>
            <TableCell sx={{ color: theme.palette.primary.main }}>
              UGS
            </TableCell>
            <TableCell sx={{ color: theme.palette.primary.main }}>
              Stock
            </TableCell>
            <TableCell sx={{ color: theme.palette.primary.main }}>
              Prix
            </TableCell>
            <TableCell sx={{ color: theme.palette.primary.main }}>
              Catégories
            </TableCell>
            <TableCell sx={{ color: theme.palette.primary.main }}>
              Étiquettes
            </TableCell>
            <TableCell
              sx={{ color: theme.palette.primary.main, textAlign: "center" }}>
              En vedette
            </TableCell>
            <TableCell
              sx={{ color: theme.palette.primary.main, width: "150px" }}>
              Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => {
            const stockInfo = getStockStatus(product);
            const isModified =
              product.date_modified &&
              product.date_modified > product.date_created;
            return (
              <TableRow
                key={product.id}
                sx={{
                  backgroundColor:
                    index % 2 === 0
                      ? theme.palette.background.default
                      : theme.palette.background.paper
                }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="secondary"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => onSelectProduct(product.id)}
                  />
                </TableCell>
                <TableCell>
                  <Box
                    component="img"
                    src={
                      product.images[0]?.src ||
                      "/admin/images/default_picture.png"
                    }
                    alt={product.name}
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "5px",
                      objectFit: "cover",
                      border: `1px solid ${theme.palette.divider}`
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.primary,
                      cursor: "pointer",
                      "&:hover": {
                        color: theme.palette.primary.main,
                        textDecoration: "underline"
                      }
                    }}
                    onClick={() => navigate(`/admin/products/${product.id}`)}>
                    {product.name}
                    <Typography
                      component="span"
                      variant="subtitle2"
                      sx={{
                        color:
                          product.status === "private"
                            ? theme.palette.error.main
                            : theme.palette.success.main,
                        fontStyle: "italic",
                        marginLeft: 1
                      }}>
                      ({product.status === "private" ? "Privé" : "Public"})
                    </Typography>
                  </Typography>
                </TableCell>
                <TableCell sx={{ color: theme.palette.text.secondary }}>
                  {product.sku}
                </TableCell>
                <TableCell sx={{ color: stockInfo.color }}>
                  {stockInfo.text}
                </TableCell>
                <TableCell
                  sx={{
                    color: product.sale_price
                      ? theme.palette.error.main
                      : theme.palette.text.primary
                  }}>
                  {product.sale_price ? (
                    <>
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: theme.palette.error.light
                        }}>
                        {product.regular_price
                          ? `${product.regular_price} €`
                          : "-"}
                      </span>{" "}
                      <strong>{product.sale_price} €</strong>
                    </>
                  ) : product.regular_price ? (
                    `${product.regular_price} €`
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell sx={{ color: theme.palette.text.secondary }}>
                  {product.categories.map(cat => cat.name).join(", ")}
                </TableCell>
                <TableCell sx={{ color: theme.palette.text.secondary }}>
                  {product.tags.map(tag => tag.name).join(", ")}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <IconButton onClick={() => onToggleFeatured(product)}>
                    {product.featured ? (
                      <StarIcon color="warning" />
                    ) : (
                      <StarBorderIcon color="action" />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell sx={{ color: theme.palette.text.secondary }}>
                  {isModified
                    ? `Dernière modif. le ${formatDateTime(
                        product.date_modified
                      )}`
                    : `Publié le ${formatDateTime(product.date_created)}`}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
