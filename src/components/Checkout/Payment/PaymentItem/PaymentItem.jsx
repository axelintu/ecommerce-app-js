import Button from '../../../common/Button';
import './PaymentItem.css';
import '../../shared/checkoutListItems.css';

function PaymentItem({
  paymentMethod,
  isDefault,
  onSelect,
  onEdit,
  onDelete 
}) {
  return (
    <div className={`checkout-list-item ${isDefault ? "default" : ""}`}>
      <div className="checkout-list-item-content">
        <h4>{paymentMethod.alias}</h4>
        <p>{paymentMethod.cardHolderName}</p>
        <p>{paymentMethod.type}</p>
        <p>{paymentMethod.expiryDate}</p>
        {isDefault && <div className="default-badge">Predeterminado</div>}
      </div>
      <div className="checkout-list-item-actions">
        {!isDefault && 
        <Button 
        onClick={() => { if (!isDefault) onSelect(paymentMethod)}}
        disabled={isDefault}
        >
          {isDefault ? "Seleccionada" : "Seleccionar"}
        </Button>
        }
        <Button variant="secondary" onClick={() => onEdit(paymentMethod)}>
          Editar
        </Button>
        <Button variant="danger" onClick={() => onDelete(paymentMethod)}>
          Eliminar
        </Button>
      </div>
    </div>
  );
}
export default PaymentItem;