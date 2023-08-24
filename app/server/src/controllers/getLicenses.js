import Client from '../models/Client.js';
import { GoLicense, TrackTraceLicense } from '../models/license.js';
import { isValidClientId } from '../utils/db.js';

async function getClientLicenses(req, res, next) {
    var {
        params: { clientId },
    } = req;

    // clientId cant be found
    isValidClientId(next, clientId);

    var goLicenses = await getLicensesByClientId(GoLicense, clientId);
    goLicenses = goLicenses.map(addProductIdentifier.bind(null, 'go'));
    var trackTraceLicenses = await getLicensesByClientId(
        TrackTraceLicense,
        clientId
    );
    trackTraceLicenses = trackTraceLicenses.map(
        addProductIdentifier.bind(null, 'trackTrace')
    );
    var allLicenses = [...goLicenses, ...trackTraceLicenses];

    res.status(200);
    res.send(JSON.stringify(allLicenses));

    async function getLicensesByClientId(model, id) {
        var licenses = await model
            .find({ clientId: id })
            .populate('clientId', '', Client);
        return licenses.map(function mapDocToObject(license) {
            return license.toObject();
        });
    }

    function addProductIdentifier(product, license) {
        return { ...license, product };
    }
}

export default getClientLicenses;
