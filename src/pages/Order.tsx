import { useLocation } from 'react-router-dom';

function Order() {
    const { state } = useLocation();
    return <div>Order{state?.token}</div>;
}
export default Order;
