import { useLocation } from 'react-router-dom';

function List() {
    const { state } = useLocation();
    return <div>List+{state?.token}</div>;
}
export default List;
