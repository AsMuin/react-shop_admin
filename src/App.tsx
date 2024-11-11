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
            <div className="min-h-screen bg-gray-50">
                <ToastContainer />
                {token === '' ? (
                    <Login setToken={setToken} />
                ) : (
                    <>
                        <NavBar setToken={setToken} />
                        <hr />
                        <div className="flex w-full">
                            <SideBar token={token} />
                            <div className="mx-auto my-8 ml-[max(5vw,25px)] w-[70%] text-base text-gray-600">
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
