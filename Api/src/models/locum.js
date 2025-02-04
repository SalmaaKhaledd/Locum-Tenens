import e from "express";
import mongoose from "mongoose";

const locumSchema= new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
  },
  specialty: { 
    type: String,
    required: true, 
  },
  availability: [Date], // List of available dates
  experience: { 
      type: Number, 
      required: true,
  } // Years of experience
}, { timestamps: true });

const Locum = mongoose.model('Locum', locumSchema);

export default Locum;

//mongoose.Schema.Types.ObjectId is a type used to store a reference to another document in MongoDB.