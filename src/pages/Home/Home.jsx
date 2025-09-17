import "./Home.css";
import ProductCard from "../../components/ProductCard/ProductCard";

export default function Home ({products}) {
  return (<div className="products-grid">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
  )
}