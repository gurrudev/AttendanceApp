const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    date: {
        type: String,
        required: true
    },

    loginTime: {
        type: String,
        default: "Absent"
    },

    logoutTime: {
        type: String,
        default: "Absent"
    },

    createdAt:{
        type : Date,
        default : Date.now(),
    },
    
    updatedAt:{
        type : Date
    },
    
    user: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },

    username:{
        type: String,
        required:true,
    }
    
})

const Attendance = mongoose.model('Attendance',attendanceSchema);

module.exports = Attendance