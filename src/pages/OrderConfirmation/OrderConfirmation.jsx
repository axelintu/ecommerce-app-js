import { useLocation, useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

function OrderConfirmation(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  console.log(order);
  

  return (
    <div className="OrderConfirmation">
      <h1>OrderConfirmation</h1>
      <div>
        <pre>
        {JSON.stringify(order, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default OrderConfirmation;