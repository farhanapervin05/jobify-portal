import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        // Validate admin code if role is admin
        if (req.body.role === 'admin') {
            const validAdminCode = process.env.ADMIN_CODE || 'ADMIN2024'; // Set this in .env
            if (req.body.adminCode !== validAdminCode) {
                return res.status(403).json({ msg: 'Invalid admin code. Contact system administrator.' });
            }
        }

        const user = await User.create({ ...req.body });
        const token = jwt.sign(
            { userId: user._id, name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );
        res.status(201).json({ user: { name: user.name }, token });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please provide email and password' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: 'Invalid Credentials' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ msg: 'Invalid Credentials' });
        }
        const token = jwt.sign(
            { userId: user._id, name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );
        res.status(200).json({ user: { name: user.name }, token });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export { register, login };
