
// admin will post job 
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, location, salary, jobType, position, experience } = req.body;
        const userId = req.id; // Assuming the authenticated user's ID is available in req.id

        if (!title || !description || !requirements || !location || !salary || !jobType || !position || !experience) {
            return res.status(400).json({
                message: 'All fields are required',
                success: false
            });
        }
       
        const company = await Company.findOne({ userId: userId });
        if (!company) {
            return res.status(404).json({
                message: 'Company not found for the user',
                success: false
            });
        }
        const job = new Job({
            title,
            description,
            requirements: requirements.split(','),
            location,
            salary: Number(salary),
            jobType,
            position,
            experience,
            company: company._id,
            created_by: userId
        });
        await job.save();
        res.status(201).json({
            message: 'Job posted successfully',
            job,
            success: true
        });
    } catch (error) {
        console.error('Error in posting job:', error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

// it is for student

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";  // single keyword

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query).populate({path:"company"}).sort({ createdAt: -1 });

        if(jobs.length === 0){
            return res.status(404).json({
                success: false,
                message: "No jobs found matching the criteria.",
            });
        }
        return res.status(200).json({
            success: true,
            jobs,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// it is for student 

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate("company");
        if (!job) {
            return res.status(404).json({   
                message: 'Job not found',
                success: false
            });
        }   
        res.status(200).json({
            message: 'Job details fetched successfully',
            job,
            success: true
        }); 
    } catch (error) {
        console.error('Error fetching job by ID:', error);
        res.status(500).json({  
            message: 'Internal server error',
            success: false
        }); 
    }
};

// how much jobs created by admin 

export const getAdminJobs=async(req,res)=>{

    try {
        const adminId=req.id;
        const jobs=await Job.find({created_by:adminId});
        if(!jobs){
            return res.status(404).json({  
                message: 'No jobs found for this admin',
                success: false
            }); 
        }
        res.status(200).json({  
            message: 'Admin jobs fetched successfully',
            jobs,
            success: true
        }); 
    } catch (error) {
        console.error('Error fetching admin jobs:', error);
        res.status(500).json({  
            message: 'Internal server error',
            success: false
        }); 
    }

}
