import request from '.';
const BASEURL = '/product';
function addProduct<T = any>(formData: FormData) {
    return request<T>({ url: `${BASEURL}/add`, data: formData, method: 'post' });
}
function getProductList<T = any>() {
    return request<T>({ url: `${BASEURL}/list`, method: 'get' });
}
export { addProduct, getProductList };
