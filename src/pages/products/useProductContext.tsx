import React, { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "types/products/wc_product";

interface ProductContextType {
  productData: Partial<Product>;
  setProductData: React.Dispatch<React.SetStateAction<Partial<Product>>>;
  saveProduct: () => void;
}

// Définissez les props pour ProductProvider, incluant `children`
interface ProductProviderProps {
  children: ReactNode;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children
}) => {
  const [productData, setProductData] = useState<Partial<Product>>({});
  console.log("Product Data", productData);

  // Fonction pour envoyer les données du produit à l'API
  const saveProduct = async () => {
    try {
      // Optionnel : vider le contexte ou notifier l'utilisateur du succès
      // setProductData({});
      console.log("Product Data apres validation", productData);
      alert("Produit sauvegardé avec succès !");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la sauvegarde du produit.");
    }
  };

  return (
    <ProductContext.Provider
      value={{ productData, setProductData, saveProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
