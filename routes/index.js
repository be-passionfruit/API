const UserController = require('../controllers/UserController');
const HubspotController = require('../controllers/HubspotController');
const StripeController = require('../controllers/StripeController');
const MollieController = require('../controllers/MollieController');

const userController = new UserController();
const hubspotController = new HubspotController();
const stripeController = new StripeController();
const mollieController = new MollieController();

const registerRoutes = (app) => {

    /** App */
    // 01. Nodemailer
    app.post('/api/contact', userController.contact);


    /** Hubspot */
    // 01. Contacts
    app.post('/api/hubspot/contact', hubspotController.createContact);

    /** Stripe */
    // 01. Customers
    app.post('/api/stripe/customer', stripeController.createCustomer);
    app.get('/api/stripe/customer', stripeController.getCustomers);
    app.get('/api/stripe/customer/:id', stripeController.getCustomer);
    app.put('/api/stripe/customer/:id', stripeController.updateCustomer);
    app.delete('/api/stripe/customer/:id', stripeController.deleteCustomer);
    // 02. Products
    app.post('/api/stripe/product', stripeController.createProduct);
    app.get('/api/stripe/product', stripeController.getProducts);
    app.get('/api/stripe/product/:id', stripeController.getProduct);
    app.put('/api/stripe/product/:id', stripeController.updateProduct);
    // 03. Payment   
    app.post('/api/stripe/payment', stripeController.createPayment);
    app.get('/api/stripe/payment', stripeController.getPayments);

    /** Mollie */
    // 01. Payments
    app.post('/api/mollie/payment', mollieController.createPayment);
    // 02. Customers
    // 03. Orders
    app.post('/api/mollie/order', mollieController.createOrder);
    // 04. Webhok
    app.post('/api/mollie/webhook', mollieController.webhook);
}

module.exports = registerRoutes;