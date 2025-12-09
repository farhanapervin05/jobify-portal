import React, { useEffect, useState } from 'react';
import { FormRow, FormRowSelect } from '../components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

const EditJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [values, setValues] = useState({
        company: '',
        position: '',
        jobLocation: '',
        status: '',
        jobType: '',
    });

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const { data } = await customFetch.get(`/jobs/${id}`);
                const job = data.job;
                setValues({
                    company: job.company,
                    position: job.position,
                    jobLocation: job.jobLocation,
                    status: job.status,
                    jobType: job.jobType,
                });
                setIsLoading(false);
            } catch (error) {
                toast.error(error?.response?.data?.msg || 'Failed to fetch job');
                navigate('/dashboard/all-jobs');
            }
        };
        fetchJob();
    }, [id, navigate]);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await customFetch.patch(`/jobs/${id}`, values);
            toast.success('Job updated successfully');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error?.response?.data?.msg || 'Failed to update job');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-full'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
            </div>
        );
    }

    return (
        <section className='bg-white rounded-xl shadow-sm border border-gray-100 p-8'>
            <h3 className='text-2xl font-bold text-gray-800 mb-8'>Edit Job</h3>
            <form className='grid gap-6 md:grid-cols-2 lg:grid-cols-3' onSubmit={handleSubmit}>
                <FormRow
                    type='text'
                    name='position'
                    value={values.position}
                    handleChange={handleChange}
                />
                <FormRow
                    type='text'
                    name='company'
                    value={values.company}
                    handleChange={handleChange}
                />
                <FormRow
                    type='text'
                    name='jobLocation'
                    labelText='job location'
                    value={values.jobLocation}
                    handleChange={handleChange}
                />
                <FormRowSelect
                    name='status'
                    value={values.status}
                    handleChange={handleChange}
                    list={['interview', 'declined', 'pending']}
                />
                <FormRowSelect
                    name='jobType'
                    labelText='job type'
                    value={values.jobType}
                    handleChange={handleChange}
                    list={['full-time', 'part-time', 'remote', 'internship']}
                />

                <div className='md:col-span-2 lg:col-span-3 flex justify-end gap-4 mt-4'>
                    <button
                        type='button'
                        className='px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors'
                        onClick={() => navigate('/dashboard')}
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-70'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default EditJob;
