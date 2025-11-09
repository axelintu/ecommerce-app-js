import './PurchaseOrder.css';
import CartView from '../../components/Cart/CartView/CartView';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button';

function PurchaseOrder() {
  const addressList = [
    {
      name: "Home",
      address1: "Calle 1",
      address2: "Colonia 1",
      postalCode: "20000",
      city: "Aguascalientes",
      country: "México",
      reference: "Entre calle A y B",
      default: true
    },
    {
      name: "Work",
      address1: "Calle 2",
      address2: "Colonia 2",
      postalCode: "20000",
      city: "Aguascalientes",
      country: "México",
      reference: "Entre calle A y B",
      default: false
    }
  ];
  const paymentMethodList = [
    {
      alias: "Tarjeta1",
      cardNumber: "4444-4444-4444-4444",
      placeHolder: "Rodrigo",
      expireDate: "08/31",
      cvv: "123",
      default: true
    },
    {
      alias: "Tarjeta2",
      cardNumber: "4444-4444-4444-4444",
      placeHolder: "Rodrigo",
      expireDate: "08/31",
      cvv: "123",
      default: false
    }
  ];



  return (
    <div className="order-container">
      <div className="order-left">
        <div className="order-address">
          <p>
            {addressList.find(a => a.default===true).name} 
            {addressList.find(a => a.default===true).address1}
          </p>
          <Button>Cambiar</Button>
          <div className="address-list">
            <ul>
              {
                addressList.map(addss => {
                  return (
                    <li>
                      <h3>{addss.name}</h3>
                      <p> {addss.address1}</p>
                      <p> {addss.address2}</p>
                      <p> {addss.postalCode}</p>
                      <p> {addss.city}</p>
                      <p> {addss.reference}</p>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <form action="" className="address-form">
            <label><div>Nombre:    </div><Input label="{newName}" type="text">{}</Input></label>
            <label><div>Dirección: </div><Input label="{newAddress}" type="text"></Input></label>
            <label><div>Teléfono:  </div><Input label="{newPhone}" type="text"></Input></label>
            <Button>Guardar</Button>
          </form>
        </div>
        <div className="order-payment">

        </div>
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
