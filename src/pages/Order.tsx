import { getOrderList, updateOrderStatus } from '@/api/order';
import { assets } from '@/assets/assets';
import { useEffect, useState } from 'react';
interface IAddress {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    province: string;
    zipCode: string;
    phone: string;
}
interface API_OrderItem {
    _id: string;
    name: string;
    price: number;
    image: string[];
    quantity: number;
    size: string[];
    date: number;
    bestSeller: boolean;
    description: string;
    category: string;
    subCategory: string;
}
interface API_OrderData {
    _id: string;
    items: API_OrderItem[];
    address: IAddress;
    status: string;
    payment: boolean;
    paymentMethod: string;
    date: number;
    amount: number;
}
function Order() {
    // const { state } = useLocation();
    const [orderList, setOrderList] = useState<API_OrderData[]>([]);
    const orderStatusMap = [
        {
            key: 'Order Placed',
            value: '已下单'
        },
        {
            key: 'Packing',
            value: '待发货'
        },
        {
            key: 'Shipped',
            value: '已发货'
        },
        {
            key: 'Out for delivery',
            value: '运输中'
        },
        {
            key: 'Delivered',
            value: '已收货'
        }
    ];
    useEffect(() => {
        getAllOrderList();
    }, []);
    async function getAllOrderList() {
        try {
            const response = await getOrderList<API_OrderData[]>();
            console.log(response);
            if (response.success) {
                setOrderList(response.data!);
            }
        } catch (error) {
            console.error(error);
        }
    }
    async function handleUpdateOrderStatus(status: string, orderId: string) {
        try {
            const response = await updateOrderStatus<API_OrderData>({ status, orderId });
            if (response.success) {
                getAllOrderList();
            }
            console.log(response);
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <>
            <div>
                {orderList.map(order => (
                    <div
                        className="my-3 grid grid-cols-1 items-start gap-3 border-2 border-gray-200 p-5 text-xs text-gray-700 sm:grid-cols-[0.5fr_2fr_1fr] sm:text-sm md:my-4 md:p-8 lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr]"
                        key={order._id}>
                        <img className="w-12" src={assets.parcel_icon} alt="" />
                        <div>
                            <div>
                                {order.items.map((item, index) => {
                                    if (index !== order.items.length - 1) {
                                        return (
                                            <p className="py-0.5" key={item._id}>
                                                {item.name} x {item.quantity} <span>{item.size}，</span>
                                            </p>
                                        );
                                    } else {
                                        return (
                                            <p className="py-0.5" key={item._id}>
                                                {item.name} x {item.quantity} <span>{item.size}</span>
                                            </p>
                                        );
                                    }
                                })}
                            </div>
                            <p className="mb-2 mt-3 font-medium">{order.address.firstName + ' ' + order.address.lastName}</p>
                            <div>
                                <p>{order.address.street + '，'}</p>
                                <p>{order.address.province + '，' + order.address.city + '，' + order.address.zipCode}</p>
                                <p>{order.address.phone}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm sm:text-[15px]">商品：{order.items.length}</p>
                            <p className="mt-3">付款方式：{order.paymentMethod}</p>
                            <p>付款状态：{order.payment ? '已支付' : '未支付'}</p>
                            <p>日期：{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <p className="sm:tex-[15px] text-sm">
                            {import.meta.env.VITE_CURRENCY}
                            {order.amount}
                        </p>
                        <select value={order.status} onChange={e => handleUpdateOrderStatus(e.target.value, order._id)} className="p-2 font-semibold">
                            {orderStatusMap.map(item => (
                                <option key={item.key} value={item.key}>
                                    {item.value}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </>
    );
}
export default Order;
