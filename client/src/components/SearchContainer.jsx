import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchContainer = ({ search, jobStatus, jobType, sort, handleSearch, clearFilters }) => {
    return (
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 hover:shadow-md transition-shadow'>
            <h4 className='text-xl font-bold text-gray-900 mb-6'>Search Form</h4>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {/* Search Position */}
                <div>
                    <label htmlFor='search' className='block text-sm font-medium text-gray-700 mb-1'>Search</label>
                    <div className='relative'>
                        <input
                            type='text'
                            name='search'
                            value={search}
                            onChange={handleSearch}
                            placeholder='Search by position...'
                            className='w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none'
                        />
                        <FaSearch className='absolute left-3 top-3 text-gray-400' />
                    </div>
                </div>

                {/* Job Status */}
                <div>
                    <label htmlFor='jobStatus' className='block text-sm font-medium text-gray-700 mb-1'>Job Status</label>
                    <select
                        name='jobStatus'
                        value={jobStatus}
                        onChange={handleSearch}
                        className='w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-white'
                    >
                        {['all', 'pending', 'interview', 'declined'].map((status) => (
                            <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                        ))}
                    </select>
                </div>

                {/* Job Type */}
                <div>
                    <label htmlFor='jobType' className='block text-sm font-medium text-gray-700 mb-1'>Job Type</label>
                    <select
                        name='jobType'
                        value={jobType}
                        onChange={handleSearch}
                        className='w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-white'
                    >
                        {['all', 'full-time', 'part-time', 'remote', 'internship'].map((type) => (
                            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                        ))}
                    </select>
                </div>

                {/* Sort */}
                <div>
                    <label htmlFor='sort' className='block text-sm font-medium text-gray-700 mb-1'>Sort By</label>
                    <select
                        name='sort'
                        value={sort}
                        onChange={handleSearch}
                        className='w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-white'
                    >
                        <option value='newest'>Newest</option>
                        <option value='oldest'>Oldest</option>
                        <option value='a-z'>A-Z</option>
                        <option value='z-a'>Z-A</option>
                    </select>
                </div>

                {/* Clear Filters Button */}
                <div className='flex items-end'>
                    <button
                        type='button'
                        onClick={clearFilters}
                        className='w-full px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors'
                    >
                        Clear Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchContainer;
