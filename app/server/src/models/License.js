import { Schema } from 'mongoose';
import { goDb, trackTraceDb } from '../utils/db.js';

var LicenseSchema = new Schema({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    primaryColor: {
        type: String,
        required: true,
    },
    secondaryColor: {
        type: String,
        required: true,
    },
    maxLicenseAmount: {
        type: Number,
        required: true,
    },
    licenseStartDate: {
        type: Date,
        default: Date.now,
        min: Date.now,
    },
    licenseEndDate: {
        type: Date,
        min: Date.now,
        required: true,
    },
});

var circlonGoDb = goDb();
var circlonTrackTraceDb = trackTraceDb();

export var GoLicense = circlonGoDb.model('License', LicenseSchema);
export var TrackTraceLicense = circlonTrackTraceDb.model(
    'License',
    LicenseSchema
);
