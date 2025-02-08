import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const register = async (req, res) => {
   const { name, email, password, role } = req.body;
    const validRoles = ["locum", "hospital"];
   if (!validRoles.includes(role)) {
      return res.status(400).json({ msg: "Invalid role" });
    }
    try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    const payload = { user: { id: user.id }, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.status(201).cookie('access_token', token, {httpOnly: true, sameSite: "strict"}).json({ msg: 'Registration Successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Registration failed');
  }
};


export const login = async (req, res)=>{
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({msg: 'Invalid Email or Password'});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({msg: 'Invalid Password'});
    }
    const payload={
      user:{
        id: user.id,
      }
    };  
    jwt.sign(payload, process.env.JWT_SECRET, (err, token)=>{
      if(err) throw err;
      res.status(200).cookie('access_token', token, {httpOnly: true,}).json({ msg: 'User registered successfully' });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }

}

export const logout= async (req, res )=>{
  res.clearCookie("access_token");
  res.json({msg:"Logged out successfully"});
}
