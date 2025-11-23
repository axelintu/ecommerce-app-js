
import { useState } from 'react';
import Input from '../../../common/Input/Input';
import Button from '../../../common/Button';
import './AddressForm.css';

function AddressForm({
  isEdit = false,
  onCancel,
  onSubmit,
  initialValues = {}
}) {
  const [formData, setFormData] = useState({
    name: "",
    address1: "",
    address2: "",
    postalCode: "",
    city: "",
    country: "",
    reference:  "",
    default: false,
    ...initialValues
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const handleChange = (eOrPayload) => {
    let name, value, type, checked;
    if (eOrPayload && eOrPayload.target) {
      ({ name, value, type, checked } = eOrPayload.target);
    } else if (eOrPayload && typeof eOrPayload === 'object' && 'name' in eOrPayload) {
      ({ name, value } = eOrPayload);
      type = typeof value === 'boolean' ? 'checkbox' : 'text';
      checked = value === true;
    } else {
      return;
    }
    setFormData((prev)=> ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <h3>{isEdit ? "Editar Dirección" : "Nueva Dirección"}</h3>
      <div>{formData?._id}</div>
      <Input
        label="Nombre de la dirección"
        name="name"
        value={formData.name}
        onChange={handleChange}
        type="text"
      />
      <Input
        label="Dirección Linea 1:"
        name="address1"
        value={formData.address1}
        onChange={handleChange}
        type="text"
      />
      <Input
        label="Dirección Linea 2:"
        name="address2"
        value={formData.address2}
        onChange={handleChange}
        type="text"
      />
      <Input
        label="Código Postal:"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
        type="text"
      />
      <Input
        label="Ciudad:"
        name="city"
        value={formData.city}
        onChange={handleChange}
        type="text"
      />
      <Input
        label="País:"
        name="country"
        value={formData.country}
        onChange={handleChange}
        type="text"
      />
      {/* <input name="pais"
        onChange={(e)=>{handleChangeCountry(e)}}
        value={country.country}
      /> */}
      <Input
        label="Referencia:"
        name="reference"
        value={formData.reference}
        onChange={handleChange}
        type="text"
      />
      <div className="form-checkbox">
        <input
          type="checkbox"
          name="default"
          checked={formData.default}
          onChange={handleChange}
          id="defaultAddress"
        />
        <label htmlFor="defaultAddress">
          Establecer como dirección predeterminada: {" "}
        </label>
      </div>
      <div className="form-actions">

        <Button type="submit">
          {isEdit ? "Guardar Cambios" : "Agregar Dirección"}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}

export default AddressForm;
