import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Collapse,
  Table,
  TableBody,
  TableRow,
  TableCell,
  useTheme,
  useMediaQuery,
  Checkbox
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Product } from "types/products/wc_product";
import { useNavigate } from "react-router-dom";

export interface ProductCardProps {
  product: Product;
  isOpen: boolean;
  selectedProducts: number[];
  onToggleOpen: (id: number) => void;
  onToggleFeatured: (product: Product) => void;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onSelectProduct: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isOpen,
  selectedProducts,
  onSelectProduct,
  onToggleFeatured,
  onToggleOpen,
  onView,
  onEdit,
  onDelete
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const {
    id,
    name,
    regular_price,
    sale_price,
    categories,
    tags,
    featured,
    images,
    date_created,
    date_modified,
    sku,
    manage_stock,
    stock_quantity,
    stock_status
  } = product;

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const isModified = date_modified && date_modified > date_created;

  const getStockStatus = () => {
    if (stock_status === "instock") {
      return {
        text: `En stock${
          manage_stock && stock_quantity ? ` (${stock_quantity})` : ""
        }`,
        color: theme.palette.success.main
      };
    } else if (stock_status === "outofstock") {
      return { text: "Rupture de stock", color: theme.palette.error.main };
    } else if (stock_status === "onbackorder") {
      return {
        text: "En réapprovisionnement",
        color: theme.palette.warning.main
      };
    }
    return { text: "Indisponible", color: theme.palette.text.secondary };
  };

  const stockInfo = getStockStatus();

  return (
    <Card
      sx={{
        width: "100%",
        boxShadow: 3,
        mb: 2,
        p: 2,
        position: "relative",
        borderLeft: featured
          ? `5px solid ${theme.palette.primary.main}`
          : undefined,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        "&:hover": { boxShadow: 6, transform: "scale(1.02)" }
      }}>
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: theme.palette.primary.main,
          display: "flex",
          alignItems: "center"
        }}>
        <IconButton
          onClick={() => onToggleFeatured(product)}
          sx={{
            transition: "color 0.3s ease",
            color: product.featured
              ? theme.palette.primary.main
              : theme.palette.text.secondary
          }}>
          {product.featured ? (
            <StarIcon
              fontSize="small"
              color="primary"
            />
          ) : (
            <StarBorderIcon fontSize="small" />
          )}
        </IconButton>

        {featured && (
          <Typography
            sx={{
              ml: 1,
              fontSize: "0.8em",
              fontWeight: "bold",
              opacity: product.featured ? 1 : 0,
              transition: "opacity 0.3s ease"
            }}>
            En Vedette
          </Typography>
        )}
      </Box>

      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          checked={selectedProducts.includes(product.id)}
          onChange={() => onSelectProduct(product.id)}
          color="primary"
          inputProps={{ "aria-label": `select product ${id}` }}
        />
        <Typography
          variant="h6"
          noWrap
          sx={{
            flexGrow: 1,
            color: theme.palette.text.secondary,
            cursor: "pointer",
            "&:hover": {
              color: theme.palette.primary.main,
              textDecoration: "underline"
            }
          }}
          onClick={() => navigate(`/admin/products/${product.id}`)}>
          {name}{" "}
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
        <IconButton
          onClick={() => onToggleOpen(id)}
          aria-label="expand">
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </CardContent>

      <Collapse
        in={isOpen}
        timeout="auto"
        unmountOnExit>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMediumScreen ? "row" : "column",
            gap: 2,
            alignItems: "center",
            justifyContent: isMediumScreen ? "center" : "flex-start",
            height: isMediumScreen ? "auto" : "100%"
          }}>
          <CardMedia
            component="img"
            image={
              images && images.length > 0
                ? images[0].src
                : "/admin/images/default_picture.png"
            }
            alt={name}
            sx={{
              width: isMediumScreen ? "40%" : "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "5px",
              bgcolor: theme.palette.background.default
            }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Table>
              <TableBody>
                {regular_price && (
                  <TableRow>
                    <TableCell
                      variant="head"
                      sx={{ color: theme.palette.primary.dark }}>
                      Prix
                    </TableCell>
                    <TableCell>
                      {sale_price ? (
                        <>
                          <span
                            style={{
                              textDecoration: "line-through",
                              color: theme.palette.error.main
                            }}>
                            {regular_price} €
                          </span>{" "}
                          <strong style={{ color: theme.palette.success.main }}>
                            {sale_price} €
                          </strong>
                        </>
                      ) : (
                        `${regular_price} €`
                      )}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell
                    variant="head"
                    sx={{ color: theme.palette.secondary.main }}>
                    Stock
                  </TableCell>
                  <TableCell sx={{ color: stockInfo.color }}>
                    {stockInfo.text}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    variant="head"
                    sx={{ color: theme.palette.secondary.main }}>
                    Catégories
                  </TableCell>
                  <TableCell>
                    {categories.map(cat => cat.name).join(", ")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    variant="head"
                    sx={{ color: theme.palette.secondary.main }}>
                    Tags
                  </TableCell>
                  <TableCell>{tags.map(tag => tag.name).join(", ")}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    variant="head"
                    sx={{ color: theme.palette.secondary.main }}>
                    SKU
                  </TableCell>
                  <TableCell>{sku}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    variant="head"
                    sx={{ color: theme.palette.info.main }}>
                    {isModified ? "Dernière modification" : "Créé le"}
                  </TableCell>
                  <TableCell>
                    {formatDateTime(isModified ? date_modified : date_created)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            borderTop: `1px solid ${theme.palette.divider}`,
            mt: 2,
            pt: 1
          }}>
          <IconButton
            onClick={() => onView(id)}
            aria-label="voir"
            sx={{ color: theme.palette.primary.main }}>
            <VisibilityIcon />
          </IconButton>
          <IconButton
            onClick={() => onEdit(id)}
            aria-label="modifier"
            sx={{ color: theme.palette.warning.main }}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => onDelete(id)}
            aria-label="corbeille"
            sx={{ color: theme.palette.error.main }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Collapse>
    </Card>
  );
};

export default ProductCard;
