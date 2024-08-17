import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import CreateReceipt from '../components/CreateReceipt';
import SearchReceipt from '../components/SearchReceipt';
import AllReceipts from '../components/AllReceipts';
import SearchByMobileNumber from '../components/SearchByMobileNumber';
import EditReceipt from '../components/EditReceipt';
import Pending from '../components/Pending';
import ReceiptDetail from '../components/ReceiptDetail';
import Home from '../components/Home';
import PinAuth from '../components/PinAuth'; // Import PinAuth


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "new-Customer",
        element: <CreateReceipt />,
      },
      {
        path: "search",
        element: <SearchReceipt />
      },
      {
        path: "all-receipts",
        element: <AllReceipts />
      },
      {
        path: "search-by-mobile",
        element: <SearchByMobileNumber />,
      },
       {
        path: "edit-receipt/:id",
        element: <EditReceipt />
      }
      ,
       {
        path: "pending",
        element: <Pending />
      },
       {
        path: "receipt/:id",
        element: <ReceiptDetail />
      }
      


    ],
  },
]);

export default router;


// 1:02