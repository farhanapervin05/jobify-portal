import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { FaRocket, FaGraduationCap, FaBriefcase, FaShieldAlt } from 'react-icons/fa';

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student',
        // Student fields
        university: '',
        graduationYear: '',
        fieldOfStudy: '',
        // Recruiter fields
        companyName: '',
        position: '',
        companySize: '',
        // Admin fields
        adminCode: '',
        department: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleRoleSelect = (role) => {
        setValues({ ...values, role });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (values.password !== values.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const registrationData = {
                name: values.name,
                email: values.email,
                password: values.password,
                role: values.role
            };

            // Add role-specific fields
            if (values.role === 'student') {
                registrationData.university = values.university;
                registrationData.graduationYear = values.graduationYear;
                registrationData.fieldOfStudy = values.fieldOfStudy;
            } else if (values.role === 'recruiter') {
                registrationData.companyName = values.companyName;
                registrationData.position = values.position;
                registrationData.companySize = values.companySize;
            } else if (values.role === 'admin') {
                registrationData.adminCode = values.adminCode;
                registrationData.department = values.department;
            }

            await customFetch.post('/auth/register', registrationData);
            toast.success('Registration Successful');
            navigate('/user-authentication');
        } catch (error) {
            toast.error(error?.response?.data?.msg || 'Registration failed');
        }
    };

    const roles = [
        {
            id: 'student',
            icon: FaGraduationCap,
            title: 'Student',
            description: 'Looking for internships and job opportunities'
        },
        {
            id: 'recruiter',
            icon: FaBriefcase,
            title: 'Recruiter',
            description: 'Post jobs and manage applications'
        },
        {
            id: 'admin',
            icon: FaShieldAlt,
            title: 'Admin',
            description: 'Manage platform and moderate content'
        }
    ];

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
                    <FaRocket className='text-blue-400 text-4xl mb-6' />
                    <h2 className='text-3xl font-bold leading-tight mb-6'>
                        "Join thousands of professionals finding their dream jobs every single day."
                    </h2>
                    <ul className='space-y-4 text-blue-100 font-medium'>
                        <li className='flex items-center gap-3'><div className='w-2 h-2 bg-white rounded-full'></div> Create a free profile in 2 minutes</li>
                        <li className='flex items-center gap-3'><div className='w-2 h-2 bg-white rounded-full'></div> Get matched with top companies</li>
                        <li className='flex items-center gap-3'><div className='w-2 h-2 bg-white rounded-full'></div> Track applications in real-time</li>
                    </ul>
                </div>
                <div className='relative z-10 text-sm text-blue-200'>
                    © {new Date().getFullYear()} Jobify Inc. All rights reserved.
                </div>

                {/* Decorative background */}
                <div className='absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2'></div>
                <div className='absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 opacity-20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2'></div>
            </div>

            {/* Right Side - Form */}
            <div className='flex items-center justify-center p-8 bg-gray-50 lg:bg-white overflow-y-auto'>
                <div className='w-full max-w-md bg-white p-8 rounded-2xl shadow-xl lg:shadow-none lg:p-0'>
                    <div className='mb-8'>
                        <h1 className='text-2xl font-bold text-gray-900 mb-2'>Create Account</h1>
                        <p className='text-gray-500'>Get started with your free account today.</p>
                    </div>

                    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
                        {/* Role Selection */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-3'>Select Your Role *</label>
                            <div className='grid grid-cols-3 gap-3'>
                                {roles.map((role) => {
                                    const Icon = role.icon;
                                    return (
                                        <button
                                            key={role.id}
                                            type='button'
                                            onClick={() => handleRoleSelect(role.id)}
                                            className={`p-4 rounded-lg border-2 transition-all text-center ${values.role === role.id
                                                    ? 'border-blue-600 bg-blue-50'
                                                    : 'border-gray-200 hover:border-blue-300'
                                                }`}
                                        >
                                            <Icon className={`mx-auto text-2xl mb-2 ${values.role === role.id ? 'text-blue-600' : 'text-gray-400'}`} />
                                            <div className={`text-xs font-semibold ${values.role === role.id ? 'text-blue-600' : 'text-gray-700'}`}>
                                                {role.title}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                            <p className='text-xs text-gray-500 mt-2'>
                                {roles.find(r => r.id === values.role)?.description}
                            </p>
                        </div>

                        {/* Basic Information */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name *</label>
                            <input
                                type='text'
                                name='name'
                                value={values.name}
                                onChange={handleChange}
                                className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50 focus:bg-white'
                                placeholder='Enter your full name'
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address *</label>
                            <input
                                type='email'
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                                className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50 focus:bg-white'
                                placeholder='your.email@example.com'
                                required
                            />
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Password *</label>
                                <input
                                    type='password'
                                    name='password'
                                    value={values.password}
                                    onChange={handleChange}
                                    className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50 focus:bg-white'
                                    placeholder='Create a strong password'
                                    required
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Confirm Password *</label>
                                <input
                                    type='password'
                                    name='confirmPassword'
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50 focus:bg-white'
                                    placeholder='Re-enter your password'
                                    required
                                />
                            </div>
                        </div>

                        {/* Student-specific fields */}
                        {values.role === 'student' && (
                            <div className='border-l-4 border-blue-500 pl-4 space-y-4'>
                                <h3 className='text-sm font-bold text-gray-900'>Student Information</h3>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>University/College Name *</label>
                                    <input
                                        type='text'
                                        name='university'
                                        value={values.university}
                                        onChange={handleChange}
                                        className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50 focus:bg-white'
                                        placeholder='Enter your university name'
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Expected Graduation Year *</label>
                                    <select
                                        name='graduationYear'
                                        value={values.graduationYear}
                                        onChange={handleChange}
                                        className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50 focus:bg-white'
                                        required
                                    >
                                        <option value=''>Select year</option>
                                        {[2024, 2025, 2026, 2027, 2028].map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Field of Study *</label>
                                    <select
                                        name='fieldOfStudy'
                                        value={values.fieldOfStudy}
                                        onChange={handleChange}
                                        className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50 focus:bg-white'
                                        required
                                    >
                                        <option value=''>Select an option</option>
                                        <option value='Computer Science'>Computer Science</option>
                                        <option value='Engineering'>Engineering</option>
                                        <option value='Business'>Business</option>
                                        <option value='Design'>Design</option>
                                        <option value='Marketing'>Marketing</option>
                                        <option value='Other'>Other</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Recruiter-specific fields */}
                        {values.role === 'recruiter' && (
                            <div className='border-l-4 border-green-500 pl-4 space-y-4'>
                                <h3 className='text-sm font-bold text-gray-900'>Recruiter Information</h3>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Company Name *</label>
                                    <input
                                        type='text'
                                        name='companyName'
                                        value={values.companyName}
                                        onChange={handleChange}
                                        className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50 focus:bg-white'
                                        placeholder='Enter your company name'
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Your Position *</label>
                                    <input
                                        type='text'
                                        name='position'
                                        value={values.position}
                                        onChange={handleChange}
                                        className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50 focus:bg-white'
                                        placeholder='e.g., HR Manager, Talent Acquisition'
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Company Size *</label>
                                    <select
                                        name='companySize'
                                        value={values.companySize}
                                        onChange={handleChange}
                                        className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50 focus:bg-white'
                                        required
                                    >
                                        <option value=''>Select an option</option>
                                        <option value='1-10'>1-10 employees</option>
                                        <option value='11-50'>11-50 employees</option>
                                        <option value='51-200'>51-200 employees</option>
                                        <option value='201-500'>201-500 employees</option>
                                        <option value='500+'>500+ employees</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Admin-specific fields */}
                        {values.role === 'admin' && (
                            <div className='border-l-4 border-purple-500 pl-4 space-y-4'>
                                <h3 className='text-sm font-bold text-gray-900'>Admin Information</h3>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Admin Code *</label>
                                    <input
                                        type='text'
                                        name='adminCode'
                                        value={values.adminCode}
                                        onChange={handleChange}
                                        className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50 focus:bg-white'
                                        placeholder='Enter admin verification code'
                                        required
                                    />
                                    <p className='text-xs text-gray-500 mt-1'>Contact system administrator for admin access code</p>
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Department *</label>
                                    <input
                                        type='text'
                                        name='department'
                                        value={values.department}
                                        onChange={handleChange}
                                        className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50 focus:bg-white'
                                        placeholder='e.g., Platform Management, Content Moderation'
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <button className='w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-200 hover:shadow-xl transform hover:-translate-y-0.5'>
                            Create Account
                        </button>
                    </form>

                    <div className='mt-8 text-center text-sm text-gray-500'>
                        Already a member? <Link to='/user-authentication' className='text-blue-600 font-bold hover:underline'>Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
