import Button from '../../../common/Button';
import './PaymentItem.css';
import '../../shared/checkoutListItems.css';

function PaymentItem({paymentMethod, isDefault, onSelect, onEdit}) {
  return (
            <h4>{paymentMethod.cardNumber}</h4>
            <p>{paymentMethod.cardHolderName}</p>
            <p>{paymentMethod.type}</p>
            <p>{paymentMethod.expiryDate}</p>
            {isDefault && <span className="default-badge">Predeterminada</span>}
          </div>
            <Button onClick={()=> onSelect(paymentMethod)}>
              {isDefault?"Seleccionada":"Seleccionar"}
            </Button>
            <Button variant="secondary" onClick={()=> onEdit(paymentMethod)}>
              Editar
            </Button>
          </div>
        </div>
    <div className={`checkout-list-item ${isDefault ? "default" : ""}`}>
      <div className="checkout-list-item-content">
      <div className="checkout-list-item-actions">
  );
}

export default PaymentItem;
