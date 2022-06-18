const stripe = require('stripe')(process.env.STRIPE_KEY);

class StripeController {

    /** Customer */
    createCustomer = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }
        
        await stripe.customers.create({
            name: "Thomas Delahaye",
            email: "thomas@passionfruit.be",
            address: {
                line1: "Vredestraat 31",
                line2: "",
                postal_code: 8310,
                city: "Brugge",
                state: "West-Vlaanderen",
                country: "Belgium"
            },
            description: 'My First Test Customer (created for API docs at https://www.stripe.com/docs/api)',
        })
        .then(customer => res.send(customer))
        .catch(err => res.json(err));
    }

    getCustomers = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }
        
        await stripe.customers.list()
        .then(customers => res.status(201).send(customers))
        .catch(err => res.status(401).json(err));
    }

    getCustomer = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }
        
        await stripe.customers.retrieve(req.params.id)
        .then(customer => res.status(201).send(customer))
        .catch(err => res.status(404).json(err));
    }

    updateCustomer = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }
        
        await stripe.customers.update(req.params.id, {
            balance: 1000,
            phone: "+32497941902"
        })
        .then(customer => res.status(201).send(customer))
        .catch(err => res.status(401).json(err));
    }

    deleteCustomer = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }
        
        await stripe.customers.del(req.params.id)
        .then(customer => res.status(201).send(customer))
        .catch(err => res.status(401).json(err));
    }


    /** Product */
    createProduct = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }
        
        await stripe.products.create({
            name: 'Coaching',
            active: true,
            description: 'Het leren van alle basics om op termijn zelf alles in eigen handen te nemen.',
            default_price_data: {
                currency: 'EUR',
                unit_amount: 45000,
                recurring: {
                    interval: 'month',
                    interval_count: 1,
                }
            }
        })
        .then(product => res.status(201).send(product))
        .catch(err => res.status(401).json(err));
    }

    getProducts = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }
        
        await stripe.products.list()
        .then(products => res.status(201).send(products))
        .catch(err => res.json(err));
    }

    getProduct = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }
        
        await stripe.products.retrieve(req.params.id)
        .then(product => res.status(201).send(product))
        .catch(err => res.status(404).json(err));
    }

    updateProduct = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }
        
        await stripe.products.update(req.params.id, {
            metadata: {
                test: true,
            }
        })
        .then(product => res.status(201).send(product))
        .catch(err => res.status(401).json(err));
    }


    /** Subscription */

    
    /** Invoice */


    /** Order */


    /** Payment */


    /** Subscription */

}

module.exports = StripeController;