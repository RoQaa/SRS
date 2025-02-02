import { IProduct } from "@/interfaces/Products.interface";

// Utility function to get the category name by id
export const getCategoryNameById = (
  categoryId: string,
  products: IProduct[],
  locale: string
) => {
  const product = products.find((p) => p._id === categoryId);
  return product
    ? locale === "en"
      ? product.name
      : product.name_ar
    : "";
};