import { assets } from '@/assets/assets';

function NavBar({ setToken }: { setToken: (token: string) => void }) {
    return (
        <>
            <div className="flex items-center justify-between px-[4%] py-2">
                <img src={assets.logo} className="w-[max(10%,80px)]" alt="" />
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        setToken('');
                    }}
                    className="rounded-full bg-gray-600 px-5 py-2 text-sm text-white sm:px-7">
                    Logout
                </button>
            </div>
        </>
    );
}
export default NavBar;
