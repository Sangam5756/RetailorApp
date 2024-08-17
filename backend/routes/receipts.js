import express, { raw } from "express";


import {allReceipts,deleteCustomer,exportToExcel,newCustomer,pending,receiptGenerate,searchById,searchByMobile,updateCustomer,updateStatus,} from "../controller/customer.controller.js";


const router = express.Router();

// Function to generate a numeric receipt ID

router.get("/export-customers", exportToExcel);

router.get("/pending", pending);

router.post("/", newCustomer);

// Retrieve all receipts
router.get("/", allReceipts);

router.get("/search", searchByMobile);

router.get("/:id", searchById);

// Delete a receipt by ID
router.delete("/:id", deleteCustomer);

// Update a receipt by receiptId
router.put("/update", updateCustomer);

// Example shop details

router.get("/receipt-pdf/:receiptId", receiptGenerate);

// Update receipt status
router.patch("/update-status", updateStatus);

export default router;
