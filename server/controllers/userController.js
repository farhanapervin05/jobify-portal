import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getApplicationStats = async (req, res) => {
    // Placeholder for future implementation or remove if unused
    res.status(StatusCodes.OK).json({ msg: 'application stats' });
};

export const updateUser = async (req, res) => {
    const obj = { ...req.body };
    delete obj.password; // Prevent password update via this route

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj, {
        new: true,
    });

    res.status(StatusCodes.OK).json({ msg: 'update user' });
};
