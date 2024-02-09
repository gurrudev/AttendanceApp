
const express = require('express');
const AppController = require('../controller/app.controller')

const router = express.Router();

router.get('/', (req, res)=>{
    res.send('api working')
})

router.post('/signup', AppController.registerUser)
router.post('/login', AppController.logIn)
router.get('/userData', AppController.getUserData)
router.get('/allUsers', AppController.getAllUser)
router.get('/attendenceData', AppController.getAllAttendenceData)
router.post('/addAttendance', AppController.addAttendance)
router.put('/updateAttendence/:id', AppController.updateAttendance)
router.get('/userAttendenceData/:id', AppController.getAttendenceDataByUserId)

module.exports = router