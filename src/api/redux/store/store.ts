// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../products/productsApi";
import { categoriesProductsApi } from "../products/categoriesProductsApi";

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesProductsApi.reducerPath]: categoriesProductsApi.reducer
    // Ajoutez d'autres reducers ici si nécessaire
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(categoriesProductsApi.middleware)
});

export default store;
