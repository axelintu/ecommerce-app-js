import products from "../data/products";

export const fetchProducts = async () => {
  return new Promise((resolve)=>{
    setTimeout(() => {
      resolve(products);
    }, 1000);
  })
};

export async function getProductById(id) {
  await new Promise((res) => setTimeout(res, 300));
  const products = await fetchProducts();
  return products.find((p) => p._id === id);
}