import React, { useState, useEffect } from 'react';
import Job from './Job';
import customFetch from '../utils/customFetch';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const JobsContainer = ({ searchValues, isPublic }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 6;

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data } = await customFetch.get('/jobs');
                setJobs(data.jobs || []);
            } catch {
                setError('Failed to load jobs');
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    // Helper for sorting
    const sortJobs = (a, b) => {
        switch (searchValues.sort) {
            case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt);
            case 'a-z': return a.position.localeCompare(b.position);
            case 'z-a': return b.position.localeCompare(a.position);
            default: return new Date(b.createdAt) - new Date(a.createdAt); // newest
        }
    };

    // Filter Logic
    const filteredJobs = jobs.filter(job => {
        const matchSearch = searchValues.search === '' ||
            [job.position, job.company, job.jobLocation].some(v => v.toLowerCase().includes(searchValues.search.toLowerCase()));

        const matchStatus = searchValues.jobStatus === 'all' || job.status === searchValues.jobStatus;
        const matchType = searchValues.jobType === 'all' || job.jobType === searchValues.jobType;

        return matchSearch && matchStatus && matchType;
    }).sort(sortJobs);

    // Pagination Logic
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    const paginatedJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

    const prevPage = () => {
        setCurrentPage((old) => (old === 1 ? totalPages : old - 1));
    };

    const nextPage = () => {
        setCurrentPage((old) => (old === totalPages ? 1 : old + 1));
    };

    // Mock Jobs for Empty State
    const mockJobs = [
        {
            _id: 'mock-1',
            position: 'Frontend Developer',
            company: 'TechCorp',
            jobLocation: 'San Francisco, CA',
            jobType: 'full-time',
            createdAt: new Date().toISOString(),
            status: 'interview',
        },
        {
            _id: 'mock-2',
            position: 'Backend Engineer',
            company: 'DataSystems',
            jobLocation: 'New York, NY',
            jobType: 'remote',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            status: 'pending',
        },
        {
            _id: 'mock-3',
            position: 'Product Designer',
            company: 'Creative Studio',
            jobLocation: 'Austin, TX',
            jobType: 'part-time',
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            status: 'declined',
        },
        {
            _id: 'mock-4',
            position: 'Full Stack Developer',
            company: 'StartupHub',
            jobLocation: 'Remote',
            jobType: 'full-time',
            createdAt: new Date(Date.now() - 259200000).toISOString(),
            status: 'interview',
        },
        {
            _id: 'mock-5',
            position: 'DevOps Engineer',
            company: 'CloudNet',
            jobLocation: 'Seattle, WA',
            jobType: 'contract',
            createdAt: new Date(Date.now() - 345600000).toISOString(),
            status: 'pending',
        },
        {
            _id: 'mock-6',
            position: 'Marketing Manager',
            company: 'GrowthX',
            jobLocation: 'Chicago, IL',
            jobType: 'full-time',
            createdAt: new Date(Date.now() - 432000000).toISOString(),
            status: 'pending',
        },
    ];

    const handleJobDelete = (deletedJobId) => {
        setJobs(jobs.filter(job => job._id !== deletedJobId));
    };

    if (loading) return <div className='mt-16 text-center'><div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div></div>;
    if (error) return <div className='mt-16 text-center text-red-500 font-bold'>{error}</div>;

    // If no real jobs, filter and sort mock jobs
    let displayJobs;
    let isMockData = false;

    if (filteredJobs.length > 0) {
        displayJobs = paginatedJobs;
    } else {
        // Apply same filtering logic to mock jobs
        const filteredMockJobs = mockJobs.filter(job => {
            const matchSearch = searchValues.search === '' ||
                [job.position, job.company, job.jobLocation].some(v => v.toLowerCase().includes(searchValues.search.toLowerCase()));

            const matchStatus = searchValues.jobStatus === 'all' || job.status === searchValues.jobStatus;
            const matchType = searchValues.jobType === 'all' || job.jobType === searchValues.jobType;

            return matchSearch && matchStatus && matchType;
        }).sort(sortJobs);

        displayJobs = filteredMockJobs;
        isMockData = true;
    }

    const displayCount = filteredJobs.length > 0 ? filteredJobs.length : displayJobs.length;

    return (
        <div className='mt-10'>
            <h5 className='mb-6 font-bold text-xl text-gray-700'>
                {filteredJobs.length > 0
                    ? `${filteredJobs.length} job${filteredJobs.length !== 1 && 's'} found`
                    : displayJobs.length > 0
                        ? `${displayJobs.length} sample job${displayJobs.length !== 1 && 's'} (No live results found)`
                        : 'No jobs match your filters'}
            </h5>

            {displayJobs.length > 0 ? (
                <>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {displayJobs.map((job) => (
                            <Job key={job._id} {...job} isPublic={isPublic || isMockData} onDelete={handleJobDelete} />
                        ))}
                    </div>

                    {totalPages > 1 && filteredJobs.length > 0 && (
                        <div className='mt-12 flex justify-end gap-2'>
                            <button onClick={prevPage} className='p-3 rounded-lg bg-white border border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors'>
                                <FaChevronLeft />
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-10 h-10 rounded-lg font-bold transition-colors ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button onClick={nextPage} className='p-3 rounded-lg bg-white border border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors'>
                                <FaChevronRight />
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className='mt-16 text-center text-gray-500 font-medium'>
                    Try adjusting your filters to see more results.
                </div>
            )}
        </div>
    );
};

export default JobsContainer;
