const UserController = require('../controllers/UserController');
const HubspotController = require('../controllers/HubspotController');

const userController = new UserController();
const hubspotController = new HubspotController();

const registerRoutes = (app) => {

    app.post('/api/contact', userController.contact);

    app.post('/api/hubspot/contact', hubspotController.createContact);

}

module.exports = registerRoutes;