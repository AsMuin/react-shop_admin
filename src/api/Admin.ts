import request from '.';
const BASEURL = '/user';
function adminLogin<T>({ email, password }: { email: string; password: string }) {
    return request<T>({ url: `${BASEURL}/admin`, method: 'POST', data: { email, password } });
}

export { adminLogin };
