import mongoose from 'mongoose';
import { GoLicense, TrackTraceLicense } from '../models/license.js';
import { isValidClientId } from '../utils/db.js';

async function postLicense(req, res, next) {
    var { file, body } = req;
    var {
        product,
        clientId,
        description,
        maxLicenseAmount,
        primaryColor,
        secondaryColor,
        licenseStartDate,
        licenseEndDate,
    } = body;
    var { filename: imageUrl } = file;

    // check if product and clientId set
    if (!product || !clientId) {
        next({ status: 500, message: 'Data input incomplete' });
    }

    // check if clientId exitsts
    isValidClientId(next, clientId);

    // choose corresponding model
    var Model;
    if (product === 'go') {
        Model = GoLicense;
    } else if (product === 'trackTrace') {
        Model = TrackTraceLicense;
    } else {
        next({ status: 500, message: 'Product type not recognized' });
    }

    // create new licsense and save it
    var newLicense = new Model({
        clientId: new mongoose.Types.ObjectId(clientId),
        description,
        imageUrl,
        maxLicenseAmount,
        primaryColor,
        secondaryColor,
        licenseStartDate,
        licenseEndDate,
    });
    var savedLicense = await newLicense.save();

    // check if creation was successfull
    if (savedLicense) {
        res.status(201);
        res.send(savedLicense);
    } else {
        next({ status: 500, message: 'New license could not be created' });
    }
}

export default postLicense;
