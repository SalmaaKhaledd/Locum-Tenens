import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
  },
  location: { 
    type: String,
    required: true, 
  },
 shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shift' }]  // References all shifts posted by the hospital
}, { timestamps: true });

const Hospital = mongoose.model('Hospital', hospitalSchema);

export default Hospital;