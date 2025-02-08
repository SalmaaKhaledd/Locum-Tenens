import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema({
   locum: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
    shift: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Shift', 
      required: true },
    status: { 
      type: String, 
      enum: ['Pending', 'Accepted', 'Rejected'], 
      default: 'Pending' }
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

export default Application;