import Application from '../models/application';

// Create a new application
export const applyForShift = async (req, res) => {
  try {
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


