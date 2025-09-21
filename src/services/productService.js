import products from "../data/products";

export const fetchProducts = async () => {
  return new Promise((resolve)=>{
    setTimeout(() => {
      resolve(products);
    }, 3000);
  })
};