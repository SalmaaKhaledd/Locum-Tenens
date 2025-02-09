import express from 'express';
import { authUser,authRole } from '../utils/authMiddleware';
import { createShift, getAllShifts, getShiftById, updateShiftById, deleteShiftById } from '../controllers/shiftController';

const router = express.Router();

router.post('/', authUser, authRole('hospital'), createShift);
router.get('/',authUser, getAllShifts);
router.get('/:id', authUser, getShiftById);
router.put('/:id', authUser, authRole('hospital'), updateShiftById);
router.delete('/:id', authUser, authRole('hospital'), deleteShiftById);

export default router;
