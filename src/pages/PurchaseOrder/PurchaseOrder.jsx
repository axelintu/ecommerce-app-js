import './PurchaseOrder.css';
import CartView from '../../components/Cart/CartView/CartView';
import Button from '../../components/common/Button';

function PurchaseOrder() {
  return (
    <div className="order-container">
      <div className="order-left">
        <div className="order-address">
          <p>{name} {adress}</p>
          <Button>Cambiar</Button>
          <div className="address-list">
            <ul>
              <li>
                <h3>Nombre</h3>
                <p>Dirección</p>
                <p>Telefono</p>
              </li>
            </ul>
          </div>
          <form action="" className="address-form">
            <label><div>Nombre: </div><Input label="{newName}" type="text"></Input></label>
            <label><div>Dirección: </div><Input label="{newAddress}" type="text"></Input></label>
            <label><div>Teléfono: </div><Input label="{newPhone}" type="text"></Input></label>
            <Button>Guardar</Button>
          </form>
        </div>
        <div className="order-payment"></div>
        <CartView />
      </div>
      <div className="order-right">
        <h3>Total: </h3>
        <p>Fecha de entrega: </p>
        <Button>Pagar</Button>
      </div>
    </div>
  )
}

export default PurchaseOrder;
