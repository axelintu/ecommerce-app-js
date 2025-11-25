import {useState} from 'react';
import Input from '../../../common/Input/Input';
import Button from '../../../common/Button';
import './PaymentForm.css';

function PaymentForm({isEdit = false, onSubmit, initialValues={}}) {
  const [formData, setFormData]= useState({
    "name": "",
    "type": "",
    "cardNumber": "",
    "cardHolderName": "",
    "expiryDate": "",
    "default": false,
    ...initialValues
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev)=> ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    
  }
  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <h3>{isEdit ? "Editar Tarjeta" : "Nueva Tarjeta"}</h3>
      <Input
        label="Alias de la tarjeta"
        name="alias"
        value={formData.alias}
        onChange={handleChange}
        type="text"
      />
      <Input
        label="Tipo de de tarjeta:"
        name="type"
        value={formData.type}
        onChange={handleChange}
        type="text"
      />
      <Input
        label="Número de tarjeta:"
        name="cardNumber"
        value={formData.cardNumber}
        onChange={handleChange}
        type="text"
      />
      <Input
        label="Nombre del Titular:"
        name="cardHolderName"
        value={formData.cardHolderName}
        onChange={handleChange}
        type="text"
      />
      <Input
        label="Fecha de expiración:"
        name="expiryDate"
        value={formData.expiryDate}
        onChange={handleChange}
        type="text"
      />
      <div className="form-checkbox">
        <input
          type="checkbox"
          name="default"
          checked={formData.default}
          onChange={handleChange}
          id="defaultPaymentMethod"
        />
        <label htmlFor="defaultPaymentMethod">
          Establecer como tarjeta predeterminada: {" "}
        </label>
      </div>
      <div className="form-actions">

        <Button type="submit">
          {isEdit ? "Guardar Cambios" : "Agregar Tarjeta"}
        </Button>
      </div>
    </form>
  );
}

export default PaymentForm;
