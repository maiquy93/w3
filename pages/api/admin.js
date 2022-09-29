import dbConnect from "../../utills/dbConnect";
import adminUsers from "../../models/adminUsers";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const admin = await adminUsers.findOne({ username: req.body.username });
        if (admin) {
          if (req.body.password == admin.password)
            res.status(200).json({ login: true });
          else res.status(200).json({ login: false });
        } else res.status(200).json({ login: false });
      } catch (error) {
        res.status(400);
      }
      break;
    case "GET":
      res.status(200).json({ success: true });
  }
};
