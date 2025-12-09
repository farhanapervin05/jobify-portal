import express from 'express';
import {
    getApplicationStats,
    getCurrentUser,
    updateUser,
} from '../controllers/userController.js';
import { authorizePermissions } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', [
    authorizePermissions('admin'),
    getApplicationStats,
]);
router.patch('/update-user', updateUser);

export default router;
