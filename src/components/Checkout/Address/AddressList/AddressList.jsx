import AddressItem from '../AddressItem';
import Button from '../../../common/Button';
import './AddressList.css';

function AddressList({
    addresses,
    selectedAddress,
    onSelect,
    onEdit,
    onAdd,
    onDelete
  }) {
  console.log(addresses);
  return (
    <div className="address-list">
      <div className="address-list-header">
        <h3>Direcciones de envío</h3>
        <Button onClick={onAdd}>Agregar Nueva Dirección</Button>
      </div>
      <div className="address-list-content">
        {addresses.map((address) => {
          return (
            <AddressItem
              key={address._id || address.id || address.name}
              address={address}
              isDefault={selectedAddress?.name === address.name}
              onSelect={onSelect}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AddressList;
