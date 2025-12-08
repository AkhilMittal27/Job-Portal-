//here in controller the business login comes

import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: 'All fields are required',
                // message: 'All fields are required'
                success: false
            });
        };
        //check if user already exists

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists',
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });

        await newUser.save();

        res.status(201).json({
            message: 'Account Registered successfully',
            success: true
        });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: 'Email and password along with role are required',
                success: false
            });
        }
        let user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid password',
                success: false
            });
        }
        if (user.role !== role) {
            return res.status(401).json({
                message: 'Role mismatch, Login with correct Role',
                success: false
            });
        }
        const tokenData = { userId: user._id };
        const token = await jwt.sign(
            tokenData,
            process.env.SECRET_KEY,
            { expiresIn: '1h', httpOnly: true, secure: true, sameSite: 'strict' }
        );
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        res.status(200).json({
            message: `Login successful, welcome back ${user.fullname}`,
            token,
            user,
            success: true
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        res.status(200).json({
            message: 'Logged out successfully',
            success: true
        });
    }
    catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const { fullname, email, phoneNumber, profile } = req.body;
        const file = req.file;
        if (!fullname || !email || !phoneNumber || !profile) {
            return res.status(400).json({
                message: 'All fields are required',
                // message: 'All fields are required'
                success: false
            });
        };

        //cloudinary partcome here 


        const skillArray = profile.skills.split(',').map(skill => skill.trim());
        let user = await user.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }
        user.fullname = fullname;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.bio = profile.bio;
        user.profile.skills = skillArray;

        //resume comes later here
        //   user.profile.resume = profile.resume;

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            user,
            success: true
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }

};