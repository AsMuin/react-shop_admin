import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function List() {
    const { state } = useLocation();
    const [list, setList] = useState([]);

    return <div>List+{state?.token}</div>;
}
export default List;
