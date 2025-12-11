import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// USER ROLES
export const USER_ROLES = {
    STUDENT: "student",
    RECRUITER: "recruiter",
   // ADMIN: "admin",
};

// USER SCHEMA
const userSchema = new mongoose.Schema(
    {
        // BASIC INFO
        fullname: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false, // Don't return password by default
        },

        role: {
            type: String,
            enum: Object.values(USER_ROLES),
            default: USER_ROLES.CANDIDATE,
        },

        // PROFILE DETAILS COMMON
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        PROFILE: {
            bio: {
                public_id: String,
                url: String,
            },

            // CANDIDATE SPECIFIC INFORMATION
            skills: [
                {
                    type: String,
                },
            ],

            resume: {
                public_id: String,
                url: String,
            },
            resumeoriginalName: {
                type: String,
            },

            // JOB APPLICATIONS HISTORY

            // appliedJobs: [
            //     {
            //         jobId: {
            //             type: mongoose.Schema.Types.ObjectId,
            //             ref: "Job",
            //         },
            //         appliedAt: {
            //             type: Date,
            //             default: Date.now,
            //         },
            //     },
            // ],

            // RECRUITER SPECIFIC INFORMATION
            company: {
                type: mongoose.Schema.Types.ObjectId, ref: "Company",
            },
            profilePhoto: {
                type: String,
                default: ""
            },
        },
    },

    { timestamps: true }

);


// 🔐 HASH PASSWORD BEFORE SAVE
userSchema.pre("save", async function () {
    // Only hash if password is new/modified
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});


// 🔐 PASSWORD COMPARISON METHOD
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
