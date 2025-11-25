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
import { useCart } from '../../context/CartContext';

function Checkout() {
  const cartItems = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Address States
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  
  const [isAddressExpanded, setIsAddressExpanded] = useState(false);
  const [showAddressForm, setShowAddressForm] =useState(false);
  const [addressBeingEdited, setAddressBeingEdited] = useState(null);
  
  // PaymentMethod States
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [isPaymentExpanded, setIsPaymentExpanded] = useState(false);
  const [showPaymentMethodForm, setShowPaymentMethodForm] = useState(false);
  const [paymentMethodBeingEdited, setPaymentMethodBeingEdited] = useState(null);


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
        placeHolder: p.placeHolderName || "",
        expiryDate: p.expiryDate || "",
        isDefault: p.isDefault || false,
      }));
      setPayments(payList || []);
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
  
  // Handle Adress Functions  
  const handleAddressToggle = () => {
    setShowAddressForm(false);
    setAddressBeingEdited(null);
    setIsAddressExpanded((prev)=> !prev);
  }
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setShowAddressForm(false);
    setAddressBeingEdited(null);
    setIsAddressExpanded(false);
  }
  const handleAddressNoChange = () => {
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
      item = { ...addressBeingEdited, ...formData };
      updatedItems = addresses.map((address) =>
        address._id === item._id ? item : address
      );
    } else {
      const newId = Date.now().toString();
      item = { _id: newId, ...formData };
      updatedItems = [...addresses, item];
    }
    setAddresses(updatedItems);
    if (updatedItems.length === 1) setSelectedAddress(updatedItems[0]);

    setShowAddressForm(false);
    setAddressBeingEdited(null);
    setIsAddressExpanded(true);
  }
  const handleAddressEdit = (address) => { 
    setShowAddressForm(true);
    setAddressBeingEdited(address);
    setIsAddressExpanded(true);
  }
  const handleAddressDelete = (address) => {
    const updatedAddresses = addresses.filter((add)=> add._id !== address._id);
    if (selectedAddress && selectedAddress._id === address._id) {
      if (updatedAddresses.length > 0) {
        setSelectedAddress(updatedAddresses[0]);
      } else {
        setSelectedAddress(null);
      }
    }
    setAddresses(updatedAddresses);
  }
  const handleCancelAddressForm = () => {
    setShowAddressForm(false);
    setAddressBeingEdited(null);
    setIsAddressExpanded(true);
  }
// Handle Payment Functions  
  const handleTogglePayment = () => {
    setShowPaymentMethodForm(false);
    setPaymentMethodBeingEdited(null);
    setIsPaymentExpanded((prev)=> !prev);
  }
  const handlePaymentMethodSelect = (payment) => { 
    setSelectedPayment(payment);
    setShowPaymentMethodForm(false);
    setPaymentMethodBeingEdited(null);
    setIsPaymentExpanded(false);
  }
  const handlePaymentNoChange = () => {
    setShowPaymentMethodForm(false);
    setPaymentMethodBeingEdited(null);
    setIsPaymentExpanded(false);
  }
  const handlePrepareNewPayment = () => {
    setShowPaymentMethodForm(true);
    setPaymentMethodBeingEdited(null);
    setIsPaymentExpanded(true);
  }
  const handleSubmitNewPayment = (formData) => {
    let item = null;
    let updatedItems = [];
    if (paymentMethodBeingEdited) {
      item = { ...paymentMethodBeingEdited, ...formData }
      updatedItems = payments.map((payment) =>
        payment._id === item._id ? item : payment
      )
    } else {
      const newId = Date.now().toString();
      item = { _id: newId, ...formData};
      updatedItems = [...payments, item];
    }
    setPayments(updatedItems);
    if (updatedItems.length === 1) setSelectedPayment(updatedItems[0]);

    setShowPaymentMethodForm(false);
    setPaymentMethodBeingEdited(null);
    setIsPaymentExpanded(true);
  }
  const handleEditPaymentMethod = (payment) => {
    setShowPaymentMethodForm(true);
    setPaymentMethodBeingEdited(payment);
    setIsPaymentExpanded(true);
  }
  const handleDeletePaymentMethod = (payment) => {
    const updatedsMethods = payments.filter((pay)=> pay._id !== payment._id);
    if (selectedPayment && selectedPayment._id === payment.id) {
      if (updatedsMethods.length > 0) {
        setSelectedPayment(updatedsMethods[0]);
      } else {
        setSelectedPayment(null);
      }
    }
    setPayments(updatedsMethods);
  }
  const handleCancelPaymentForm = () => {
    setShowPaymentMethodForm(false);
    setPaymentMethodBeingEdited(null);
    setIsPaymentExpanded(true);
  }

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
                  <h3>{selectedAddress?.name}</h3>
                  <p>{selectedAddress?.address1}</p>
                  <p>{selectedAddress?.city}, {selectedAddress?.postalCode}</p>
                </div>}
              isExpanded={isAddressExpanded || showAddressForm || !selectedAddress}
              onToggle={handleAddressToggle}>
                {
                !showAddressForm && !addressBeingEdited
                ? (<>
                  <AddressList
                    addresses={addresses}
                    selectedAddress={selectedAddress}
                    onSelect={(address)=> {handleAddressSelect(address)}}
                    onEdit={(address)=> { handleAddressEdit(address)}}
                    onDelete={(address) => {handleAddressDelete(address)}}
                    onAdd={handleAddressNew} >
                  </AddressList> 
                  {(addresses.length > 0) && <div>
                    <Button 
                      onClick={handleAddressNoChange}
                    >
                      Confirmar Dirección
                    </Button>
                  </div>}
                </>
                )
                : (
                  <AddressForm
                    onSubmit={handleAddressSubmit}
                    onCancel={handleCancelAddressForm}
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
                  <h3>{selectedPayment?.alias}</h3>
                  <p>{selectedPayment?.cardHolderName}</p>
                  {/* <p>{selectedPayment?.}</p> */}
                  <p>{selectedPayment?.expiryDate}</p>
                </div>}
              isExpanded={isPaymentExpanded || showPaymentMethodForm || !selectedPayment}
              onToggle={handleTogglePayment}
              >
                {
                  !showPaymentMethodForm && !paymentMethodBeingEdited
                  ? (<>
                  <PaymentList
                    paymentMethods={payments}
                    selectedMethod={selectedPayment}
                    onSelect={(method) => { handlePaymentMethodSelect(method)}}
                    onEdit={(method)=> {handleEditPaymentMethod(method)}}
                    onDelete={(method)=>{handleDeletePaymentMethod(method)}}
                    onAdd={handlePrepareNewPayment} >
                  </PaymentList>
                  {(payments.length > 0) && <div>
                    <Button 
                      onClick={handlePaymentNoChange}
                    >
                      Confirmar Método de Pago
                    </Button>
                  </div>}
                  </>)
                  :
                  (
                  <PaymentForm
                    onSubmit={handleSubmitNewPayment}
                    onCancel={handleCancelPaymentForm}
                    initialValues={paymentMethodBeingEdited || {}}
                    isEdit={!!paymentMethodBeingEdited} >
                  </PaymentForm>
                  )
                }
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
                { !selectedAddress || !selectedPayment 
                  ? <div>
                      { !selectedAddress ? 'Agrega una dirección de envío.' : '' }
                      { !selectedPayment ? 'Agrega un método de pago.' : '' }
                    </div>
                  : <div> { '' } </div>
                }
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
