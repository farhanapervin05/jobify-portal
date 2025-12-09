import React, { createContext, useContext, useState } from 'react';
import JobsContainer from '../components/JobsContainer';
import SearchContainer from '../components/SearchContainer';

const AllJobsContext = createContext();

const AllJobs = ({ isPublic }) => {
    const [searchValues, setSearchValues] = useState({
        search: '',
        jobStatus: 'all',
        jobType: 'all',
        sort: 'newest',
    });

    const handleSearch = (e) => {
        setSearchValues({
            ...searchValues,
            [e.target.name]: e.target.value,
        });
    };

    const clearFilters = () => {
        setSearchValues({
            search: '',
            jobStatus: 'all',
            jobType: 'all',
            sort: 'newest',
        });
    };

    return (
        <AllJobsContext.Provider value={{ ...searchValues, handleSearch, clearFilters }}>
            <div className='p-8 max-w-7xl mx-auto'>
                <h2 className='text-3xl font-bold text-gray-900 mb-8'>Find Jobs</h2>
                <SearchContainer
                    search={searchValues.search}
                    jobStatus={searchValues.jobStatus}
                    jobType={searchValues.jobType}
                    sort={searchValues.sort}
                    handleSearch={handleSearch}
                    clearFilters={clearFilters}
                />
                <JobsContainer searchValues={searchValues} isPublic={isPublic} />
            </div>
        </AllJobsContext.Provider>
    );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
