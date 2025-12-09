import React from 'react';
import { useDashboardContext } from '../pages/DashboardContext';
import { FaTimes } from 'react-icons/fa';
import { NavLink, Link } from 'react-router-dom';
import { FaBriefcase, FaAddressBook, FaFileAlt, FaUser } from 'react-icons/fa';

const links = [
    { text: 'all jobs', path: '.', icon: <FaBriefcase /> },
    { text: 'my applications', path: 'applications', icon: <FaFileAlt /> },
    { text: 'add job', path: 'add-job', icon: <FaFileAlt /> },
    { text: 'profile', path: 'profile', icon: <FaUser /> },
    { text: 'admin', path: 'admin', icon: <FaAddressBook /> },
];

const SmallSidebar = () => {
    const { showSidebar, toggleSidebar, user } = useDashboardContext();

    return (
        <aside className={`md:hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center transition-all duration-300 ${showSidebar ? 'show-sidebar' : 'hidden'}`}>
            <div className='bg-white w-[90vw] h-[95vh] rounded relative p-8 flex flex-col items-center'>
                <button className='absolute top-4 left-4 text-red-500 text-2xl' onClick={toggleSidebar}>
                    <FaTimes />
                </button>
                <Link to='/' onClick={toggleSidebar}>
                    <header className='text-2xl font-bold text-blue-600 mb-8'>Jobify</header>
                </Link>
                <div className='flex flex-col gap-4 w-full'>
                    {links.map((link) => {
                        const { text, path, icon } = link;

                        // Role-based filtering
                        if (path === 'add-job' && user?.role !== 'recruiter' && user?.role !== 'admin') return null;
                        if (path === 'admin' && user?.role !== 'admin') return null;
                        if (path === 'applications' && user?.role !== 'student') return null;

                        return (
                            <NavLink
                                to={path}
                                key={text}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 px-4 py-2 capitalize transition-colors ${isActive ? 'text-blue-500' : 'text-gray-500'}`
                                }
                                onClick={toggleSidebar}
                                end
                            >
                                <span className='text-xl'>{icon}</span>
                                {text}
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};

export default SmallSidebar;
