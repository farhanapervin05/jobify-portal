import Application from '../models/Application.js';
import Job from '../models/Job.js';

const applyForJob = async (req, res) => {
    const { jobId } = req.body;
    const { userId } = req.user;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
        return res.status(404).json({ msg: `No job with id ${jobId}` });
    }

    // Check if already applied
    const alreadyApplied = await Application.findOne({ job: jobId, applicant: userId });
    if (alreadyApplied) {
        return res.status(400).json({ msg: 'Already applied for this job' });
    }

    const application = await Application.create({ job: jobId, applicant: userId });
    res.status(201).json({ application });
};

const getUserApplications = async (req, res) => {
    const applications = await Application.find({ applicant: req.user.userId }).populate('job');
    res.status(200).json({ applications, count: applications.length });
};

export { applyForJob, getUserApplications };
