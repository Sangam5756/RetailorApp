import React, { useState } from 'react'
import axios from "axios"
import { useParams, useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"

const CreateReceipt = () => {

    const [formData, setFormData] = useState({
        customerName: '',
        contactInfo: '',
        brand: '',
        model: '',
        serialNumber: '',
        problemDescription: ''
    });

    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/receipts', {
                customerName: formData.customerName,
                contactInfo: formData.contactInfo,
                laptopDetails: {
                    brand: formData.brand,
                    model: formData.model,
                    serialNumber: formData.serialNumber,
                },
                problemDescription: formData.problemDescription,
            });

            console.log(response)
            if(response.data.success){
                toast.success(`Receipt Created! Receipt ID: ${response.data.data.receiptId}`);
                navigate('/all-receipts');

            }
            if(response.data.error){
                toast.error(response.data.error)
            }


        } catch (error) {
            console.error(error);
        }
    };
    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value })

    };
    



    return (
        <div className="max-w-lg mx-auto p-4 mb-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">New Customer</h2>
        <form onSubmit={handleSubmit} className=" grid grid-cols-2 gap-5 ">
            <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="customerName">Customer Name</label>
                <input
                    id="customerName"
                    name="customerName"
                    type="text"
                    placeholder="Customer Name"
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="contactInfo">Contact Info</label>
                <input
                    id="contactInfo"
                    name="contactInfo"
                    type='text'
                    placeholder="Contact Info"
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="brand">Laptop Brand</label>
                <input
                    id="brand"
                    name="brand"
                    type="text"
                    placeholder="Laptop Brand"
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="model">Laptop Model</label>
                <input
                    id="model"
                    name="model"
                    type="text"
                    placeholder="Laptop Model"
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="serialNumber">Serial Number</label>
                <input
                    id="serialNumber"
                    name="serialNumber"
                    type="text"
                    placeholder="Serial Number"
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="problemDescription">Problem Description</label>
                <textarea
                    id="problemDescription"
                    name="problemDescription"
                    placeholder="Problem Description"
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
            </div>
            <button
                type="submit"
                className="w-full mb-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Create Receipt
            </button>
        </form>
    </div>
    )
}

export default CreateReceipt