import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    //minlength: 3,
    //maxlength: 20,
  },
  email:{
    type: String,
    required: true,
    unique: true,
    //match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
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
  locumProfile: {
    specialization: { type: String },
    qualifications: { type: String },
    experience: { type: Number },
    availability: { type: [Date] },
  },

  hospitalProfile: {
    hospitalName: { type: String },
    department: { type: String },
    location: { type: String },
    contactInfo: { type: String },
  },
  //shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shift' }]  // References all shifts posted by the hospital
},{timestamps: true});  

//pre-save hook that runs before the User document is saved to the database.
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
}); 

const User = mongoose.model('User', UserSchema);  //create a model called User with the schema UserSchema

export default User;