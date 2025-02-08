import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  }, 
  role: { 
    type: String, 
    enum: ['locum', 'hospital',], 
    required: true 
  },
  specialization: {
    type: String,
    //dynamically sets whether a field is required based on the user’s role
    required: function () {
      return this.role === 'locum';
    },
  },
  qualifications: {
    type: String,
    required: function () {
      return this.role === 'locum';
    },
  },
  experience: {
    type: Number,
    required: function () {
      return this.role === 'locum';
    },
  },
  availability: {
    //array of dates 
    //type: [Date],
    type: String,
    required: function () {
      return this.role === 'locum';
    },
  },
  hospitalName: {
    type: String,
    required: function () {
      return this.role === 'hospital';
    },
  },
  department: {
    type: String,
    required: function () {
      return this.role === 'hospital';
    },
  },
  location: {
    type: String,
    required: function () {
      return this.role === 'hospital';
    },
  },
  contactInfo: {
    type: String,
    required: function () {
      return this.role === 'hospital';
    },
  },
  //shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shift' }]  // References all shifts posted by the hospital
},{timestamps: true});  

const User = mongoose.model('User', UserSchema);  //create a model called User with the schema UserSchema

export default User;