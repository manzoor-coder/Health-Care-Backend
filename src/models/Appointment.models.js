import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    notes: { type: String },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    approvedAt: { type: Date },
    rejectedAt: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", AppointmentSchema);
