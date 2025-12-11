import mongoose from "mongoose";
export const jobSchema = new mongoose.Schema(
    {
        title: {
            typeof: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        requirements: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        salary: {
            type: Number,
            required: true,
        },
        jobType: {
            public_id: String,
            url: String,
        },
        position: {
            type: String,
            required: true,
            trim: true,
        },
        experiencelevel: {  
            type: Number,
            required: true,
            trim: true,
        },
        experience: {
            type: String,
            required: true,
            trim: true,
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        applications: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Application",
            }
        ]

    }, { timestamps: true })


export const Job = mongoose.model("Job", jobSchema);


