import request from '.';
function addProduct<T = any>(formData: FormData) {
    return request<T>({ url: '/product/add', data: formData, method: 'post' });
}
function getProductList<T = any>() {
    return request<T>({ url: '/product/list', method: 'get' });
}
export { addProduct,getProductList };