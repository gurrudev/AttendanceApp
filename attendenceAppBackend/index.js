const express = require('express');
const cors = require('cors');

const app = express();
const dbConnect = require('./config/dbConfig');
const router = require('./router/routes');


app.use(express.json());
app.use(cors())

app.use('/user', router);



app.listen(process.env.PORT || 3002, () => {
    console.log(`🚀 Server is running on ${process.env.PORT || 3002}`);
    dbConnect()
});