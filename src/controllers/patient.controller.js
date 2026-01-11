import Patient from "../models/Patient.models.js";
import cloudinary from "../config/cloudinary.js";

// Create or Update Patient Profile
export const upsertPatientProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      name,
      age,
      gender,
      phone,
      medicalNotes,
    } = req.body;

    let patientProfile = await Patient.findOne({ user: userId });

    let profilePicUrl = patientProfile?.profilePic;

    // If image uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        { folder: "patient_profiles" }
      );

      profilePicUrl = result.secure_url;
    }

    const profileData = {
      name,
      age,
      gender,
      phone,
      medicalNotes,
      profilePic: profilePicUrl,
    };

    if (patientProfile) {
      patientProfile.set(profileData);
      await patientProfile.save();
      return res.json({
        message: "Patient profile updated",
        patientProfile,
      });
    }

    patientProfile = await Patient.create({
      user: userId,
      ...profileData,
    });

    res.status(201).json({
      message: "Patient profile created",
      patientProfile,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Patient Profile
export const getPatientProfile = async (req, res) => {
  try {
    const patientProfile = await Patient.findOne({
      user: req.user.id,
    });

    if (!patientProfile) {
      return res.status(404).json({
        message: "Patient profile not found",
      });
    }

    res.json(patientProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
