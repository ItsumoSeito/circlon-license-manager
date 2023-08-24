import mongoose from 'mongoose';
import Client from '../models/Client.js';

export var DATABASES = {
    GO: 'circlonGo',
    TRACK_TRACE: 'circlonTrackTrace',
    LICENSE_MANAGER: 'licenseManager',
};

export function goDb() {
    return mongoose.connection.useDb(DATABASES.GO);
}

export function trackTraceDb() {
    return mongoose.connection.useDb(DATABASES.TRACK_TRACE);
}

export function licenseManagerDb() {
    return mongoose.connection.useDb(DATABASES.LICENSE_MANAGER);
}

export async function isValidClientId(next, clientId) {
    var clientIdExists = await Client.exists({ _id: clientId });
    if (clientIdExists === null) {
        let error = { status: 404, message: 'Client ID could not be found' };
        next(error);
    }
}

export default {
    goDb,
    trackTraceDb,
};
