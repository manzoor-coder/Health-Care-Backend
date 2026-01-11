import Doctor from "../models/Doctor.models.js";
import cloudinary from "../config/cloudinary.js";

// Create or Update Doctor Profile
export const upsertDoctorProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, specialization, experience, qualification, bio, clinicName, address, fee } = req.body;

    let doctorProfile = await Doctor.findOne({ user: userId });

    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, message: "Profile picture is required." });
    }

    // Validate type and size
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ success: false, message: "Only JPEG, JPG, PNG allowed." });
    }
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      return res.status(400).json({ success: false, message: "Image too large (max 2MB)." });
    }

    // Convert buffer to base64 data URL manually
    const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64, {
      folder: "doctor_profiles",
      width: 500,
      height: 500,
      crop: "limit",
    });

    const profilePicUrl = result.secure_url;

    const profileData = { name, phone, specialization, experience, qualification, bio, clinicName, address, fee, profilePic: profilePicUrl };

    if (doctorProfile) {
      doctorProfile.set(profileData);
      await doctorProfile.save();
      return res.json({ message: "Doctor profile updated", doctorProfile });
    }

    doctorProfile = await Doctor.create({ user: userId, ...profileData });
    res.status(201).json({ message: "Doctor profile created", doctorProfile });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
// Get Doctor Profile
export const getDoctorProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const doctorProfile = await Doctor.findOne({ user: userId });

    if (!doctorProfile)
      return res.status(404).json({ message: "Doctor profile not found" });

    res.json(doctorProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};