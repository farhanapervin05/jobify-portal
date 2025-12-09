import React from 'react';

const FormRowSelect = ({ name, value, handleChange, labelText, list }) => {
    return (
        <div className='mb-4'>
            <label htmlFor={name} className='block text-sm font-medium text-gray-700 mb-1 capitalize'>
                {labelText || name}
            </label>
            <select
                name={name}
                value={value}
                onChange={handleChange}
                className='w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50 focus:bg-white'
            >
                {list.map((itemValue, index) => {
                    return (
                        <option key={index} value={itemValue}>
                            {itemValue}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default FormRowSelect;
