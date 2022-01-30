const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,});

const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("MongoDB database connection established successfully")
})

const paymentDetailRouter = require('./routes/paymentDetails');

app.use('/paymentdetails', paymentDetailRouter);

// in production

if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('monthly-grocery-web-app/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'monthly-grocery-web-app', 'build', 'index.html'));
    })
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})