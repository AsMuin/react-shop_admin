import { Outlet } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import Login from './components/Login';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);
    return (
        <>
            <div className="bg-gray-50  min-h-screen">
                <ToastContainer />
                {token === '' ? (
                    <Login setToken={setToken} />
                ) : (
                    <>
                        <NavBar setToken={setToken} />
                        <hr />
                        <div className="flex w-full">
                            <SideBar token={token} />
                            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Outlet></Outlet>
                                </Suspense>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default App;
