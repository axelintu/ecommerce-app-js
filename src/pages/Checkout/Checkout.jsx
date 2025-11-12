import { useState } from 'react';
import './Checkout.css';
import CartView from '../../components/Cart/CartView/CartView';
import shippingAddress from '../../data/shippingAddress.json'
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button';
import AddressList from '../../components/Checkout/Address/AddressList';
import AddressForm from '../../components/Checkout/Address/AddressForm';

function Checkout() {
  const [isAddressEdit, setIsAddressEdit] = useState(false);
  const [isPymentMethodEdit, setIsPaymentMethodEdit] = useState(false);

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
          { !isAddressEdit && 
              (<Button onClick={()=>{setIsAddressEdit(true)}}>Cambiar</Button>) }
          <p>
            {shippingAddress.find((a) => a.default === true).name}{" "}
            {shippingAddress.find((a) => a.default === true).address1}
          </p>
          { isAddressEdit 
            ? <>
              <AddressForm />
              <Button onClick={()=>{setIsAddressEdit(false)}}>Guardar</Button>
              </>
            : <>
              <AddressList addresses={shippingAddress}></AddressList>
              </>
          }
        </div>
        <div className="order-payment">
          <p>
            {paymentMethodList.find((p) => p.default === true).alias}
            {paymentMethodList.find((p) => p.default === true).placeHolder}
          </p>
          <Button>Cambiar</Button>
          <div className="payments-list">
            <ul>
              {paymentMethodList.map((payment) => {
                return (
                  <li key={payment.alias}>
                    <h3>{payment.alias}</h3>
                    <p>{payment.placeHolder}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <form className="payment-form">
            <Input label="name" type="text" />
            <Input label="address1" type="text" />
            <Input label="address2" type="text" />
            <Input label="postalCode" type="text" />
            <Input label="city" type="text" />
            <Input label="country" type="text" />
            <Input label="reference" type="text" />
            <label>Guardar como predeterminada: </label>
            <input type="check"></input>
            <Button>Guardar</Button>
          </form>
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

export default Checkout;
