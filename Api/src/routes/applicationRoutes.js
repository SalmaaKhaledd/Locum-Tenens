import express from 'express';
import { applyForShift, getAllApplications, getApplicationById, updateApplicationById, deleteApplicationById } from '../controllers/applicationController';
import { authUser, authRole } from '../utils/authMiddleware';

const router = express.Router();

router.post('/', authUser, authRole('locum'), applyForShift);
router.get('/', authUser, getAllApplications);
router.get('/:id', authUser, getApplicationById);
router.put('/:id', authUser, updateApplicationById);
router.delete('/:id', authUser, deleteApplicationById);

export default router;