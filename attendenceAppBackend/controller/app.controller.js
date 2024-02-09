const bcrypt = require('bcryptjs');
const User = require('../models/User')
const jwt = require("jsonwebtoken");
const Attendance = require('../models/Attendance');
const mongoose = require('mongoose');

module.exports = class AppController {

    static registerUser = async (req, res, next) => {
        const { username, email, password, phoneno } = req.body;
        let existingUser;

        try {
            existingUser = await User.findOne({ username });
        } catch (err) {
            return console.error(err);
        }

        if (existingUser) {
            return res.status(201).json({ message: "User already exists!" });
        }

        const hashedPassword = bcrypt.hashSync(password);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            phoneno,
            attendanceData: [],
        });

        try {
            await user.save();
        } catch (err) {
            console.log(err);
        }
        return res.status(200).json({ user });
    };

    static logIn = async (req, res, next) => {
        const { username, password } = req.body;

        let existingUser;

        try {
            existingUser = await User.findOne({ username });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Server error" });
        }

        if (!existingUser) {
            return res.status(401).json({ message: "User not found" });
        }

        const isPasswordCorrect = bcrypt.compareSync(
            password,
            existingUser.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate a token
        const token = jwt.sign({ userId: existingUser._id }, "your_secret_key", {
            expiresIn: "10h",
        });

        return res.status(200).json({ message: 'login successful!', token });
    };

    static getUserData = async (req, res, next) => {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        try {
            const decodedToken = jwt.verify(token.split(" ")[1], "your_secret_key");

            const userId = decodedToken.userId;

            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const userDataToSend = { ...user._doc };
            delete userDataToSend.password;

            return res.status(200).json({ user: userDataToSend });
        } catch (error) {
            console.error(error); // Log the error for debugging
            return res.status(401).json({ message: "Invalid token" });
        }
    };

    static getAllUser = async (req, res, next) => {
        let users;
    
        try {
          users = await User.find();
        } catch (err) {
          console.log(err);
        }
    
        if (!users) {
          return res.status(401).json({ message: "No users found" });
        }
    
        return res.status(200).json({ users });
      };

    static getAllAttendenceData = async (req, res, next) => {
        let attendence_data;

        try {
            attendence_data = await Attendance.find()
        } catch (err) {
            return console.log(err);
        }

        if (!attendence_data) {
            return res.status(401).json({ message: 'No attendence data found' })
        }

        return res.status(200).json({ attendence_data })

    }


    static addAttendance = async (req, res, next) => {
        const { date, loginTime, user, username } = req.body;

        let existingUser;

        try {
            existingUser = await User.findById(user)
        } catch (err) {
            console.log(err)
        }

        if (!existingUser) {
            return res.status(501).json('Invalid User ID')
        }

        const attendence_data = new Attendance({
            date,
            loginTime, 
            user,
            username
        })

        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            await attendence_data.save({session});
            existingUser.attendances.push(attendence_data)
            await existingUser.save({session})
            await session.commitTransaction()

        } catch (err) {
            console.log(err);
            return res.status(500).json({message: err})
        }

        return res.status(200).json({ attendence_data })
        
    }

    static updateAttendance = async (req, res, next) => {
        const attendanceId = req.params.id;

        const { logoutTime } = req.body
        let attendance;

        try {
            attendance = await Attendance.findByIdAndUpdate(attendanceId, {
                logoutTime,
                updatedAt: new Date().toISOString()
            })
        } catch (err) {
            return console.log(err)
        }

        if (!attendance) {
            return res.status(500).json({ massage: 'Unable to update the Attendance' })
        }

        return res.status(200).json({ massage: 'Attendence has been updated!' })

    }



    static getAttendenceDataByUserId = async (req, res, next) => {
        const userId = await req.params.id;
        let attendenceData;
        
        try {
            attendenceData = await User.findById(userId).populate('attendances');

        } catch (err) {
            console.log(err);
        }

        if(!attendenceData){
            return res.status(401).json({ message: 'Attendence data not found' });
        }

        return res.status(200).json({ attendanceData: attendenceData})   
    }
} 
