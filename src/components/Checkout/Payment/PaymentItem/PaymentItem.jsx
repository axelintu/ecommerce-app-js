import Button from '../../../common/Button';
import './PaymentItem.css';

function PaymentItem({paymentMethod, isDefault, onSelect, onEdit}) {
  return (
    <div className={`payment-method-item ${isDefault} ? "default" : ""`}>
          <div className="payment-method-content">
            <h4>{paymentMethod.cardNumber}</h4>
            <p>{paymentMethod.cardHolderName}</p>
            <p>{paymentMethod.type}</p>
            <p>{paymentMethod.expiryDate}</p>
            {isDefault && <span className="default-badge">Predeterminada</span>}
          </div>
          <div className="payment-method-actions">
            <Button onClick={()=> onSelect(paymentMethod)}>
              {isDefault?"Seleccionada":"Seleccionar"}
            </Button>
            <Button variant="secondary" onClick={()=> onEdit(paymentMethod)}>
              Editar
            </Button>
          </div>
        </div>
  );
}

export default PaymentItem;
