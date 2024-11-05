// redux/productsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_url } from "api/config";
import { Product, ProductsApiResponse } from "types/products/wc_product";

// Utilisez une base URL conditionnelle
// Création de dl'API RTK Query pour les produits
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api_url,
    credentials: "include" // Assurez-vous que api_url est correctement configuré dans le fichier de configuration
  }),
  tagTypes: ["Product"], // Déclare un type de tag pour les produits

  endpoints: builder => ({
    // Endpoint pour récupérer la liste des produits avec pagination
    getProducts: builder.query<
      ProductsApiResponse,
      { page: number; per_page: number }
    >({
      query: ({ page, per_page }) => ({
        url: "/routes/products.php",
        params: { page, per_page }
      }),

      // Transforme la réponse pour extraire les produits et la pagination
      transformResponse: (response: Product[], meta) => {
        // console.log("Réponse brute des produits :", response);

        if (!meta?.response) {
          console.error("Les en-têtes de la réponse sont manquants.");
          return { products: response, totalItems: 0, totalPages: 0 };
        }

        const totalItemsHeader = meta.response.headers.get("x-wp-total");
        const totalPagesHeader = meta.response.headers.get("x-wp-totalpages");

        const totalItems = totalItemsHeader
          ? parseInt(totalItemsHeader, 10)
          : 0;
        const totalPages = totalPagesHeader
          ? parseInt(totalPagesHeader, 10)
          : 0;

        return {
          products: response,
          totalItems,
          totalPages
        };
      },
      providesTags: result =>
        result
          ? [
              ...result.products.map(({ id }) => ({
                type: "Product" as const,
                id
              })),
              "Product"
            ]
          : ["Product"] // Assure que tous les produits utilisent ce tag pour le cache
    }),
    // Ajout de getProductById pour récupérer un produit par son ID
    getProductById: builder.query<Product, number>({
      query: id => ({
        url: `/routes/products.php`,
        params: { id }
      }),
      providesTags: (result, error, id) => [{ type: "Product", id }]
    }),

    // Mutation pour mettre à jour un produit spécifique
    updateProduct: builder.mutation<Product, Partial<Product>>({
      query: product => ({
        url: `routes/products.php?id=${product.id}`,
        method: "PUT",
        body: product
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],

      async onQueryStarted(product, { dispatch, queryFulfilled }) {
        // Optimistic update
        const patchResult = dispatch(
          productsApi.util.updateQueryData(
            "getProducts",
            { page: 1, per_page: 10 },
            draft => {
              const updatedProduct = draft.products.find(
                p => p.id === product.id
              );
              if (updatedProduct) {
                updatedProduct.featured = !updatedProduct.featured; // Change l'état localement
              }
            }
          )
        );

        try {
          await queryFulfilled;
          console.log(`Produit ${product.id} mis à jour avec succès`);
        } catch (error) {
          console.error("Erreur lors de la mise à jour du produit :", error);
          patchResult.undo(); // Annule la modification locale si l'API échoue
        }
      }
    })
  })
});

// Exportation des hooks pour utiliser les requêtes dans vos composants
export const {
  useGetProductsQuery,
  useUpdateProductMutation,
  useGetProductByIdQuery
} = productsApi;
