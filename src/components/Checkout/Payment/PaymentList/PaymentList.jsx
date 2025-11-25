import Button from '../../../common/Button';
import PaymentItem from '../PaymentItem';
import './PaymentList.css';
import '../../shared/checkoutListItems.css';

function PaymentList({
    paymentMethods,
    selectedMethod,
    onSelect,
    onEdit,
    onAdd,
    onDelete
  }) {
  return (
    <div className="payment-method-list checkout-list">
      <div className="payment-method-list-header checkout-list-header">
        <h3>Métodos de pago</h3>
        <Button onClick={onAdd}>Agregar Nuevo Método de Pago</Button>
      </div>
      { paymentMethods.length > 0 
        ? 
        (
          <div className="payment-method-list-content checkout-list-content">
            {paymentMethods.map((m) => {
              return (
                <PaymentItem
                  key={m._id || m.id || m.name}
                  paymentMethod={m}
                  isDefault={selectedMethod?._id === m._id}
                  onSelect={onSelect}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              )
            })}
          </div>
        )
        : 
        (<p>Comienza agregando un método de pago.</p>)
      }
    </div>
  );
}

export default PaymentList;
