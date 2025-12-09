import express from 'express';
import {
    createJob,
    deleteJob,
    getAllJobs,
    updateJob,
    getJob,
} from '../controllers/jobsController.js';

import { authorizePermissions } from '../middleware/authMiddleware.js';
import authenticateUser from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(authenticateUser, authorizePermissions('recruiter'), createJob)
    .get(getAllJobs);

router.route('/:id')
    .get(getJob)
    .delete(authenticateUser, authorizePermissions('recruiter'), deleteJob)
    .patch(authenticateUser, authorizePermissions('recruiter'), updateJob);

export default router;
