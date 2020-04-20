const express = require('express');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const cors = require('cors');
const http = require('http');

require('dotenv').config();

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = socketIO(server);

mongoose.connect(
    'mongodb://localhost:27017/name-on-db',
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false 
    },
    () => console.log('Connected to DB')
);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));