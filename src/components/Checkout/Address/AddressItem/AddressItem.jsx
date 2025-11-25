import Button from '../../../common/Button';
import './AddressItem.css';
import '../../shared/checkoutListItems.css';

function AddressItem({
  address,
  isDefault,
  onSelect,
  onEdit,
  onDelete
}) {
  return (
    <div className={`checkout-list-item ${isDefault ? "default" : ""}`}>
      <div className="checkout-list-item-content">
        <h4>{address.name}</h4>
        <p>{address.address1}</p>
        <p>{address.address2}</p>
        <p>{address.city}, {address.postalCode}</p>
        <p>{address.reference}</p>
        {isDefault && <div className="default-badge">Predeterminada</div>}
      </div>
      <div className="checkout-list-item-actions">
        {!isDefault && <Button 
          onClick={()=> { if (!isDefault) onSelect(address) }} 
          disabled={isDefault}
        >
          {isDefault?"Seleccionada":"Seleccionar"}
        </Button> }
        <Button variant="secondary" onClick={()=> onEdit(address)}>
          Editar
        </Button>
        <Button variant="danger" onClick={() => onDelete(address)}>
          Eliminar
        </Button>
      </div>
    </div>
  );
}
export default AddressItem;