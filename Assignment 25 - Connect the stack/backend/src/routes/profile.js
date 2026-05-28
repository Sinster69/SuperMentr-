import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { User } from "../models/User.js";

const router = Router();

router.get("/", requireAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("name email createdAt updatedAt");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      user
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
