import { useEffect, useState } from 'react';
import CartView from '../../components/Cart/CartView/CartView';
import shippingAddress from '../../data/shippingAddress.json';
import { getShippingAddresses, getDefaultshippingAddress } from '../../services/shippingService';
import { getPaymentMethods, getDefaultPaymentMethods } from '../../services/paymentService';
import Button from '../../components/common/Button';
import ErrorMessage from '../../components/common/ErrorMessage'; 
import AddressList from '../../components/Checkout/Address/AddressList';
import AddressForm from '../../components/Checkout/Address/AddressForm';
import PaymentForm from '../../components/Checkout/Payment/PaymentForm';
import PaymentList from '../../components/Checkout/Payment/PaymentList';
import PaymentItem from '../../components/Checkout/Payment/PaymentItem';
import SummarySection from '../../components/Checkout/shared/SummarySection';
import Loading from '../../components/common/Loading/Loading';
import './Checkout.css';

function Checkout() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isAddressEdit, setIsAddressEdit] = useState(false);
  const [addressBeingEdited, setAddressBeingEdited] = useState(null);
  const [isPaymentMethodEdit, setIsPaymentMethodEdit] = useState(false);
  const [paymentMethodBeingEdited, setPaymentMethodBeingEdited] = useState(null);

  const [isAddressExpanded, setIsAddressExpanded] = useState(false);
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

  const handleAddressSubmit = (formData) => {console.log(formData) };
  const handlePaymentSubmit = (formData) => {console.log(formData) };
  const handleAddressEdit = (address) => { 
    setAddressBeingEdited(address);
    console.log(address) 
  };
  const handlePaymentEdit = (payment) => { 
    setPaymentMethodBeingEdited(payment);
    console.log(payment) 
  };

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
              isExpanded={isAddressExpanded}
              onToggle={()=> {
                console.log(`Expand ${JSON.stringify(selectedAddress)}`);
                // toggleAddrExpanded()
                setIsAddressExpanded(true);
              }}>
                <AddressList
                  addresses={addresses}
                  selectedAddress={selectedAddress}
                  onSelect={(address) => {
                    setSelectedAddress(address);
                  }}
                  onEdit={handleAddressEdit}
                  onAdd={() => console.log("Add address")} >
                </AddressList>
                { isAddressEdit && addressBeingEdited && (
                  <div>IS BEING EDITED</div>
                ) }
                <AddressForm
                  onSubmit={handleAddressSubmit}
                  initialValues={null}
                  isEdit={false} >
                </AddressForm>
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
                // toggleAddrExpanded()
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
          </div>
          <div className="checkout-right">
            Right column
          </div>
        </div>
      )
    );
}

export default Checkout;
