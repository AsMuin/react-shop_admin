import request from '.';
function addProduct<T = any>(formData: FormData) {
    return request<T>({ url: '/product/add', data: formData, method: 'post' });
}

export { addProduct };
