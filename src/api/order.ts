import request from '.';
const BASEURL = '/order';
function getOrderList<T>() {
    return request<T>({ url: `${BASEURL}/list`, method: 'GET' });
}
function updateOrderStatus<T>({ status, orderId }: { status: string; orderId: string }) {
    return request<T>({ url: `${BASEURL}/status`, method: 'POST', data: { status, orderId } });
}
export { getOrderList, updateOrderStatus };
