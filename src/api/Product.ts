import request from '.';
const BASEURL = '/product';
function addProduct<T>(formData: FormData) {
    return request<T>({ url: `${BASEURL}/add`, data: formData, method: 'post' });
}
function getProductList<T>() {
    return request<T>({ url: `${BASEURL}/list`, method: 'get' });
}
function removeProduct<T>(id: string) {
    return request<T>({ url: `${BASEURL}/remove`, method: 'post', data: { id } });
}
export { addProduct, getProductList, removeProduct };
