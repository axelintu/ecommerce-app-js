import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./ProductCard.css"
import Button from "../common/Button";
import Badge from "../common/Badge";

function ProductCard({ product, orientation = "vertical"  }) {
  const { addToCart } = useCart();
  const { name, price, stock, image } = product;

  if (!product) {
    return (
      <div
        className="product-card"
        style={{ padding: "24px", textAlign: "center" }}
      >
        <p className="muted">Producto no disponible</p>
      </div>
    );
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  }

  const productLink = `/product/${product._id}`;
  const cardClass = `product-card product-card--${orientation}`;

  return (
    <div className={cardClass}>
      <Link to={productLink} className="product-card-image-link">
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <div className="price">${price}</div>
        <Badge
          text={stock > 0 ? "En stock" : "Agotado"}
          variant={stock > 0 ? "success" : "error"}
        />
        <Button
          variant="primary"
          disabled={stock === 0}
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </Button>
      </Link>
    </div>
  );
}
export default ProductCard;