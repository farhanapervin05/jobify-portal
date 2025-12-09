import express from 'express';
import { applyForJob, getUserApplications } from '../controllers/applicationController.js';
import { authorizePermissions } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authorizePermissions('student'), applyForJob);
router.get('/', authorizePermissions('student'), getUserApplications);

export default router;
