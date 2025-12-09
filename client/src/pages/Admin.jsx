import React from 'react';
import { useDashboardContext } from '../pages/DashboardContext';

const Admin = () => {
    const { user } = useDashboardContext();

    return (
        <div className='p-8'>
            <h1 className='text-2xl font-bold mb-4'>Admin Page</h1>
            <div className='bg-white p-6 rounded shadow'>
                <p>Welcome, {user?.name}!</p>
                <p>Role: {user?.role || 'user'}</p>
                <div className='mt-4 p-4 bg-yellow-100 text-yellow-800 rounded'>
                    <p>This page is for admin visualization.</p>
                </div>
            </div>
        </div>
    );
};

export default Admin;
