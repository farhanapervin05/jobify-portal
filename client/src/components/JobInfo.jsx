import React from 'react';

const JobInfo = ({ icon, text }) => {
    return (
        <div className='flex items-center gap-2 mt-2 text-gray-500'>
            <span className='text-gray-400 text-lg flex items-center'>{icon}</span>
            <span className='capitalize'>{text}</span>
        </div>
    );
};

export default JobInfo;
