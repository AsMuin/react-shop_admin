import request from '.';
function addProduct(formData: FormData) {
    return request({ url: '/product/add', data: formData, method: 'post' });
}

export { addProduct };
