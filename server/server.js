import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Database Connection
connectDB();

// Routes
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';
import userRouter from './routes/userRoutes.js';
import applicationRouter from './routes/applicationRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authMiddleware, userRouter);
app.use('/api/v1/jobs', jobsRouter);
app.use('/api/v1/applications', authMiddleware, applicationRouter);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
