import dbConnect from "../../utills/dbConnect";
import devices from "../../models/devices";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const devicesPower = await devices.find({});
        res.status(200).json({ success: true, data: devicesPower });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
      } catch (error) {}
  }
};
