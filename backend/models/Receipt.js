import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema({
  receiptId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  contactInfo: { type: String, required: true },
  laptopDetails: {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    serialNumber: { type: String, required: true },
  },
  problemDescription: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' } // Add status field

});

const receipt = mongoose.model("receipt",receiptSchema);

export default receipt;