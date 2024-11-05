// Définition de la réponse de l'API
export interface ProductsApiResponse {
  products: Product[];
  totalItems: number;
  totalPages: number;
}

// Interface principale du produit
export interface Product {
  // Propriétés en lecture seule
  id: number;
  permalink: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  price_html: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  backorders_allowed: boolean;
  backordered: boolean;
  shipping_required: boolean;
  shipping_taxable: boolean;
  average_rating: string;
  rating_count: number;
  parent_id: number;
  _links: Links;

  // Propriétés modifiables communes à tous les types de produits
  name: string;
  slug: string;
  status: "draft" | "pending" | "private" | "publish";
  featured: boolean;
  catalog_visibility: "visible" | "catalog" | "search" | "hidden";
  description: string;
  short_description: string;
  sku: string;
  price: string;
  images: Image[];
  categories: Category[];
  tags: Tag[];
  attributes: Attribute[];
  meta_data: MetaData[];

  // Propriétés spécifiques aux types de produits
  type: "simple" | "grouped" | "external" | "variable";
  regular_price?: string;
  sale_price?: string;
  date_on_sale_from?: string | null;
  date_on_sale_to?: string | null;
  virtual?: boolean;
  downloadable?: boolean;
  downloads?: Download[];
  download_limit?: number;
  download_expiry?: number;
  external_url?: string;
  button_text?: string;
  tax_status?: "taxable" | "shipping" | "none";
  tax_class?: string;
  manage_stock?: boolean;
  stock_quantity?: number | null;
  stock_status?: "instock" | "outofstock" | "onbackorder";
  backorders?: "no" | "notify" | "yes";
  sold_individually?: boolean;
  weight?: string;
  dimensions?: Dimensions;
  shipping_class?: string;
  shipping_class_id?: number;
  reviews_allowed?: boolean;
  related_ids?: number[];
  upsell_ids?: number[];
  cross_sell_ids?: number[];
  purchase_note?: string;
  default_attributes?: DefaultAttribute[];
  variations?: number[];
  grouped_products?: number[];
  menu_order?: number;
}

// Interfaces complémentaires

export interface Download {
  id: string;
  name: string;
  file: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Image {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  src: string;
  name: string;
  alt: string;
}

export interface Attribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface DefaultAttribute {
  id: number;
  name: string;
  option: string;
}

export interface MetaData {
  id: number;
  key: string;
  value: any;
}

export interface Links {
  self: Link[];
  collection: Link[];
}

export interface Link {
  href: string;
}

export interface Dimensions {
  length: string;
  width: string;
  height: string;
}
