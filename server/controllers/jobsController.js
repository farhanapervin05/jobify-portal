import Job from '../models/Job.js';

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(201).json({ job });
};

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({}).sort('createdAt');
    res.status(200).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
    const { id: jobId } = req.params;
    const { userId } = req.user;
    const job = await Job.findOne({ _id: jobId, createdBy: userId });
    if (!job) {
        return res.status(404).json({ msg: `No job with id ${jobId}` });
    }
    res.status(200).json({ job });
};

const updateJob = async (req, res) => {
    const {
        body: { company, position },
        user: { userId },
        params: { id: jobId },
    } = req;

    if (company === '' || position === '') {
        return res.status(400).json({ msg: 'Company or Position fields cannot be empty' });
    }

    const job = await Job.findByIdAndUpdate(
        { _id: jobId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
    );
    if (!job) {
        return res.status(404).json({ msg: `No job with id ${jobId}` });
    }
    res.status(200).json({ job });
};

const deleteJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId },
    } = req;

    const job = await Job.findOneAndDelete({
        _id: jobId,
        createdBy: userId,
    });
    if (!job) {
        return res.status(404).json({ msg: `No job with id ${jobId}` });
    }
    res.status(200).json({ msg: 'The entry was deleted.' });
};

export { createJob, deleteJob, getAllJobs, updateJob, getJob };
