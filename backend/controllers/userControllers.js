
const User = require("../models/UserLogin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET="christodo@1122"


const registeruser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        
        const alreadyRegd = await User.findOne({ email });

        if (alreadyRegd) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};



const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

    
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        const ispwdmatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!ispwdmatch) {
            return res.status(401).json({
                message: "Password does not match"
            });
        }

      
        const token = jwt.sign(
    { userId: user._id },
    JWT_SECRET,
    { expiresIn: "1d" }
);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


module.exports = {
    registeruser,
    loginUser
};
