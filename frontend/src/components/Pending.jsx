import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDate } from '../helper/formateDate'; // Ensure correct import
import { Link } from 'react-router-dom';

const Pending = () => {
    const [receipts, setReceipts] = useState([]);

    const pending = async () => {
        const response = await axios.get("http://localhost:5000/api/receipts/pending");
        console.log(response.data);
        setReceipts(response.data);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/receipts/${id}`);
            setReceipts(receipts.filter(receipt => receipt._id !== id));
            alert("Deleted Successfully");
        } catch (error) {
            console.error('Error deleting receipt:', error);
        }
    };

    const handleExport = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/receipts/export-customers', {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'receipts.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            alert("Exported Successfully");
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    };

    const handleMarkAsCompleted = async (id) => {
        try {
            await axios.patch(`http://localhost:5000/api/receipts/update-status`, { id, status: 'Completed' });
            setReceipts(receipts.map(receipt =>
                receipt._id === id ? { ...receipt, status: 'Completed' } : receipt
            ));
            alert("Status updated to Completed");
        } catch (error) {
            console.error('Error updating receipt status:', error);
        }
    };

    const handleDownloadPDF = async (receiptId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/receipts/receipt-pdf/${receiptId}`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `receipt_${receiptId}.pdf`);
            document.body.appendChild(link);
            link.click();
            alert("Downloaded Successfully");
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    useEffect(() => {
        pending();
    }, []);

    return (
        <div className="p-4 bg-white shadow-md rounded-lg mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Pending Receipts</h2>
                <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
                    <Link className="bg-green-500 py-1 px-2 rounded hover:bg-green-700" to={"/search"}>
                        Search
                    </Link>
                    <button
                        onClick={handleExport}
                        className="bg-yellow-500 py-1 px-2 rounded hover:bg-yellow-600"
                    >
                        Export to Excel
                    </button>
                </div>
            </div>

            {receipts.length === 0 ? (
                <p>No receipts found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Receipt ID</th>
                                <th className="border border-gray-300 px-4 py-2">Customer Name</th>
                                <th className="border border-gray-300 px-4 py-2">Contact Info</th>
                                <th className="border border-gray-300 px-4 py-2">Laptop Brand</th>
                                <th className="border border-gray-300 px-4 py-2">Date</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                                <th className="border border-gray-300 px-4 py-2">Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receipts.map((receipt) => (
                                <tr key={receipt.receiptId} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">
                                        <Link
                                            to={`/receipt/${receipt.receiptId}`}
                                            className="text-blue-500 hover:underline"
                                        >
                                            {receipt.receiptId}
                                        </Link>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{receipt.customerName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{receipt.contactInfo}</td>
                                    <td className="border border-gray-300 px-4 py-2">{receipt.laptopDetails?.brand}</td>
                                    <td className="border border-gray-300 px-4 py-2">{formatDate(receipt.date)}</td>
                                    <td className="border border-gray-300 px-4 py-2">{receipt.status}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <Link
                                                to={`/edit-receipt/${receipt.receiptId}`}
                                                className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(receipt._id)}
                                                className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                            {receipt.status === 'Pending' && (
                                                <button
                                                    onClick={() => handleMarkAsCompleted(receipt.receiptId)}
                                                    className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                                                >
                                                    Mark as Completed
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDownloadPDF(receipt.receiptId)}
                                                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                                            >
                                                Download PDF
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Pending;
