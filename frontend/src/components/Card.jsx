import React from 'react'
import { formatDate } from '../helper/formateDate';
import axios from 'axios';

const Card = ({receipts}) => {

    const handleDownloadPDF = async (receiptId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/receipts/receipt-pdf/${receiptId}`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `receipt_${receiptId}.pdf`);
            document.body.appendChild(link);
            link.click();
            alert("Downloaded Successfully")

        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

  
    return (
        <div>
            <table className="w-full border-collapse border border-gray-300 mt-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Receipt ID</th>
                            <th className="border border-gray-300 px-4 py-2">Customer Name</th>
                            <th className="border border-gray-300 px-4 py-2">Contact Info</th>
                            <th className="border border-gray-300 px-4 py-2">Laptop Brand</th>
                            <th className="border border-gray-300 px-4 py-2">Laptop Model</th>
                            <th className="border border-gray-300 px-4 py-2">Serial Number</th>
                            <th className="border border-gray-300 px-4 py-2">Problem Description</th>
                            <th className="border border-gray-300 px-4 py-2">Date Created</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receipts.map((receipt) => (
                            <tr key={receipt.receiptId}>
                                <td className="border border-gray-300 px-4 py-2">{receipt.receiptId}</td>
                                <td className="border border-gray-300 px-4 py-2">{receipt.customerName}</td>
                                <td className="border border-gray-300 px-4 py-2">{receipt.contactInfo}</td>
                                <td className="border border-gray-300 px-4 py-2">{receipt.laptopDetails.brand}</td>
                                <td className="border border-gray-300 px-4 py-2">{receipt.laptopDetails.model}</td>
                                <td className="border border-gray-300 px-4 py-2">{receipt.laptopDetails.serialNumber}</td>
                                <td className="border border-gray-300 px-4 py-2">{receipt.problemDescription}</td>
                                <td className="border border-gray-300 px-4 py-2">{formatDate(receipt.date)}</td>
                                <td className="border border-gray-300 px-4 py-2">{receipt.status}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => handleDownloadPDF(receipt.receiptId)}
                                        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                                    >
                                        Download PDF
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    )
}

export default Card