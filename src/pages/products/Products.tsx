import React, { useState } from "react";
import ProductCard from "./ProductCard";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import ProductTable from "./ProductTable";
import Loading from "components/Loading";
import Pagination from "../../components/Pagination";
import {
  useGetProductsQuery,
  useUpdateProductMutation
} from "api/redux/products/productsApi";
import { Product } from "types/products/wc_product";
import SearchFilters from "./SearchFilters";
import { Link } from "react-router-dom";

const Products: React.FC = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Utilisation du hook RTK Query pour récupérer les produits avec pagination
  const { data, error, isLoading } = useGetProductsQuery({
    page: currentPage,
    per_page: itemsPerPage
  });

  const [totalFilteredProducts, setTotalFilteredProducts] = useState(134); // Par exemple, nombre total initial

  // Gestion des données de produits et pagination
  const products = data?.products || [];
  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 0;

  const [openProductId, setOpenProductId] = useState<number | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [updateProduct] = useUpdateProductMutation();

  const handleSelectProduct = (id: number) => {
    setSelectedProducts(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(productId => productId !== id)
        : [...prevSelected, id]
    );
  };

  const handleToggleOpen = (id: number) => {
    setOpenProductId(prevId => (prevId === id ? null : id));
  };

  const toggleFeaturedStatus = async (product: Product) => {
    try {
      const result = await updateProduct({
        ...product,
        featured: !product.featured
      }).unwrap();

      // Message de confirmation sur l'état "en vedette"
      console.log(
        `Le produit ${result.name} est maintenant ${
          result.featured ? "en vedette" : "non en vedette"
        }`
      );
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de l'état featured :",
        error
      );
    }
  };

  const handleApplyFilters = () => {
    // Logique pour filtrer les produits et mettre à jour le total des produits filtrés
    // setTotalFilteredProducts(nombreDeProduitsFiltrés);
  };
  // Gestion de l'affichage en cas d'erreur de chargement
  if (error) {
    return (
      <Typography color="error">
        Erreur lors du chargement des produits.
      </Typography>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom>
        Gestion des Produits
      </Typography>

      <Box>
        <Button
          component={Link}
          to="/admin/products/add-product"
          variant="contained"
          color="primary">
          Ajouter un produit
        </Button>
      </Box>

      {isLoading ? (
        <Loading message="Chargement des produits..." />
      ) : (
        <>
          <SearchFilters
            totalFilteredProducts={totalFilteredProducts}
            onApplyFilters={handleApplyFilters}
          />

          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />

          {isLargeScreen ? (
            <ProductTable
              products={products}
              selectedProducts={selectedProducts}
              onView={id => console.log("Voir produit", id)}
              onEdit={id => console.log("Modifier produit", id)}
              onDelete={id => console.log("Supprimer produit", id)}
              onSelectProduct={handleSelectProduct}
              onToggleFeatured={toggleFeaturedStatus}
            />
          ) : (
            products.map(product => (
              <ProductCard
                key={product.id}
                selectedProducts={selectedProducts}
                onSelectProduct={handleSelectProduct}
                isOpen={openProductId === product.id}
                onToggleOpen={() => handleToggleOpen(product.id)}
                product={product}
                onView={id => console.log("Voir produit", id)}
                onEdit={id => console.log("Modifier produit", id)}
                onDelete={id => console.log("Supprimer produit", id)}
                onToggleFeatured={toggleFeaturedStatus}
              />
            ))
          )}
        </>
      )}
    </Box>
  );
};

export default Products;
