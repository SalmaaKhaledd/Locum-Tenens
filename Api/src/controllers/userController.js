import User from '../models/user.js';

//get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if(!user){
      return res.status(404).json({msg: 'User not found'});
    }
    res.json(user);
  }
  catch (err) {
    res.status(500).json({ msg: 'Server error' });
   }
  };

  //update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const {name, email, password, locumProfile, hospitalProfile, role }= req.body;
    const user = await User.findById(req.user.id);
    //const {password: pass, ...safeUser}= user.toObject();
    if(!user){
      return res.status(404).json({msg: 'User not found'});
    }
    if (role && role !== user.role) {
      return res.status(403).json({ msg: 'Role modification not allowed' });
    }
    if(name) user.name = name;  
    if(email) user.email = email;
    if(password){
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    if (user.role === 'locum' && locumProfile) {
      user.locumProfile = { ...user.locumProfile, ...locumProfile };
    }
    if (user.role === 'hospital' && hospitalProfile) {
      user.hospitalProfile = { ...user.hospitalProfile, ...hospitalProfile };
    }
    await user.save();
    res.json({msg: 'Profile updated successfully', user: safeUser});
  } catch (err) {  
    res.status(500).json({ msg: 'Server error' });
  }
};


//delete user profile
export const deleteUserProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
