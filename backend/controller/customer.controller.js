import { fileURLToPath } from "url";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import Receipt from "../models/Receipt.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import XLSX from "xlsx";
import { error } from "console";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);







const generateReceiptId = () => {
    return Math.floor(100000000 + Math.random() * 900000000).toString(); // Generates a 9-digit number
  };
  
  // Function to create a unique receipt ID
  const createUniqueReceiptId = async () => {
    let receiptId;
    let exists = true;
  
    while (exists) {
      receiptId = generateReceiptId();
      const existingReceipt = await Receipt.findOne({ receiptId });
      if (!existingReceipt) {
        exists = false;
      }
    }
  
    return receiptId;
  };
  

export const pending = async(req,res)=>{

    const data = await Receipt.find({status:"Pending"});
    
    res.status(200).json(data);
  
  }

export const exportToExcel =   async (req, res) => {
    try {
      const receipts = await Receipt.find();
      const data = receipts.map((receipt) => ({
        "Receipt ID": receipt.receiptId,
        "Customer Name": receipt.customerName,
        "Contact Info": receipt.contactInfo,
        "Laptop Brand": receipt.laptopDetails?.brand || "",
        "Laptop Model": receipt.laptopDetails?.model || "",
        "Serial Number": receipt.laptopDetails?.serialNumber || "",
        "Problem Description": receipt.problemDescription,
        "Date Created": new Date(receipt.date).toLocaleDateString(),
      }));
  
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Receipts");
      const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  
      res.setHeader("Content-Disposition", "attachment; filename=receipts.xlsx");
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.send(buffer);
    } catch (err) {
      console.error("Error generating Excel file:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }



export const newCustomer =async (req, res) => {
    const { customerName, contactInfo, laptopDetails, problemDescription } =
      req.body;
  
    const receiptId = await createUniqueReceiptId();
  
    const newReceipt = new Receipt({
      receiptId,
      customerName,
      contactInfo,
      laptopDetails,
      problemDescription,
    });
  
    try {
      const savedReceipt = await newReceipt.save();
      res.json({
        data:savedReceipt,
        message:"Receipt Generated SuccessFully",
        success:true,
        error:false
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

export const allReceipts = async (req, res) => {
    try {
      const receipts = await Receipt.find({});
      res.json(receipts);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

export const searchByMobile =async (req, res) => {
    const { contactInfo } = req.query;
    try {
      const receipts = await Receipt.find({ contactInfo });
      res.json(receipts);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

export const searchById = async (req, res) => {
    try {
      const receipt = await Receipt.findOne({ receiptId: req.params.id });
      if (!receipt) return res.status(404).json({ message: "Receipt not found" });
      res.json(receipt);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

export const deleteCustomer =async (req, res) => {
    try {
      const receipt = await Receipt.findByIdAndDelete(req.params.id);
      if (!receipt) {
        return res.status(404).json({ error: "Receipt not found" });
      }
      res.json({
         message: "Receipt deleted successfully" 
        ,success:true,
        error:false
        });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

export const updateCustomer =async (req, res) => {
    try {

        const { receiptId, customerName, contactInfo, brand, model, serialNumber, problemDescription } = req.body;

        const updatedData = {
            customerName,
            contactInfo,
            problemDescription,
            laptopDetails: {
              brand,
              model,
              serialNumber,
            }
          };

          const updatedReceipt = await Receipt.findOneAndUpdate(
            { receiptId }, // Find the receipt by receiptId
            updatedData,   // Update with the new data
            { new: true }  // Return the updated document
          );
      
          console.log("Updated Receipt:", updatedReceipt);


          res.status(200).json({
            message:"Data Updated Successfull",
            error:false,
            success:true,
            data:updatedReceipt
          })
        



    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }


  const shopDetails = {
    name: "Your Computer Shop",
    address: "123 Shop Street, Tech City, TC 45678",
    contact: "123-456-7890",
    email: "support@yourcomputershop.com",
    website: "www.yourcomputershop.com",
    // logoPath: path.join(__dirname, "../public/images/logo.png"), // Path to your logo
  };
export const receiptGenerate = async (req, res) => {
    try {
      // Find the receipt by ID
      const receipt = await Receipt.findOne({ receiptId: req.params.receiptId });
      if (!receipt) {
        return res.status(404).json({ error: "Receipt not found" });
      }
  
      // Create a new PDF document
      const doc = new PDFDocument();
  
      // Set headers for PDF download
      res.setHeader(
        "Content-disposition",
        `attachment; filename=receipt_${receipt.receiptId}.pdf`
      );
      res.setHeader("Content-type", "application/pdf");
  
      // Pipe the PDF into the response
      doc.pipe(res);
  
      // Add logo to cover the entire top section
      if (fs.existsSync(shopDetails.logoPath)) {
        doc.image(shopDetails.logoPath, 0, 0, {
          width: doc.page.width, // Set width to the full page width
          height: 150, // Adjust height as needed to cover the top section
        });
      }
  
      // Add receipt details
      doc.moveDown(7); // Adjust space between the logo and text
      doc.fontSize(20).text("Receipt for Laptop Drop-off", { align: "center" });
      doc.moveDown(1);
  
      doc
        .fontSize(12)
        .text(`Date: ${new Date(receipt.date).toLocaleDateString()}`, {
          align: "right",
        });
      doc.text(`Receipt ID: ${receipt.receiptId}`, { align: "right" });
      doc.moveDown(1);
  
      // Add customer information with bold and underline
      if (receipt.customerName || receipt.contactInfo) {
        doc
          .font("Helvetica-Bold")
          .fontSize(14)
          .fillColor("black")
          .text("Customer Information:", { underline: false, align: "left" });
        doc.moveTo(0, doc.y).lineTo(doc.page.width, doc.y).stroke(); // Full underline
        doc.moveDown(1);
  
        doc.font("Helvetica").fontSize(12); // Reset font to normal for content
        if (receipt.customerName) doc.text(`Name: ${receipt.customerName}`);
        if (receipt.contactInfo)
          doc.text(`Contact Number: ${receipt.contactInfo}`);
        doc.moveDown(1);
      }
  
      // Add laptop details with bold and underline
      if (receipt.laptopDetails) {
        doc
          .font("Helvetica-Bold")
          .fontSize(14)
          .fillColor("black")
          .text("Laptop Details:", { underline: false, align: "left" });
        doc.moveTo(0, doc.y).lineTo(doc.page.width, doc.y).stroke(); // Full underline
        doc.moveDown(1);
  
        doc.font("Helvetica").fontSize(12); // Reset font to normal for content
        if (receipt.laptopDetails.brand)
          doc.text(`Brand: ${receipt.laptopDetails.brand}`);
        if (receipt.laptopDetails.model)
          doc.text(`Model: ${receipt.laptopDetails.model}`);
        if (receipt.laptopDetails.serialNumber)
          doc.text(`Serial Number: ${receipt.laptopDetails.serialNumber}`);
        doc.moveDown(1);
      }
  
      // Add problem description with bold and underline
      if (receipt.problemDescription) {
        doc
          .font("Helvetica-Bold")
          .fontSize(14)
          .fillColor("black")
          .text("Problem Reported:", { underline: false, align: "left" });
        doc.moveTo(0, doc.y).lineTo(doc.page.width, doc.y).stroke(); // Full underline
        doc.moveDown(1);
  
        doc.font("Helvetica").fontSize(12); // Reset font to normal for content
        doc.text(receipt.problemDescription);
        doc.moveDown(1);
      }
  
      // Add acknowledgment section with bold and underline
      doc
        .font("Helvetica-Bold")
        .fontSize(14)
        .fillColor("black")
        .text("Acknowledgment:", { underline: false, align: "left" });
      doc.moveTo(0, doc.y).lineTo(doc.page.width, doc.y).stroke(); // Full underline
      doc.moveDown(1);
  
      doc.font("Helvetica").fontSize(12); // Reset font to normal for content
      doc.text(
        "I hereby acknowledge that I have handed over the above laptop to Your Computer Shop for diagnosis and repair."
      );
      doc.text(
        "I understand that the shop is not responsible for any existing data loss, and I will be contacted once the diagnosis is complete."
      );
      doc.moveDown(2);
      doc.text("Signature: __________________________", { align: "left" });
      doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: "left" });
  
      // Finalize the PDF
      doc.end();
    } catch (err) {
      console.error("Error generating PDF:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

export const updateStatus = async (req, res) => {
    try {
      const { id, status } = req.body;
  
      if (!["Pending", "Completed"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }
  
      const updatedReceipt = await Receipt.findOneAndUpdate(
        { receiptId: id },
        { status },
        { new: true }
      );
  
      if (!updatedReceipt) {
        return res.status(404).json({ error: "Receipt not found" });
      }
  
      res.json(updatedReceipt);
    } catch (err) {
      console.error("Error updating receipt status:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }