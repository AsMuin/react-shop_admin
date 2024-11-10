import { useState } from 'react';
import { toast } from 'react-toastify';
import { adminLogin } from '@/api/admin';
function Login({ setToken }: { setToken: (token: string) => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function Login(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            const { token } = await adminLogin({ email, password });
            console.log(token);
            if (token) {
                setToken(token);
                toast.success('登录成功');
            }
        } catch (error: any) {
            console.error(error);
            // toast.error(error.message);
        }
    }
    return (
        <>
            <div className="flex min-h-screen items-center justify-center">
                <div className="max-w-md rounded-lg bg-white px-8 py-6 shadow-md">
                    <h1 className="mb-4 text-2xl font-bold">管理员面板</h1>
                    <form onSubmit={Login}>
                        <div className="mb-3 min-w-72">
                            <p className="mb-2 text-sm font-medium text-gray-700">邮箱地址</p>
                            <input
                                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none"
                                type="email"
                                placeholder="请输入你的邮箱地址"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3 min-w-72">
                            <p className="mb-2 text-sm font-medium text-gray-700">密码</p>
                            <input
                                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none"
                                type="password"
                                placeholder="请输入你的密码"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className="mt-2 w-full rounded-md bg-black px-4 py-2 text-white active:bg-white active:text-black" type="submit">
                            登录
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
