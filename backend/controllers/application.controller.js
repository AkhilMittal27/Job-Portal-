export const applyJob = async (req, res) => {


    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "Job ID is required"
            });
        }
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job"
            });
        }

        const application = new Application({
            job: jobId,
            applicant: userId,
        });

        await application.save();
        job.applications.push(application._id);
        await job.save();

        res.status(201).json({
            success: true,
            message: "Job application submitted successfully",
            application,
        });
    } catch (error) {
        console.error('Error applying for job:', error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};


export const getAppliedJobs = async (req, res) => {

    try {
        const userId = req.id;
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: {
                sort: { createdAt: -1 }
            },
            populate: {
                path: 'company',
                options: {
                    sort: { createdAt: - 1 },
                }
            }
        });

        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: 'No applied jobs found for this user ',
                success: false
            });
        }

        return res.status(200).json({
            message: 'Applied jobs fetched successfully',
            applications,
            success: true
        });

    }

    catch (error) {
        console.log('Error fetching applied jobs:', error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }

}


// admin will see who have applied for a particular job

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const applications = await Application.find({ job: jobId }).populate({
            path: 'applicantion',
            options: { createdAt: -1 },
            populate: {
                path: 'applicant',
            }
        });

        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: 'No applications found for this job',
                success: false
            });
        }
        return res.status(200).json({
            message: 'Applications fetched successfully',
            applications,
            success: true
        });
    } catch (error) {
        console.error('Error fetching applications for job:', error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

export const updateStatus = async (req, res) => {

    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: 'Status is required',
                success: false
            });
        }
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: 'Application not found',
                success: false
            });
        }
        // update the status
        application.status = status;
        await application.save();
        return res.status(200).json({
            message: 'Application status updated successfully',
            application,
            success: true
        });
    }

    catch {
        console.log('Error updating application status:', error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
}
