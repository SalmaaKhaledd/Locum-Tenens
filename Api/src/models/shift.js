import mongoose from "mongoose";

//stores open shifts posted by hospitals
const shiftSchema = new mongoose.Schema({
  hospital: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
  },
  date: { 
    type: Date,
    required: true, 
  },
  time: { 
    type: String,
    required: true, 
  },
  specialty: { 
    type: String,
    required: true, 
  },
  location: 
  { type: String, required: true 
  },
  locum: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  status: { 
    type: String, 
    enum: ['Open', 'Filled', 'Closed'], 
    default: 'Open' 
  },
  //applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Locum' }] // Locums who applied for this shift
}, { timestamps: true });

const Shift = mongoose.model('Shift', shiftSchema);

export default Shift;