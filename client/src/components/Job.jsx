import React, { useState } from 'react';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import JobInfo from './JobInfo';
import moment from 'moment';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

const Job = ({
    _id,
    position,
    company,
    jobLocation,
    jobType,
    createdAt,
    status,
    isPublic,
    onDelete,
}) => {
    const date = moment(createdAt).format('MMM Do, YYYY');
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this job?')) return;

        setIsDeleting(true);
        try {
            await customFetch.delete(`/jobs/${_id}`);
            toast.success('Job deleted successfully');
            if (onDelete) onDelete(_id);
        } catch (error) {
            toast.error(error?.response?.data?.msg || 'Failed to delete job');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <article className='bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group'>
            <header className='p-6 border-b border-gray-50 flex items-start justify-between'>
                <div className='flex items-center gap-4'>
                    <div className='w-14 h-14 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-xl grid place-items-center text-2xl font-bold text-white shadow-md shadow-blue-200'>
                        {company.charAt(0)}
                    </div>
                    <div>
                        <h5 className='text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors'>{position}</h5>
                        <p className='text-sm text-gray-500 font-medium'>{company}</p>
                    </div>
                </div>
            </header>

            <div className='p-6 flex-1'>
                <div className='grid grid-cols-2 gap-y-4 mb-6'>
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaCalendarAlt />} text={date} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />

                    <div className='flex items-center'>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
                            ${status === 'pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
                                status === 'interview' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                                    'bg-red-50 text-red-700 border border-red-100'}`}>
                            {status}
                        </div>
                    </div>
                </div>
            </div>

            {isPublic && (
                <footer className='p-6 bg-gray-50/50 border-t border-gray-100 rounded-b-xl'>
                    <Link to={`/job/${_id}`} className='block w-full text-center px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-200'>
                        View Details
                    </Link>
                </footer>
            )}

            {!isPublic && (
                <footer className='p-6 bg-gray-50/50 border-t border-gray-100 rounded-b-xl flex items-center gap-3'>
                    <Link to={`../edit-job/${_id}`} className='flex-1 text-center px-4 py-2 bg-white text-gray-700 font-medium text-sm rounded-lg border border-gray-200 hover:bg-black hover:text-white hover:border-black transition-all'>
                        Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className='flex-1 text-center px-4 py-2 bg-red-50 text-red-600 font-medium text-sm rounded-lg border border-red-100 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </footer>
            )}
        </article>
    );
};

export default Job;
