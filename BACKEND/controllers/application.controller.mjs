import Application from "../models/application.model.mjs";



export const createApplication = async (req, res) => {
  try {
    // Destructure all fields from request body
    const {
      applicationNumber,
      name,
      fatherName,
      dob,
      mobile1,
      mobile2,
      address,
      pin,
      vehicleClass,
      bloodGroup,
      email,
      billNumber,  
      amount,
      testDate,
      leanersDate,
       SlNo
    } = req.body;

    // Handle uploaded files
    const photo = req.files?.photo ? req.files.photo[0].filename : null;
    const signature = req.files?.signature ? req.files.signature[0].filename : null;
    const licenseFile = req.files?.licenseFile ? req.files.licenseFile[0].filename : null;

    // Save into DB
    const application = new Application({
      applicationNumber,
      name,
      fatherName,
      dob,
      mobile1,
      mobile2,
      address,
      pin,
      vehicleClass,
      bloodGroup,
      email,
      photo,
      signature,
      licenseFile,
      billNumber,  
      amount,
      testDate,
      leanersDate,
      SlNo
    });

    await application.save();

    res.status(201).json({
      message: "Application created successfully",
      application
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get all applications
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single application by ID
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update application
export const updateApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application updated", application });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete application
export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
