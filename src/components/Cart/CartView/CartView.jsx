import { useCart } from "../../../context/CartContext";
import './CartView.css';

function CartView() {
  return (
    <div className="cart-view">
      <h1>Estos son los productos en tu carrito</h1>
    </div>
  );
}

export default CartView;
