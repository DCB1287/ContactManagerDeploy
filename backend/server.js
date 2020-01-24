// Imported dependencies: middleware to mongoosedb.
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Allows the existence of the ".env" file.
require('dotenv').config();

// Initiates express server and defines a port.
const app = express();
const port = process.env.port || 3000;

//Middleware, allows us to parse json
app.use(cors());
app.use(express.json());

// Need a file in the same dir called ".env"
const uri = process.env.ATLAS_URI;

// Allows us to connect to mongodb. Flags are to allow
// use of updated functions.
mongoose.connect(uri, { useNewUrlParser: true,
     useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")})

// Allows router files to be accessed via a URL
// i.e http://localhost:3000/contacts/add
const contactsConnection = require('./routers/contactsAPI');
const userConnection = require('./routers/usersAPI');
app.use('/contacts', contactsConnection);
app.use('/users', userConnection);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});
