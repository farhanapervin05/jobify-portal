import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BigSidebar from '../components/BigSidebar';
import SmallSidebar from '../components/SmallSidebar';
import { useState } from 'react';
import DashboardContext from './DashboardContext';
import { toast } from 'react-toastify';

const DashboardLayout = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('jobify_user');
        return stored ? JSON.parse(stored) : null;
    });
    const navigate = useNavigate();

    const toggleDarkTheme = () => {
        console.log('toggle dark theme');
        setIsDarkTheme(!isDarkTheme);
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const logoutUser = async () => {
        localStorage.removeItem('jobify_user');
        localStorage.removeItem('jobify_token');
        setUser(null);
        toast.success('Logged out');
        navigate('/user-authentication');
    };

    React.useEffect(() => {
        if (!user) {
            navigate('/user-authentication');
        }
    }, [user, navigate]);



    return (
        <DashboardContext.Provider
            value={{
                user,
                showSidebar,
                isDarkTheme,
                toggleDarkTheme,
                toggleSidebar,
                logoutUser,
            }}
        >
            <main className='dashboard'>
                <SmallSidebar />
                <BigSidebar />
                <div>
                    <Navbar />
                    <div className='dashboard-page'>
                        <Outlet />
                    </div>
                </div>
            </main>
        </DashboardContext.Provider>
    );
};

export default DashboardLayout;
