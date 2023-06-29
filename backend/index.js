const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv");
const fetchuser = require('./middleware/fetchUser');
const app = express();
dotenv.config();


//connection establish with mongoatlas
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
   // useCreateIndex: true,
   // useFindAndModify: false,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("mongoose connected...");
});
mongoose.connection.on('error', err=>{
    console.log('db connection error: ${err.getmessage}');
});

app.use(express.json());

app.use('/admin',require('./routes/admin'))
app.use('/student',fetchuser,require('./routes/student'))
app.use('/standards',fetchuser,require('./routes/standards'))

const port=process.env.PORT; 

app.listen(port,() => {
    console.log('Server started on port '+port);
});