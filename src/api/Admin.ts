import request from '.';
function adminLogin<T>({ email, password }: { email: string; password: string }) {
    return request<T>({ url: '/user/admin', method: 'POST', data: { email, password } });
}

export { adminLogin };
