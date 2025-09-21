import React from "react";
import "./ProductCard.css"
import Button from "../common/Button";
import Badge from "../common/Badge";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <Badge
        text={product.stock > 0 ? "En stock" : "Agotado"}
        variant={product.stock > 0 ? "success" : "error"}
      />
      <Button
        variant="primary"
        onClick={() => alert(`Agregado: ${product.name}`)}
        disabled={product.stock === 0}
      >
        Agregar al carrito
      </Button>
    </div>
  );
}
export default ProductCard;