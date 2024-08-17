import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../helper/formateDate'; // Ensure correct import
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';



const ReceiptDetail = () => {
    const { id } = useParams(); // Get the receipt ID from the URL
    const [receipt, setReceipt] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchReceipt = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/receipts/${id}`);
                setReceipt(response.data);
            } catch (error) {
                console.error('Error fetching receipt details:', error);
            }
        };

        fetchReceipt();
    }, [id]);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/receipts/${id}`);
            console.log(response)
            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/all-receipts")
            }

        } catch (error) {
            console.error('Error deleting receipt:', error);
        }
    };


    if (!receipt) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="max-w-[500px] gap-3 flex flex-col space-x-3 mx-auto p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Receipt Details</h2>
                <p><strong>Receipt ID:</strong> {receipt.receiptId}</p>
                <p><strong>Customer Name:</strong> {receipt.customerName}</p>
                <p><strong>Contact Info:</strong> {receipt.contactInfo}</p>
                <p><strong>Laptop Brand:</strong> {receipt.laptopDetails?.brand}</p>
                <p><strong>Laptop Model:</strong> {receipt.laptopDetails?.model}</p>
                <p><strong>Serial Number:</strong> {receipt.laptopDetails?.serialNumber}</p>
                <p><strong>Problem Description:</strong> {receipt.problemDescription}</p>
                <p><strong>Date:</strong> {formatDate(receipt.date)}</p>
                <p><strong>Status:</strong> {receipt.status}</p>
                <div>
                    <Link
                        to={`/edit-receipt/${receipt.receiptId}`}
                        className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 mr-2"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => handleDelete(receipt._id)}
                        className="bg-red-500 text-white p-1 rounded hover:bg-red-600 mr-2"
                    >
                        Delete
                    </button>
                </div>

            </div>

        </div>
    );
};

export default ReceiptDetail;
