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
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    res.json(user);
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
