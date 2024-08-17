import React, { useState } from 'react';
import axios from 'axios';

const SearchReceipt = () => {
  const [receiptId, setReceiptId] = useState('');
  const [receiptData, setReceiptData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/receipts/${receiptId}`);
      setReceiptData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Search Customer By Id</h2>
      <div className="mb-4">
        <input
          value={receiptId}
          onChange={(e) => setReceiptId(e.target.value)}
          placeholder="Enter Receipt ID"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleSearch}
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
      {receiptData && (
        <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-white">
          <h3 className="text-xl font-semibold mb-2">Receipt Details</h3>
          <p><strong>Customer Name:</strong> {receiptData.customerName}</p>
          <p><strong>Contact Info:</strong> {receiptData.contactInfo}</p>
          <p><strong>Laptop Brand:</strong> {receiptData.laptopDetails.brand}</p>
          <p><strong>Laptop Model:</strong> {receiptData.laptopDetails.model}</p>
          <p><strong>Serial Number:</strong> {receiptData.laptopDetails.serialNumber}</p>
          <p><strong>Problem Description:</strong> {receiptData.problemDescription}</p>
        </div>
      )}
    </div>
  );
};

export default SearchReceipt;
