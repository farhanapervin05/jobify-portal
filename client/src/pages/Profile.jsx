import React, { useState, useEffect } from 'react';
import { FormRow } from '../components';
import { useOutletContext } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useDashboardContext } from './DashboardContext';

const Profile = () => {
    // Get user from dashboard context to display initial data
    const { user: initialUser } = useDashboardContext();
    const [isLoading, setIsLoading] = useState(false);

    // Local state for form values
    const [name, setName] = useState(initialUser?.name || '');
    const [lastName, setLastName] = useState(initialUser?.lastName || '');
    const [email, setEmail] = useState(initialUser?.email || '');
    const [location, setLocation] = useState(initialUser?.location || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await customFetch.patch('/users/update-user', {
                name,
                lastName,
                email,
                location,
            });
            toast.success('Profile updated successfully');
            // We should ideally update the global context here too
            // For now, a reload or re-login would refresh data, 
            // but we can also rely on local changes if context update logic existed
        } catch (error) {
            toast.error(error?.response?.data?.msg || 'Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className='bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto'>
            <h3 className='text-3xl font-bold text-gray-800 mb-8'>Profile</h3>
            <form className='grid gap-6' onSubmit={handleSubmit}>
                <FormRow
                    type='text'
                    name='name'
                    labelText='Name'
                    value={name}
                    handleChange={(e) => setName(e.target.value)}
                />
                <FormRow
                    type='text'
                    name='lastName'
                    labelText='Last Name'
                    value={lastName}
                    handleChange={(e) => setLastName(e.target.value)}
                />
                <FormRow
                    type='email'
                    name='email'
                    labelText='Email'
                    value={email}
                    handleChange={(e) => setEmail(e.target.value)}
                />
                <FormRow
                    type='text'
                    name='location'
                    labelText='Location'
                    value={location}
                    handleChange={(e) => setLocation(e.target.value)}
                />

                <div className='mt-4'>
                    <button
                        type='submit'
                        className='px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-70 w-full md:w-auto'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Profile;
