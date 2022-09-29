import mongoose from "mongoose";

const devicesSchema = new mongoose.Schema({
  name: String,
  mac: String,
  ip: String,
  createdAt: { type: Date, default: Date.now() },
  power: Number,
});

module.exports =
  mongoose.models.devices || mongoose.model("devices", devicesSchema);
