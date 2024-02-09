const mongoose = require("mongoose");
const Attendance = require('./Attendance')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    loginTime: {
        type: String,
    },
    logoutTime: {
        type: String,
    },
    attendances: [{ type: mongoose.Types.ObjectId, ref: "Attendance", required: true }],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
