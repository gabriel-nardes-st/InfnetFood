import {PRODUCTS} from '../data/produtos';

export const getProductsByCategory = (categoryId) => {
  return PRODUCTS.filter(p => p.categoryId === categoryId);
}
