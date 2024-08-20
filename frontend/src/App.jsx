import React, { useState } from 'react';
import {Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {

    return (

        <>
           <div className=''>
           <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
            <Navbar />

            <main className="">
                <Outlet />
            </main>

           </div>
        </>
      
    );
};

export default App;
