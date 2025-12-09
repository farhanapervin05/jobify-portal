import React from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useDashboardContext } from '../pages/DashboardContext';

const Navbar = () => {
    const { toggleSidebar, user, logoutUser } = useDashboardContext();
    const [showLogout, setShowLogout] = React.useState(false);

    return (
        <nav className='h-24 flex items-center justify-between px-8 bg-white shadow-sm'>
            <button type='button' className='text-blue-500 text-2xl' onClick={toggleSidebar}>
                <FaAlignLeft />
            </button>
            <div>
                <h3 className='text-2xl font-bold text-center hidden md:block'>Dashboard</h3>
            </div>
            <div className='relative'>
                <button
                    type='button'
                    className='flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded shadow'
                    onClick={() => setShowLogout(!showLogout)}
                >
                    <FaUserCircle />
                    {user?.name}
                    <FaCaretDown />
                </button>
                {showLogout && (
                    <div className='absolute top-12 left-0 w-full bg-white shadow rounded p-2 text-center'>
                        <button type='button' className='text-blue-500' onClick={logoutUser}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
