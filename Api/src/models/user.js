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
    //default: 'locum',
    required: true 
  },
},{timestamps: true});  

const User = mongoose.model('User', UserSchema);  //create a model called User with the schema UserSchema

export default User;