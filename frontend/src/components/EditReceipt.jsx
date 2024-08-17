import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditReceipt = () => {
    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        receiptId: id, // Initialize with the receiptId from URL
        customerName: '',
        contactInfo: '',
        brand: '',
        model: '',
        serialNumber: '',
        problemDescription: ''
    });

    useEffect(() => {
        const fetchReceipt = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/receipts/${id}`);
                setFormData({
                    receiptId: response.data.receiptId, // Ensure receiptId is set
                    customerName: response.data.customerName,
                    contactInfo: response.data.contactInfo,
                    brand: response.data.laptopDetails.brand,
                    model: response.data.laptopDetails.model,
                    serialNumber: response.data.laptopDetails.serialNumber,
                    problemDescription: response.data.problemDescription
                });
            } catch (error) {
                console.error('Error fetching receipt:', error);
            }
        };

        fetchReceipt();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response =   await axios.put(`http://localhost:5000/api/receipts/update`, formData);

            navigate(`/receipt/${formData.receiptId}`);
            console.log(response)
            if(response.data.success){
                toast.success(response.data.message)
            }
        } catch (error) {
            console.error('Error updating receipt:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Receipt</h2>
            <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
                <label className="block mb-2 font-bold text-gray-700">
                    Customer Name
                    <input
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        placeholder="Enter Customer Name"
                        className="border border-gray-300 p-2 rounded mb-4 w-full"
                        required
                    />
                </label>

                <label className="block mb-2 font-bold text-gray-700">
                    Contact Info
                    <input
                        name="contactInfo"
                        value={formData.contactInfo}
                        onChange={handleChange}
                        placeholder="Enter Contact Info"
                        className="border border-gray-300 p-2 rounded mb-4 w-full"
                        required
                    />
                </label>

                <label className="block mb-2 font-bold text-gray-700">
                    Laptop Brand
                    <input
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        placeholder="Enter Laptop Brand"
                        className="border border-gray-300 p-2 rounded mb-4 w-full"
                        required
                    />
                </label>

                <label className="block mb-2 font-bold text-gray-700">
                    Laptop Model
                    <input
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        placeholder="Enter Laptop Model"
                        className="border border-gray-300 p-2 rounded mb-4 w-full"
                        required
                    />
                </label>

                <label className="block mb-2 font-bold text-gray-700">
                    Serial Number
                    <input
                        name="serialNumber"
                        value={formData.serialNumber}
                        onChange={handleChange}
                        placeholder="Enter Serial Number"
                        className="border border-gray-300 p-2 rounded mb-4 w-full"
                        required
                    />
                </label>

                <label className="block mb-2 font-bold text-gray-700">
                    Problem Description
                    <textarea
                        name="problemDescription"
                        value={formData.problemDescription}
                        onChange={handleChange}
                        placeholder="Describe the problem"
                        className="border border-gray-300 p-2 rounded mb-4 w-full"
                        required
                    />
                </label>

                <button
                    type="submit"
                    className="bg-blue-500  text-center text-white p-2 rounded hover:bg-blue-600"
                >
                    Update Receipt
                </button>
            </form>

        </div>
    );
};


export default EditReceipt;
