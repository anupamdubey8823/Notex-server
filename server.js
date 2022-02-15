const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 

// Connect to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open',  () => {
    console.log('MongoDB connection established');
})
// Require the noteSchema
const noteRouter = require('./routes/Notes');

app.use('/', noteRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});



