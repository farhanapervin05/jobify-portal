import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaBuilding, FaCheckCircle } from 'react-icons/fa';
import moment from 'moment';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('jobify_user')));

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const { data } = await customFetch.get(`/jobs/${id}`);
                setJob(data.job);
            } catch (error) {
                toast.error(error?.response?.data?.msg || 'Failed to load job');
                navigate('/jobs-listing');
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id, navigate]);

    const handleApply = async () => {
        if (!user) {
            toast.error('Please login to apply');
            navigate('/user-authentication');
            return;
        }
        setApplying(true);
        try {
            await customFetch.post('/applications', { jobId: id });
            toast.success('Application submitted successfully!');
            navigate('/dashboard/applications');
        } catch (error) {
            toast.error(error?.response?.data?.msg || 'Application failed');
        } finally {
            setApplying(false);
        }
    };

    if (loading) return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
        </div>
    );

    if (!job) return null;

    const date = moment(job.createdAt).format('MMM Do, YYYY');

    return (
        <div className='min-h-screen bg-gray-50 pt-20 pb-10'>
            <div className='max-w-4xl mx-auto px-6'>
                <Link to='/jobs-listing' className='text-blue-600 hover:underline mb-6 inline-block'>&larr; Back to Jobs</Link>

                <div className='bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden'>
                    <div className='p-8 md:p-12 border-b border-gray-100'>
                        <div className='flex flex-col md:flex-row gap-6 md:items-start'>
                            <div className='w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-200'>
                                {job.company.charAt(0)}
                            </div>
                            <div className='flex-1'>
                                <h1 className='text-3xl font-bold text-gray-900 mb-2'>{job.position}</h1>
                                <div className='flex items-center gap-2 text-lg text-gray-600 font-medium mb-6'>
                                    <FaBuilding className='text-gray-400' />
                                    {job.company}
                                </div>
                                <div className='flex flex-wrap gap-4'>
                                    <span className='px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold border border-blue-100 flex items-center gap-2'>
                                        <FaBriefcase /> {job.jobType}
                                    </span>
                                    <span className={`px-4 py-2 rounded-lg text-sm font-semibold border flex items-center gap-2 ${job.status === 'interview' ? 'bg-green-50 text-green-700 border-green-100' :
                                            job.status === 'declined' ? 'bg-red-50 text-red-700 border-red-100' :
                                                'bg-yellow-50 text-yellow-700 border-yellow-100'
                                        }`}>
                                        <div className={`w-2 h-2 rounded-full ${job.status === 'interview' ? 'bg-green-600' :
                                                job.status === 'declined' ? 'bg-red-600' :
                                                    'bg-yellow-600'
                                            }`}></div>
                                        {job.status}
                                    </span>
                                    <span className='px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold border border-gray-200 flex items-center gap-2'>
                                        <FaMapMarkerAlt /> {job.jobLocation}
                                    </span>
                                    <span className='px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold border border-gray-200 flex items-center gap-2'>
                                        <FaCalendarAlt /> {date}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='p-8 md:p-12 bg-gray-50/50'>
                        <h3 className='text-xl font-bold text-gray-900 mb-4'>Job Description</h3>
                        <p className='text-gray-600 leading-relaxed mb-8'>
                            {/* Placeholder description since DB doesn't have one yet */}
                            We are looking for a talented {job.position} to join our team at {job.company}.
                            This is a {job.jobType} opportunity located in {job.jobLocation}.
                            You will be working on exciting projects and collaborating with a skilled team.
                        </p>

                        {user && user.role === 'student' ? (
                            <button
                                onClick={handleApply}
                                disabled={applying}
                                className='px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto'
                            >
                                {applying ? 'Submitting Application...' : 'Apply Now'}
                            </button>
                        ) : !user ? (
                            <div className='bg-blue-50 border border-blue-100 rounded-xl p-6'>
                                <p className='text-blue-800 font-medium mb-4'>Login as a Student to apply for this position.</p>
                                <Link to='/user-authentication' className='inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700'>
                                    Login to Apply
                                </Link>
                            </div>
                        ) : (
                            <div className='bg-gray-100 border border-gray-200 rounded-xl p-6 text-gray-500 font-medium'>
                                Recruiters/Admins cannot apply to jobs.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
