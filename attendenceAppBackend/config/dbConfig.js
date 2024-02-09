const mongoose = require('mongoose');

module.exports = dbConnect = () =>{
    try {
        mongoose.connect(`mongodb+srv://pawarash000:gurrudev@cluster0.8wdm4gd.mongodb.net/AttendenceApp`).then(()=>{
            console.log('DB Connected :)')
        }).catch((e)=>{
            console.log(e)
        })
    } catch (error) {
       console.log(error) 
    }
}
