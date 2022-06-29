const stripe = require('stripe')(process.env.STRIPE_KEY);

class StripeController {

    /** Customer */
    createCustomer = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }

        const { 
            firstname, 
            lastname, 
            email, 
            street, 
            number, 
            postal_code, 
            city, 
            state, 
            country, 
            description 
        } = req.body;
        
        await stripe.customers.create({
            name: `${firstname} ${lastname}`,
            email,
            address: {
                line1: `${street} ${number}`,
                line2: "",
                postal_code,
                city,
                state,
                country,
            },
            description,
        })
        .then(customer => res.status(201).send(customer))
        .catch(err => res.status(401).json(err));
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


    /** Payment */
    createPayment = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }

        const { APP_URL } = process.env;
        
        await stripe.checkout.sessions.create({
            success_url: `${APP_URL}/payment/success`,
            cancel_url: `${APP_URL}/payment/canceled`,
            line_items: [
              {price: 'price_1LCNZeGoziyMHx0oTHr0bacm', quantity: 1},
            ],
            mode: 'payment',
        })
        .then(payment => res.status(201).send(payment))
        .catch(err => res.status(401).json(err));
    }
    
    getPayments = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }
        
        await stripe.checkout.sessions.list()
        .then(payments => res.status(201).send(payments))
        .catch(err => res.json(err));
    }

    /** Subscription */
    /** Invoice */
    /** Order */
    /** Plans */
    /** Split Payments */

}

module.exports = StripeController;