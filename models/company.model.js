import mongoose from "mongoose";
const companySchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true, 
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true

        },
        website: {
            type: String,
            required: true,
            trim: true
        },
        location: { 
            type: String,
            required: true, 
            trim: true 
        },
        logo : {
            type: String,  //url to the company
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        industry: {     
            type: String,       
            required: true,       
            trim: true     
        },  
        size: {
            type: String,       
            required: true,       
            trim: true     
        }
    },  { timestamps: true })

       export const Company = mongoose.model("Company", companySchema);