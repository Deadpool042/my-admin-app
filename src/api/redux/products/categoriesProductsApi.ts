// src/api/redux/products/categoriesProductsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_url } from "api/config";

// Définition de l'interface pour une catégorie
export interface Category {
  id: number;
  name: string;
  parent: number;
  count: number;
  display: string;
  children?: Category[]; // pour la hiérarchie
}

// Interface pour les options de requête
interface FetchCategoriesParams {
  hide_empty?: boolean;
  per_page?: number;
}

// Création de l'API pour les catégories de produits
export const categoriesProductsApi = createApi({
  reducerPath: "categoriesProductsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api_url,
    credentials: "include"
  }),
  tagTypes: ["ProductCategories"],
  endpoints: builder => ({
    fetchCategories: builder.query<Category[], FetchCategoriesParams>({
      query: ({ hide_empty = false, per_page = 100 }) => ({
        url: "/routes/productsCategories.php",
        params: { hide_empty, per_page }
      }),
      transformResponse: (response: Category[]) => {
        // console.log("Réponse brute de l'API des catégories :", response);

        // // Organiser les catégories en hiérarchie
        // const categoriesMap: { [key: number]: Category } = {};
        // response.forEach(category => {
        //   category.children = [];
        //   categoriesMap[category.id] = category;
        // });

        // // Construire la hiérarchie
        // const hierarchicalCategories: Category[] = [];
        // Object.values(categoriesMap).forEach(category => {
        //   if (category.parent === 0) {
        //     hierarchicalCategories.push(category);
        //   } else if (categoriesMap[category.parent]) {
        //     categoriesMap[category.parent].children?.push(category);
        //   }
        // });

        // console.log(
        //   "Catégories organisées en hiérarchie :",
        //   hierarchicalCategories
        // );
        return response;
      }
    })
  })
});

// Export des hooks générés par Redux Toolkit Query
export const { useFetchCategoriesQuery } = categoriesProductsApi;
