import React, { useEffect, useState } from 'react';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import moment from 'moment';
import { FaBriefcase, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const { data } = await customFetch.get('/applications');
                setApplications(data.applications || []);
            } catch (error) {
                toast.error(error?.response?.data?.msg || 'Failed to load applications');
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    if (loading) return (
        <div className='flex items-center justify-center p-10'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
        </div>
    );

    if (applications.length === 0) return (
        <div className='p-8 text-center'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>No Applications Yet</h2>
            <p className='text-gray-500 mb-6'>You haven't applied to any jobs yet. Start your search now!</p>
        </div>
    );

    return (
        <div className='p-8 bg-white min-h-[80vh] rounded-xl border border-gray-100 shadow-sm'>
            <h1 className='text-2xl font-bold text-gray-900 mb-8'>My Applications</h1>
            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <thead>
                        <tr className='text-left border-b border-gray-200'>
                            <th className='pb-4 font-semibold text-gray-600 pl-4'>Company</th>
                            <th className='pb-4 font-semibold text-gray-600'>Position</th>
                            <th className='pb-4 font-semibold text-gray-600'>Date Applied</th>
                            <th className='pb-4 font-semibold text-gray-600'>Status</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                        {applications.map((app) => (
                            <tr key={app._id} className='group hover:bg-gray-50 transition-colors'>
                                <td className='py-4 pl-4'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold'>
                                            {app.job?.company?.charAt(0) || 'C'}
                                        </div>
                                        <div className='font-medium text-gray-900'>{app.job?.company || 'Unknown'}</div>
                                    </div>
                                </td>
                                <td className='py-4'>
                                    <div className='font-medium text-gray-800'>{app.job?.position || 'Unknown Position'}</div>
                                    <div className='text-xs text-gray-500 md:hidden'>{app.job?.jobLocation}</div>
                                </td>
                                <td className='py-4 text-gray-500'>
                                    {moment(app.createdAt).format('MMM Do, YYYY')}
                                </td>
                                <td className='py-4'>
                                    <span className='px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100'>
                                        Applied
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyApplications;
