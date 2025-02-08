import express from 'express';
import { authUser,authRole } from '../utils/authMiddleware';

const router = express.Router();

//hospital create shift
router.post("/create", authUser, authRole(['hospital']), (req, res) => {
  res.json({ msg: "Shift created successfully" });
});

router.post("/apply", authUser, authRole(['locum']), (req, res) => {
  res.json({ msg: "Application Submitted" });
});

export default router;
