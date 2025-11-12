import './Cart.css';
import Button from '../../components/common/Button';
import Icon from '../../components/common/Icon'
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import CartView from '../../components/Cart/CartView/CartView';

function Cart() {
  const {
    cartItems,
    clearCart,
    getTotalItems,
    getTotalPrice
  } = useCart();

  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="cart container cart-empty">
        <Icon name="cart" size={100}></Icon>
        <h2>Tu carrito está vacío</h2>
        <p>Agrega algunos productos para empezar a comprar</p>
        <Button to="/" variant="primary">
          Continuar comprando
        </Button>
      </div>
    );
  }

  return (
    <div className="cart container">
      <div className="cart-header">
        <Icon name="cart" size={50}></Icon>
        <h2>Carrito de Compras</h2>
        <span>{`Tu carrito tiene ${getTotalItems()} articulo(s)`}</span>{" "}
        <Button 
          variant="primary" 
          size="sm" 
          onClick={clearCart}
        >
          Limpiar Carrito
        </Button>
      </div>
      <CartView />
      <div className="cart-summary">
        <div className="cart-total">
          <h2>Total: ${getTotalPrice().toFixed(2)}</h2>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate("/checkout")}
          size="md"
        >
          Proceder al pago
        </Button>
      </div>
    </div>
  );
}

export default Cart;
