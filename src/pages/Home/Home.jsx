import { useEffect, useState } from "react";
import "./Home.css";
import ProductCard from "../../components/ProductCard";
import BannerCarousel from "../../components/BannerCarousel";
import homeImages from "../../data/homeImages.json";
import Loader from "../../components/Loader";
import { fetchProducts } from "../../services/productService";

export default function Home () {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const loadProducts = async()=>{
      try{
        setLoading(true);
        const productsData = await fetchProducts();
        setProducts(productsData);
      }catch(error) {
        console.log(error); 
      }finally{
        setLoading(false);
      }
    }
    loadProducts();
  },[]);

  return (
    <main>
      <BannerCarousel banners={homeImages} />
      {loading ? (
        <Loader type="products" loadingMessage={"Cargando productos..."}></Loader>
      ) : products && products.length > 0 ? (
        <div>
          <div className="container home-products">
            <h3>Productos destacados</h3>
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div>No hay productos en el catalogo</div>
      )}
    </main>
  );
}