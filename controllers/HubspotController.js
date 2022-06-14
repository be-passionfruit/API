const request = require('request');

class HubspotController {

    /** Contact */
    createContact = async (req, res, next) => {
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }
        
        // 
        const hubspot = { method: 'POST',
        url: 'https://api.hubapi.com/contacts/v1/contact/',
        qs: { hapikey: process.env.HAPIKEY },
        headers: 
        { 
            'Content-Type': 'application/json' },
        body: 
        { properties: [ 
            { property: 'email', value: req.body.email },
            { property: 'firstname', value: req.body.firstName },
            { property: 'lifecycleStage', value: "subscriber" } 
        ]}, json: true };

        // Create request
        request(hubspot, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
        });
        res.status(200).json(req.body);
    }
}

module.exports = HubspotController;