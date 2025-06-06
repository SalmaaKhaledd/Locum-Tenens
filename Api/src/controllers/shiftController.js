import Shift from '../models/shift';

// Create a new shift
export const createShift = async (req, res) => {
  try {
    const { title, description, location, date, time, specialty } = req.body;
    //ensure date is in the future
    if(new Date(date)< new Date()) return res.status(400).json({message: "Shift date must be in the future"});
    const shift = new Shift({ ...req.body, hospital: req.user.id });
    await shift.save();
    res.status(201).json(shift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all shifts
export const getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.find().populate("hospital", "hospitalProfile.hospitalName hospitalProfile.location");
    res.status(200).json(shifts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single shift by ID
export const getShiftById = async (req, res) => {
  try { 
    const shift = await Shift.findById(req.params.id);
    if (!shift) {
      return res.status(404).json({ message: 'Shift not found' });
    }
    res.status(200).json(shift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a shift by ID
//TODO: do customization for the update
export const updateShiftById = async (req, res) => {
  try {
    const shift = await Shift.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!shift) {
      return res.status(404).json({ message: 'Shift not found' });
    }
    res.status(200).json(shift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a shift by ID
export const deleteShiftById = async (req, res) => {
  try {
    const shift = await Shift.findByIdAndDelete(req.params.id);
    if (!shift) {
      return res.status(404).json({ message: 'Shift not found' });
    }
    res.status(200).json({ message: 'Shift deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 