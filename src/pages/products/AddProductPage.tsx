import AddProduct from "./AddProduct";
import { ProductProvider } from "./useProductContext";

const AddProductPage: React.FC = () => (
  <ProductProvider>
    <AddProduct />
  </ProductProvider>
);

export default AddProductPage;
