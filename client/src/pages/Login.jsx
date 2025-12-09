import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { FaQuoteLeft } from 'react-icons/fa';

const Login = () => {
    const [values, setValues] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await customFetch.post('/auth/login', values);
            localStorage.setItem('jobify_token', data.token);

            // Fetch complete user data including role
            const { data: userData } = await customFetch.get('/users/current-user');
            localStorage.setItem('jobify_user', JSON.stringify(userData.user));

            toast.success('Login Successful');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error?.response?.data?.msg || 'Login failed');
        }
    };

    return (
        <div className='min-h-screen grid lg:grid-cols-2 bg-white'>
            {/* Left Side - Hidden on mobile */}
            <div className='hidden lg:flex flex-col justify-between bg-blue-600 p-12 text-white relative overflow-hidden'>
                <div className='relative z-10'>
                    <Link to='/' className='flex items-center gap-2 mb-10 inline-flex'>
                        <div className='w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 text-xl font-bold shadow-lg'>J</div>
                        <span className='text-2xl font-bold tracking-tight'>Jobify</span>
                    </Link>
                </div>
                <div className='relative z-10 max-w-md'>
                    <FaQuoteLeft className='text-blue-400 text-4xl mb-6' />
                    <h2 className='text-3xl font-bold leading-tight mb-6'>
                        "This platform completely changed how I hire. The quality of candidates is unmatched."
                    </h2>
                    <div className='flex items-center gap-4'>
                        <div className='w-12 h-12 bg-blue-500 rounded-full border-2 border-white/20'></div>
                        <div>
                            <div className='font-bold'>Elena Rodriguez</div>
                            <div className='text-blue-200 text-sm'>Head of Talent, TechCorp</div>
                        </div>
                    </div>
                </div>
                <div className='relative z-10 text-sm text-blue-200'>
                    © {new Date().getFullYear()} Jobify Inc. All rights reserved.
                </div>

                {/* Decorative background */}
                <div className='absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2'></div>
                <div className='absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 opacity-20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2'></div>
            </div>

            {/* Right Side - Form */}
            <div className='flex items-center justify-center p-8 bg-gray-50 lg:bg-white'>
                <div className='w-full max-w-md bg-white p-8 rounded-2xl shadow-xl lg:shadow-none lg:p-0'>
                    <div className='mb-8'>
                        <h1 className='text-2xl font-bold text-gray-900 mb-2'>Welcome Back</h1>
                        <p className='text-gray-500'>Enter your details to access your account.</p>
                    </div>

                    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
                            <input
                                type='email'
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                                className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50 focus:bg-white'
                                placeholder='name@company.com'
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
                            <input
                                type='password'
                                name='password'
                                value={values.password}
                                onChange={handleChange}
                                className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50 focus:bg-white'
                                placeholder='••••••••'
                                required
                            />
                        </div>

                        <div className='flex items-center justify-between text-sm'>
                            <label className='flex items-center gap-2 text-gray-600 cursor-pointer'>
                                <input type='checkbox' className='rounded border-gray-300 text-blue-600 focus:ring-blue-500' />
                                Remember me
                            </label>
                            <Link to='#' className='text-blue-600 font-medium hover:underline'>Forgot password?</Link>
                        </div>

                        <button className='w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-200 hover:shadow-xl transform hover:-translate-y-0.5'>
                            Sign In
                        </button>
                    </form>

                    <div className='mt-8 text-center text-sm text-gray-500'>
                        Don't have an account? <Link to='/user-registration' className='text-blue-600 font-bold hover:underline'>Create free account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
