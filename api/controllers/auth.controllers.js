import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || 
        !email || 
        !password || 
        username === '' || 
        email === '' || 
        password === '') 
    {
        return next(errorHandler(400, 'Please fill in all fields')); // Highlight: Added `return`
    }

    const hashPassword = await bcryptjs.hash(password, 10); // Highlight: Removed `Sync`

    const newUser = new User({
        username,
        email,
        password: hashPassword,
    });

    try {
        await newUser.save();
        res.json({ message: 'Signup successfully' });   
    }
    catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        return next(errorHandler(400, 'Please fill in all fields')); // Highlight: Added `return`
    }

    try {
        const validUser = await User.findOne({ email });
        if(!validUser){
            return next(errorHandler(404, 'User not found')); // Highlight: Added `return`
        }
        const validPassword = await bcryptjs.compare(password, validUser.password); // Highlight: Removed `Sync`
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid credentials')); // Highlight: Added `return`
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        const { password: pass, ...rest} = validUser._doc; // exclude password from response
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json(rest);
    } catch (error) {
        next(error);
    }
};

// Highlight: Entire google function is modified
export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;
            return res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashPassword = await bcryptjs.hash(generatedPassword, 10);

            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashPassword,
                profilePicture: googlePhotoUrl,
            });

            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password, ...rest } = newUser._doc;
            return res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        }
    } catch (error) {
        console.error('Google Sign-In Error:', error); // Highlight: Added logging
        next(error);
    }
};
