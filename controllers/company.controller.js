import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
    try {
        const { name, website, location, description, industry, size } = req.body;
        if (!name || !website || !location || !description || !industry || !size) {
            return res.status(400).json({
                message: 'All fields are required',
                success: false
            });
        }

        let company = await Company.findOne({ name: company.name });

        if (company) {
            return res.status(409).json({
                message: 'Company already registered, please give a new name',
                success: false
            });
        }
        company = new Company({
            name,
            website,
            location,
            description,
            industry,
            size,
            userId: req.user.id
        });
        await company.save();

        res.status(201).json({
            message: 'Company registered successfully',
            company,
            success: true
        });
    } catch (error) {
        console.error('Error in registering company:', error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

export const getCompany = async (req, res) => {

    try {
        const userId = req.id;  //logged in user comapny id
        const company = await Company.findById(userId);
        if (!company) {
            return res.status(404).json({
                message: 'Company not found',
                success: false
            });
        }
        res.status(200).json({
            message: 'Company details updated successfully',
            company,
            success: true
        });
    } catch (error) {
        console.error('Error fetching company details:', error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }


};


// get company by id
export const getCompanybyId = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: 'Company not found',
                success: false
            });
        }
        res.status(200).json({
            message: 'Company details fetched successfully',
            company,
            success: true
        });
    }
    catch (error) {
        console.error('Error fetching company by ID:', error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

// update company details
export const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const { name, website, location, description, industry, size } = req.body;

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: 'Company not found',
                success: false
            });
        }

        company.name = name || company.name;
        company.website = website || company.website;
        company.location = location || company.location;
        company.description = description || company.description;
        company.industry = industry || company.industry;
        company.size = size || company.size;

        await company.save();

        res.status(200).json({
            message: 'Company details updated successfully',
            company,
            success: true
        });
    } catch (error) {
        console.error('Error updating company details:', error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};



