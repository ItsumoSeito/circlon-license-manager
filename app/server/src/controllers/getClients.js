import Client from '../models/Client.js';

async function getClients(req, res) {
    var allClients = await Client.find({});
    var allClientsObjects = allClients.map(function mapDocToObject(client) {
        return client.toObject();
    });

    res.status(200);
    res.send(JSON.stringify(allClientsObjects));
}

export default getClients;
