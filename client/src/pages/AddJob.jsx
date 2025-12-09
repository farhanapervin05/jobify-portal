import { useState } from 'react';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import FormRow from '../components/FormRow';
import FormRowSelect from '../components/FormRowSelect';

const AddJob = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [values, setValues] = useState({
        position: '',
        company: '',
        jobLocation: '',
        jobType: 'full-time',
        status: 'pending',
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const clearValues = () => {
        setValues({
            position: '',
            company: '',
            jobLocation: '',
            jobType: 'full-time',
            status: 'pending',
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await customFetch.post('/jobs', values);
            toast.success('Job created successfully');
            clearValues();
        } catch (error) {
            toast.error(error?.response?.data?.msg || 'Failed to create job');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className='bg-white rounded-xl border border-gray-100 shadow-sm p-8'>
            <h4 className='text-2xl font-bold text-gray-900 mb-8'>Add Job</h4>
            <form className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-end' onSubmit={onSubmit}>
                <FormRow
                    type='text'
                    name='position'
                    value={values.position}
                    handleChange={handleChange}
                    labelText='Position'
                    placeholder='e.g. Frontend Developer'
                />
                <FormRow
                    type='text'
                    name='company'
                    value={values.company}
                    handleChange={handleChange}
                    labelText='Company'
                    placeholder='e.g. Google'
                />
                <FormRow
                    type='text'
                    name='jobLocation'
                    value={values.jobLocation}
                    handleChange={handleChange}
                    labelText='Job Location'
                    placeholder='e.g. New York, NY'
                />
                <FormRowSelect
                    name='status'
                    value={values.status}
                    handleChange={handleChange}
                    labelText='Job Status'
                    list={['interview', 'declined', 'pending']}
                />
                <FormRowSelect
                    name='jobType'
                    value={values.jobType}
                    handleChange={handleChange}
                    labelText='Job Type'
                    list={['full-time', 'part-time', 'remote', 'internship']}
                />

                <div className='flex gap-4 mt-4'>
                    <button
                        type='button'
                        className='w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors'
                        onClick={clearValues}
                    >
                        Clear
                    </button>
                    <button
                        type='submit'
                        className='w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AddJob;
