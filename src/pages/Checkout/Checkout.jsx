import { useEffect, useState } from 'react';
import CartView from '../../components/Cart/CartView/CartView';
import { getShippingAddresses, getDefaultshippingAddress } from '../../services/shippingService';
import { getPaymentMethods, getDefaultPaymentMethods } from '../../services/paymentService';
import ErrorMessage from '../../components/common/ErrorMessage'; 
import AddressList from '../../components/Checkout/Address/AddressList';
import AddressForm from '../../components/Checkout/Address/AddressForm';
import PaymentForm from '../../components/Checkout/Payment/PaymentForm';
import PaymentList from '../../components/Checkout/Payment/PaymentList';
import SummarySection from '../../components/Checkout/shared/SummarySection';
import Loading from '../../components/common/Loading/Loading';
import './Checkout.css';
import Button from '../../components/common/Button';
import { CartProvider, useCart } from '../../context/CartContext';

function Checkout() {
  const cartItems = useCart();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isAddressExpanded, setIsAddressExpanded] = useState(false);
  const [showAddressForm, setShowAddressForm] =useState(false);
  const [isAddressEdit, setIsAddressEdit] = useState(false);
  const [addressBeingEdited, setAddressBeingEdited] = useState(null);
  
  const [isPaymentMethodEdit, setIsPaymentMethodEdit] = useState(false);
  const [paymentMethodBeingEdited, setPaymentMethodBeingEdited] = useState(null);

  const [isPaymentExpanded, setIsPaymentExpanded] = useState(false);


  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const [
        addrList, 
        defaultAdd, 
        payList, 
        defaultPay
      ] = await Promise.all([
          getShippingAddresses(),
          getDefaultshippingAddress(),
          getPaymentMethods(),
          getDefaultPaymentMethods()
      ]);

      setAddresses(addrList || []);

      const normalizedPayments = (payList || []).map((p) => ({
        id: p._id || Date.now().toString(),
        alias: p.alias || `Tarjeta ****${(p.cardNumber || "").slice(-4)}`,
        cardNumber: p.cardNumber || "",
        placeHolder: p.placeHolder || "",
        expiryDate: p.expiryDate || "",
        isDefault: p.isDefault || false,
      }));
      setPayments(normalizedPayments || []);
      setSelectedAddress(defaultAdd);
      setSelectedPayment(defaultPay);
    } catch (error) {
      setError('No se pudieron cargar las direcciones o métodos de pago');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    let mounted = true;
    if (mounted) loadData();
    return ()=> {mounted = false}
  },[])
  
  const handleAddressToggle = () => {
    setShowAddressForm(false);
    setAddressBeingEdited(null);
    setIsAddressExpanded((prev)=> !prev)
  }
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setShowAddressForm(false);
    setAddressBeingEdited(null);
    setIsAddressExpanded(false);
  }
  const handleAddressNew = () => {
    setShowAddressForm(true);
    setAddressBeingEdited(null);
    setIsAddressExpanded(true);
  }
  const handleAddressSubmit = (formData) => {
    let item = null;
    let updatedItems = [];
    if (addressBeingEdited) {
      item = {formData}
      updatedItems = addresses.map((address)=>{
        if(address._id === item._id) {
          address = item;
        }
      })
    }
    else {
      item = { "_id" : new Date(), ... formData }
      updatedItems =[...addresses, item]
    }
    setAddresses(updatedItems);
  };
  const handleAddressEdit = (address) => { 
    setShowAddressForm(true);
    setAddressBeingEdited(address);
    setIsAddressExpanded(true);
  };
  const handleAddredDelete = (address) => {
    let updatedAddresses = addresses.filter((add)=> add._id !== address._id);
    if(selectedAddress._id===addresses._id && updatedAddresses.length > 0) {
      selectedAddress(updatedAddresses[0])
    } else {
      setSelectedAddress(null);
    }
    setAddresses(updatedAddresses);
  }
  const handleCancelForm = () => {

  }
  const handlePaymentSubmit = (formData) => {console.log(formData) };

  const handlePaymentEdit = (payment) => { 
    setPaymentMethodBeingEdited(payment);
    console.log(payment) 
  };

  const handleCreateOrder = () => {

  }

  return (
    loading 
    ? (<div className="checkout-loading">
      <Loading><p>Cargando direcciones y métodos de pago</p></Loading>
    </div> )
    : error 
      ? (<ErrorMessage>{error}</ErrorMessage>)
      : (<div className='checkout-container'>
          <div className="checkout-left">
            <SummarySection 
              title="1. Dirección de envio" 
              selected={selectedAddress} 
              summaryContent={
                <div className='selected-address'>
                  <p>{selectedAddress?.name}</p>
                  <p>{selectedAddress?.address1}</p>
                  <p>{selectedAddress?.city}, {selectedAddress?.postalCode}</p>
                </div>}
              isExpanded={isAddressExpanded || showAddressForm || !selectedAddress}
              onToggle={handleAddressToggle}>
                {
                !showAddressForm && !addressBeingEdited ? 
                (<AddressList
                  addresses={addresses}
                  selectedAddress={selectedAddress}
                  onSelect={(address)=> {handleAddressSelect(address)}}
                  onEdit={(address)=> { handleAddressEdit(address);}}
                  onDelete={(address) => {handleAddredDelete(address)}}
                  onAdd={handleAddressNew} >
                </AddressList> )
                : (
                  <AddressForm
                    onSubmit={handleAddressSubmit}
                    onCancel={handleCancelForm}
                    initialValues={addressBeingEdited || {}}
                    isEdit={!!addressBeingEdited}>
                  </AddressForm>
                  )
                }
              
            </SummarySection>

            

            <SummarySection 
              title="2. Método de pago" 
              selected={selectedPayment} 
              summaryContent={
                <div className='selected-payment'>
                  <p>{selectedPayment?.alias}</p>
                  <p>{selectedPayment?.cardHolderName}</p>
                  <p>{selectedPayment?.expiryDate}</p>
                </div>}
              isExpanded={isPaymentExpanded}
              onToggle={()=> {
                console.log(`Expand ${JSON.stringify(selectedPayment)}`);
                setIsPaymentExpanded(true);
              }}>
                <PaymentList
                  paymentMethods={payments}
                  selectedMethod={selectedPayment}
                  onSelect={(method) => {
                    setSelectedPayment(method);
                  }}
                  onEdit={handlePaymentEdit}
                  onAdd={() => console.log("Add payment method")} >
                </PaymentList>
                { isPaymentMethodEdit && paymentMethodBeingEdited && (
                  <div>IS BEING EDITED</div>
                ) }
                <PaymentForm
                  onSubmit={handlePaymentEdit}
                  initialValues={null}
                  isEdit={false} >
                </PaymentForm>
            </SummarySection>



            <SummarySection 
              title="3. Revisa tu pedido"
              selected={true} 
              isExpanded={true}
            >
              <CartView></CartView>
            </SummarySection>
          </div>
          <div className="checkout-right">
            <div className="checkout-summary">
              <h3>Resumen de la orden</h3>
              <div className="summary-details">
                <p>
                  <strong>Dirección de envío: </strong>{selectedAddress?.name}
                </p>
                <p>
                  <strong>Método de pago: </strong>{selectedPayment?.alias}
                </p>
                <div className="order-costs">
                  <p><strong>Subtotal: </strong>$0.00</p>
                  <p><strong>IVA (16%): </strong>$0.00</p>
                  <p><strong>Envío: </strong>$0.00</p>
                  <p><strong>Total: </strong>$0.00</p>
                  <p><strong>Fecha estimada de entrega: </strong>{new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                </div>
                <Button className="play-button"
                disabled={!selectedAddress||selectedPayment||cartItems|| cartItems === 0}
                onClick={handleCreateOrder}
                >
                  {
                  !cartItems || cartItems.length === 0 
                  ? 'No hay productos en el carrito'
                  : selectedAddress
                    ? 'Selecciona una dirección de envío'
                    : !selectedPayment 
                      ? 'Selecciona un método de pago'
                      : 'Confirmar y realizar pago'
                }
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    );
}

export default Checkout;
