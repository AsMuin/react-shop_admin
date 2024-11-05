import request from '.';
async function adminLogin<T = any>({ email, password }: { email: string; password: string }) {
    return request<T>({ url: '/user/admin', method: 'POST', data: { email, password } });
}

export { adminLogin };
