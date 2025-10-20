import Application from "../models/application.model.mjs";

// ===================== Application Controllers =====================

// Create new application
export const createApplication = async (req, res) => {
  try {
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
      SlNo,
    } = req.body;

    // Handle uploaded files
    const photo = req.files?.photo ? req.files.photo[0].filename : null;
    const signature = req.files?.signature ? req.files.signature[0].filename : null;
    const documents = req.files?.documents
  ? req.files.documents.map((file) => file.filename)
  : [];


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
      documents, // store array of filenames
      billNumber,
      amount,
      testDate: testDate || Date.now(), // ensure testDate is stored
      leanersDate,
      SlNo,
    });

    await application.save();

    res.status(201).json({
      message: "Application created successfully",
      application,
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

// ===================== Bill Controllers (same schema) =====================

// Add a new bill (linked to application)
export const addBill = async (req, res) => {
  try {
    const { applicationId, billNumber, amount } = req.body;

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.billNumber = billNumber;
    application.amount = amount;

    await application.save();

    res.status(201).json({ message: "Bill added successfully", application });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update bill
export const updateBill = async (req, res) => {
  try {
    const { billNumber, amount } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { billNumber, amount },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.status(200).json({ message: "Bill updated successfully", application });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete bill (just remove bill info, not whole application)
export const deleteBill = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Bill not found" });
    }

    application.billNumber = null;
    application.amount = null;

    await application.save();

    res.status(200).json({ message: "Bill deleted successfully", application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all bills (applications that have bills)
export const getBills = async (req, res) => {
  try {
    const bills = await Application.find({ billNumber: { $ne: null } });
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single bill by application ID
export const getBillById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application || !application.billNumber) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
