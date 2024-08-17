import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className=' flex  items-center justify-center  h-[92vh] '>
     

      <div className='  gap-y-2 gap-2 grid grid-cols-2 lg:flex items-center justify-center lg:gap-5'>
        <Link to="/new-Customer">
          <div className='bg-red-700 w-32 h-32 rounded-md transition-all duration-500  hover:bg-red-800 hover:shadow-lg hover:scale-110 flex items-center justify-center'>
            <button className='text-white font-bold'>
              NEW CUSTOMER
            </button>
          </div>
        </Link>

        <Link to="/all-receipts">
          <div className='bg-blue-700 w-32 h-32 rounded-md transition-all duration-500  hover:bg-blue-800 hover:shadow-lg hover:scale-110 flex items-center justify-center'>
            <button className='text-white font-bold'>
              ALL CUSTOMER
            </button>
          </div>
        </Link>

        <Link to="/search-by-mobile">
          <div className='bg-green-700 w-32 h-32 rounded-md transition-all duration-500  hover:bg-green-800 hover:shadow-lg hover:scale-110 flex items-center justify-center'>
            <button className='text-white font-bold'>
              SEARCH
            </button>
          </div>
        </Link>

        <Link to="/pending">
          <div className='bg-purple-700 w-32 h-32 rounded-md transition-all duration-500  hover:bg-purple-800 hover:shadow-lg hover:scale-110 flex items-center justify-center'>
            <button className='text-white font-bold'>
              PENDING
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
