import React, { useState, useEffect } from 'react';

const PinAuth = ({ onAuthenticate }) => {
    const [pin, setPin] = useState('');
    const predefinedPin = '1234'; // Replace with your predefined PIN

    useEffect(() => {
        // Check if the PIN is already stored in localStorage and not expired
        const storedPin = localStorage.getItem('auth_pin');
        const expiryTime = localStorage.getItem('auth_expiry');

        if (storedPin && expiryTime && new Date().getTime() < expiryTime) {
            onAuthenticate(true);
        }
    }, [onAuthenticate]);

    const handleInputChange = (e) => {
        setPin(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pin === predefinedPin) {
            // Set the PIN in localStorage with an expiry time of 1 hour
            const expiryTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour from now
            localStorage.setItem('auth_pin', pin);
            localStorage.setItem('auth_expiry', expiryTime);
            onAuthenticate(true);
        } else {
            alert('Incorrect PIN. Please try again.');
            setPin('');
        }
    };

    return (
        <div className="flex   items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 w-[500px] shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Enter PIN</h2>
                <form onSubmit={handleSubmit} className="text-center">
                    <input
                        type="password"
                        value={pin}
                        onChange={handleInputChange}
                        maxLength="4"
                        className="border border-gray-300 p-2  text-center text-lg w-50 mb-4"
                        autoFocus
                    />
                    <div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PinAuth;
