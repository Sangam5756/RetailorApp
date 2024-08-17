import React, { useState } from 'react';
import axios from 'axios';
import { formatDate } from '../helper/formateDate';
import Card from './Card';
const SearchByMobileNumber = () => {
    const [contactInfo, setContactInfo] = useState('');
    const [receipts, setReceipts] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/receipts/search', {
                params: { contactInfo }
            });
            setReceipts(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching receipts:', error);
            setError('No receipts found for this contact info.');
            setReceipts([]);
        }
    };

    

  
    return (
        <div className="max-w-fit mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 ">Search Customer by Mobile Number</h2>
            <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="Enter Mobile Number"
                className="border border-gray-300 p-2 rounded mb-4 w-full"
            />
            {/* Search Button */}
            <button
                onClick={handleSearch}
                className="bg-blue-500 ml-40 text-white  p-2 rounded hover:bg-blue-600"
            >
                Search
            </button>
            {
                receipts.length === 0 && (<p>No user found</p>)
            }

            {error && <p className="text-red-500 mt-4">{error}</p>}
            {receipts.length > 0 && (
               <Card receipts={receipts} />
            )}
        </div>
    );
};

export default SearchByMobileNumber;
