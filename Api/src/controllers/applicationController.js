import Application from '../models/application.js';
import Shift from '../models/shift.js';

// Create a new application
export const applyForShift = async (req, res) => {
  try {

    const {shiftId}=req.body;
    const shift=await Shift.findById(shiftId);
    if(!shift) return res.status(400).json({msg:"Shift not found"});

    const existingApplication= await Application.findOne({locum: req.user.id , shift: shiftId})
    if(existingApplication) return res.status(400).json({msg:"You have already applied for this shift!"})
    const application = new Application({ ...req.body, locum: req.user.id });
    await application.save();
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all applications 
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    if (!applications) {
      return res.status(404).json({ message: 'No applications found' });
    }
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single application by ID
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an application by ID
export const updateApplicationById = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  

// Delete an application by ID    
export const deleteApplicationById = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json({ message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateApplicationStatus = async (req, res)=>{
  try{
    const {status} = req.body.status;
    const application = await Application.findById(req.params.id);
    if(!application) return res.status(400).json({msg: "Application not found"});
    if (!['Accepted', 'Rejected'].includes(status)){
      return res.status(400).json({msg:"Invalid Status"});
    }
    application.status = status;
    await application.save();
    res.status(200).json(application);
  }catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const viewApplicationStatus = async (req, res)=>{
  try{
    const application = await Application.findById(req.params.id);
    if(!application) return res.status(400).json({msg: "Application not found"});
    res.status(200).json(application.status);
  }catch (error) {
    res.status(500).json({message: error.message});
  }
}


