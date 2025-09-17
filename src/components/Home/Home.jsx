import "./Home.css";
import ProductCard from "../ProductCard/ProductCard";

export default function Home ({products}) {
  return (<div className="products-grid">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
  )
}