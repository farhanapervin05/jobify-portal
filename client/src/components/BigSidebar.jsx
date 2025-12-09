import React from 'react';
import { useDashboardContext } from '../pages/DashboardContext';
import { NavLink, Link } from 'react-router-dom';
import { FaBriefcase, FaAddressBook, FaFileAlt, FaUser } from 'react-icons/fa';

const links = [
    { text: 'all jobs', path: '.', icon: <FaBriefcase /> },
    { text: 'my applications', path: 'applications', icon: <FaFileAlt /> },
    { text: 'add job', path: 'add-job', icon: <FaFileAlt /> },
    { text: 'profile', path: 'profile', icon: <FaUser /> },
    { text: 'admin', path: 'admin', icon: <FaAddressBook /> },
];

const BigSidebar = () => {
    const { showSidebar, user } = useDashboardContext();

    return (
        <aside className='hidden md:block bg-white h-screen shadow-md w-64 sticky top-0 transition-all duration-300' style={{ marginLeft: showSidebar ? '-250px' : '0px' }}>
            <div className='p-6'>
                <Link to='/'>
                    <header className='text-2xl font-bold text-blue-600 mb-8'>Jobify</header>
                </Link>
                <div className='flex flex-col gap-4'>
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
                                    `flex items-center gap-4 px-4 py-2 capitalize transition-colors ${isActive ? 'text-blue-500 pl-6' : 'text-gray-500 hover:text-blue-500 hover:pl-6'}`
                                }
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

export default BigSidebar;
