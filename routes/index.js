const UserController = require('../controllers/UserController');
const HubspotController = require('../controllers/HubspotController');
const MollieController = require('../controllers/MollieController');
const StripeController = require('../controllers/StripeController');

const userController = new UserController();
const hubspotController = new HubspotController();
const mollieController = new MollieController();
const stripeController = new StripeController();

const registerRoutes = (app) => {

    /** App */
    // 01. Nodemailer
    app.post('/api/contact', userController.contact);


    /** Hubspot */
    // 01. Contacts
    app.post('/api/hubspot/contact', hubspotController.createContact);


    /** Mollie */
    // 01. Payments
    app.post('/api/mollie/payment', mollieController.createPayment);
    // 02. Orders
    app.post('/api/mollie/order', mollieController.createOrder);
    app.get('/api/mollie/order', mollieController.getOrders);
    app.delete('/api/mollie/order/:id', mollieController.cancelOrder);
    // 03. Customers
    app.post('/api/mollie/customer', mollieController.createCustomer);
    app.get('/api/mollie/customer', mollieController.getCustomers);
    app.get('/api/mollie/customer/:id', mollieController.getCustomer);
    app.put('/api/mollie/customer/:id', mollieController.updateCustomer);
    app.delete('/api/mollie/customer/:id', mollieController.deleteCustomer);
    // 04. Mandates
    app.post('/api/customer/:customerid/mandate', mollieController.createMandate);
    // 05. Subscriptions


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
    
}

module.exports = registerRoutes;