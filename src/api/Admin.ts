import request from '.';
async function adminLogin({ email, password }: { email: string; password: string }) {
    return request({ url: '/user/admin', method: 'POST', data: { email, password } });
}

export { adminLogin };
