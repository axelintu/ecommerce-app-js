import Button from '../../../common/Button';
import PaymentItem from '../PaymentItem';
import './PaymentList.css';

function PaymentList({
    paymentMethods,
    selectedMethod,
    onSelect,
    onEdit,
    onAdd
  }) {
  return (
    <div className="payment-method-list">
      <div className="payment-method-list-header">
        <h3>Métodos de pago</h3>
        <Button onClick={onAdd}>Agregar Nuevo Método de Pago</Button>
      </div>
      <div className="payment-method-list-content">
        {paymentMethods.map((method) => {
          return (<PaymentItem key={method.id || method.name} paymentMethod={method} isDefault={selectedMethod?.name===method.name} onSelect={onSelect} onEdit={onEdit} />)
        })}
      </div>
    </div>
  );
}

export default PaymentList;
