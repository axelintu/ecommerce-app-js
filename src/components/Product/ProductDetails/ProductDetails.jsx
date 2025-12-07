import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { getProductById } from "../../../services/productService";
import Button from "../../common/Button";
import ErrorMessage from "../../common/ErrorMessage/ErrorMessage";
import Loading from "../../common/Loading/Loading";
import './ProductDetails.css';
import ProductFeatures from "../ProductFeatures/ProductFeatures";
import ProductNotes from "../ProductNotes/ProductNotes";

export default function ProductDetails({ productId }) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProductById(productId)
      .then((foundProduct) => {
        setProduct(foundProduct);
      })
      .catch(() => setError("Ocurrió un error al cargar el producto,"))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) {
    return <Loading>Cargando Producto...</Loading>;
  }

  if (error) {
    return (
      <ErrorMessage>
        <p>
          Revisa nuestra <Link to="/">página principal</Link> o explora otras
          categorías
        </p>
        <span>{error}</span>
      </ErrorMessage>
    );
  }

  if (!product) return null;

  const { name, description, features, notes, price, stock, image, images, category } = product;
  const stockBadge = stock > 0 ? "success" : "error";
  const stockLabel = stock > 0 ? "En stock" : "Agotado";
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  }  

  return (
    <div className="product-container">
      <nav className="product-navigation">
        <Link to="/">Inicio</Link>
        <Link to={`/category/${category._id}`}>${category.name}</Link>
      </nav>
      <div className="product-details">
        <div className="product-images">
          { images.length > 0
            ? images?.map((img, index) => {
              return <img key={index} src={img} alt={name} />;
              })
            : image ? <img src={image} alt={name} /> : ''
          }
        </div>
        <div className="product-info">
          <h3>{name}</h3>
          <ProductFeatures productClass='description' features={description}></ProductFeatures>
          <ProductFeatures productClass='features' features={features}></ProductFeatures>
          <ProductNotes notes={notes} />
        </div>
        <div className="product-actions">
          <div>
            <span>{price}</span>
            <span className={`${stockBadge}`}>{stockLabel}</span>
          </div>
          <Button onClick={(e) => handleAddToCart(e)}>Agregar al carrito</Button>
          <Link to="/cart">Ver el carrito</Link>
        </div>
      </div>
    </div>
  );
}
