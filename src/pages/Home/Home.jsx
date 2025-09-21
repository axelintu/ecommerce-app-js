import { useEffect, useState } from "react";
import "./Home.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import BannerCarousel from "../../components/BannerCarousel/BannerCarousel";
import homeImages from "../../data/homeImages.json";
import { fetchProducts } from "../../services/productService";
// import products from "../../data/products.json";

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
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            background: "var(--surface)",
            borderRadius: "18px",
            border: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Cargando...
        </div>
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