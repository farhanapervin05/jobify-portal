import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Types.ObjectId,
            ref: 'Job',
            required: [true, 'Please provide job id'],
        },
        applicant: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user id'],
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

export default mongoose.model('Application', ApplicationSchema);
