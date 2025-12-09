import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaBriefcase, FaUserTie } from 'react-icons/fa';

const PublicLayout = () => {
    return (
        <div className='min-h-screen font-sans text-gray-900 bg-white selection:bg-blue-100 selection:text-blue-900'>
            {/* Navbar */}
            <nav className='sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100'>
                <div className='max-w-7xl mx-auto px-6 h-20 flex items-center justify-between'>
                    <Link to='/' className='flex items-center gap-2'>
                        <div className='w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-200'>
                            J
                        </div>
                        <span className='text-2xl font-bold tracking-tight text-gray-900'>Jobify</span>
                    </Link>
                    <div className='hidden md:flex items-center gap-8'>
                        <Link to='/jobs-listing' className='text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors'>Find Jobs</Link>
                        <Link to='/' className='text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors'>Features</Link>
                        <Link to='/' className='text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors'>Testimonials</Link>
                    </div>
                    <div className='flex items-center gap-4'>
                        <Link to='/user-authentication' className='text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors px-4 py-2'>
                            Sign In
                        </Link>
                        <Link to='/user-registration' className='text-sm font-medium px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-200 hover:shadow-lg transform hover:-translate-y-0.5'>
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            <Outlet />

            {/* Footer */}
            <footer className='bg-gray-50 pt-20 pb-10 border-t border-gray-200'>
                <div className='max-w-7xl mx-auto px-6'>
                    <div className='grid md:grid-cols-4 gap-12 mb-16'>
                        <div className='col-span-1 md:col-span-1'>
                            <div className='flex items-center gap-2 mb-6'>
                                <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold'>J</div>
                                <span className='text-xl font-bold text-gray-900'>Jobify</span>
                            </div>
                            <p className='text-gray-500 leading-relaxed mb-6'>
                                Empowering students to find their dream careers through verified opportunities.
                            </p>
                            <div className='flex gap-4 text-gray-400'>
                                <div className='w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors cursor-pointer'><FaBriefcase size={14} /></div>
                                <div className='w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors cursor-pointer'><FaUserTie size={14} /></div>
                            </div>
                        </div>
                        <div>
                            <h4 className='font-bold text-gray-900 mb-6'>Platform</h4>
                            <ul className='space-y-4 text-gray-500'>
                                <Link to='/jobs-listing' className='block hover:text-blue-600 cursor-pointer'>Browse Jobs</Link>
                                <li className='hover:text-blue-600 cursor-pointer'>Browse Companies</li>
                                <li className='hover:text-blue-600 cursor-pointer'>Pricing</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className='font-bold text-gray-900 mb-6'>Resources</h4>
                            <ul className='space-y-4 text-gray-500'>
                                <li className='hover:text-blue-600 cursor-pointer'>Blog</li>
                                <li className='hover:text-blue-600 cursor-pointer'>Help Center</li>
                                <li className='hover:text-blue-600 cursor-pointer'>Privacy Policy</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className='font-bold text-gray-900 mb-6'>Get the App</h4>
                            <p className='text-gray-500 mb-4 text-sm'>Download our mobile app for better experience.</p>
                            <div className='space-y-3'>
                                <div className='h-10 bg-gray-900 rounded-lg flex items-center justify-center text-white text-xs font-bold cursor-pointer'>
                                    App Store
                                </div>
                                <div className='h-10 bg-gray-900 rounded-lg flex items-center justify-center text-white text-xs font-bold cursor-pointer'>
                                    Google Play
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='pt-8 border-t border-gray-200 text-center text-gray-400 text-sm'>
                        © {new Date().getFullYear()} Jobify Inc. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
