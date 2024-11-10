import { assets } from '@/assets/assets';
import { NavLink } from 'react-router-dom';

function SideBar({ token }: { token: string }) {
    return (
        <>
            <div className="min-h-screen w-[18%] border-r-2">
                <div className="flex flex-col gap-4 pl-[20%] pt-6 text-[15px]">
                    <NavLink className="flex items-center gap-3 rounded-l border border-r-0 border-gray-300 px-3 py-2" to="/add" state={{ token }}>
                        <img src={assets.add_icon} className="h-5 w-5" alt="" />
                        <p className="hidden md:block">Add Items</p>
                    </NavLink>
                    <NavLink className="flex items-center gap-3 rounded-l border border-r-0 border-gray-300 px-3 py-2" to="/list" state={{ token }}>
                        <img src={assets.order_icon} className="h-5 w-5" alt="" />
                        <p className="hidden md:block">List Items</p>
                    </NavLink>
                    <NavLink className="flex items-center gap-3 rounded-l border border-r-0 border-gray-300 px-3 py-2" to="/order" state={{ token }}>
                        <img src={assets.order_icon} className="h-5 w-5" alt="" />
                        <p className="hidden md:block">Orders</p>
                    </NavLink>
                </div>
            </div>
        </>
    );
}
export default SideBar;
