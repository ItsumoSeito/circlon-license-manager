/* eslint-disable no-console */
import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';

import getClientLicenses from './controllers/getLicenses.js';
import postLicense from './controllers/postLicense.js';
import getClients from './controllers/getClients.js';

config({ path: './app/server/.env' });

var port = process.env.PORT;
var hostname = process.env.HOSTNAME;
var mongoDbUrl = process.env.MONGO_DB_URL;

var server = express();

var storage = multer.diskStorage({
    destination: function setMulterDest(req, file, cb) {
        cb(null, 'app/server/static/');
    },
    filename: function setMulterFilename(req, file, cb) {
        cb(null, `${Date.now()}.svg`);
    },
});
var uploadMiddleware = multer({ storage });

// Connect to MongoDB
connectDb().catch(function catchDbConnectionError(err) {
    console.error(err);
});

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Request handlers
server.use(express.static('app/server/static'));
server.get('/licenses/:clientId', getClientLicenses);
server.post('/licenses/new', uploadMiddleware.single('file'), postLicense);
server.get('/clients', getClients);

// Listen
server.listen(port, hostname, function serverCallback() {
    console.log(`NodeJS sever running on ${hostname}:${port}`);
});

async function connectDb() {
    await mongoose.connect(mongoDbUrl);
    var db = mongoose.connection;
    db.on('error', console.error.bind('MongoDB connection error'));
    db.once('open', function dbConnectionSuccess() {
        console.log('MongoDB connected successfully');
    });
}
