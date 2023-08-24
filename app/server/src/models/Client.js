import mongoose, { Schema } from 'mongoose';

var ClientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

var managerDb = mongoose.connection.useDb('licenseManager');
var Client = managerDb.model('Client', ClientSchema);

export default Client;
