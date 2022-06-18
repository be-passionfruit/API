const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_KEY });


class MollieController {

    /** Payment */
    createPayment = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }

        const {price, currency, method, description} = req.body;

        await mollieClient.payments.create({
            amount: {
                value: price,
                currency: currency,
            },
            method: method, // Try to send method to avoid too many clicks
            description: description,
            redirectUrl: `${process.env.APP_URL}`,
            customerId: req.body.customerId,
            //   webhookUrl:  ''
        })
        .then(payment => {
            res.send(payment.getCheckoutUrl());
        })
        .catch(err => res.json(err));
    }

    /** Order */
    createOrder = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }

        await mollieClient.orders.create({
            amount: {
                value: '1027.99',
                currency: 'EUR',
            },
            billingAddress: {
            organizationName: 'Mollie B.V.',
            streetAndNumber: 'Keizersgracht 126',
            city: 'Amsterdam',
            region: 'Noord-Holland',
            postalCode: '1234AB',
            country: 'NL',
            title: 'Dhr.',
            givenName: 'Piet',
            familyName: 'Mondriaan',
            email: 'piet@mondriaan.com',
            phone: '+31309202070',
            },
            shippingAddress: {
            organizationName: 'Mollie B.V.',
            streetAndNumber: 'Prinsengracht 126',
            streetAdditional: '4th floor',
            city: 'Haarlem',
            region: 'Noord-Holland',
            postalCode: '5678AB',
            country: 'NL',
            title: 'Mr.',
            givenName: 'Chuck',
            familyName: 'Norris',
            email: 'norris@chucknorrisfacts.net',
            },
            metadata: {
            order_id: '1337',
            description: 'Lego cars',
            },
            consumerDateOfBirth: '1958-01-31',
            locale: 'nl_BE',
            orderNumber: '1337',
            redirectUrl: `${process.env.APP_URL}`,
            // webhookUrl: 'https://example.org/webhook',
            method: 'klarnapaylater',
            lines: [
                {
                  type: 'physical',
                  sku: '5702016116977',
                  name: 'LEGO 42083 Bugatti Chiron',
                  productUrl: 'https://shop.lego.com/nl-NL/Bugatti-Chiron-42083',
                  imageUrl: 'https://sh-s7-live-s.legocdn.com/is/image//LEGO/42083_alt1?$main$',
                  quantity: 2,
                  vatRate: '21.00',
                  unitPrice: {
                    currency: 'EUR',
                    value: '399.00',
                  },
                  totalAmount: {
                    currency: 'EUR',
                    value: '698.00',
                  },
                  discountAmount: {
                    currency: 'EUR',
                    value: '100.00',
                  },
                  vatAmount: {
                    currency: 'EUR',
                    value: '121.14',
                  },
                },
                {
                  type: 'physical',
                  sku: '5702015594028',
                  name: 'LEGO 42056 Porsche 911 GT3 RS',
                  productUrl: 'https://shop.lego.com/nl-NL/Porsche-911-GT3-RS-42056',
                  imageUrl: 'https://sh-s7-live-s.legocdn.com/is/image/LEGO/42056?$PDPDefault$',
                  quantity: 1,
                  vatRate: '21.00',
                  unitPrice: {
                    currency: 'EUR',
                    value: '329.99',
                  },
                  totalAmount: {
                    currency: 'EUR',
                    value: '329.99',
                  },
                  vatAmount: {
                    currency: 'EUR',
                    value: '57.27',
                  },
                },
            ],
        })
        .then(order => {
            res.send(order.getCheckoutUrl());
        })
        .catch(err => res.json(err));
    }

    getOrders = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }
        
        await mollieClient.orders.page()
        .then(orders => {
            res.send(orders);
        })
        .catch(err => res.json(err));

    } 

    cancelOrder = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }     

        await mollieClient.orders.cancel(req.params.id)
        .then((order) => res.json(order))
        .catch(err => res.json(err));
    }


    /** Customer */
    createCustomer = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }

        const {firstname, lastname, email} = req.body;
        
        const customer = await mollieClient.customers.create({
            name: `${firstname} ${lastname}`,
            email,
        })
        .then(customer => res.send(customer))
        .catch(err => res.json(err));
    }

    getCustomers = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }

        await mollieClient.customers.page()
        .then(customers => res.send(customers))
        .catch(err => res.json(err));
    }

    getCustomer = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }

        await mollieClient.customers.get(req.params.id)
        .then(customer => res.send(customer))
        .catch(err => res.json(err));
    }

    updateCustomer = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }

        const { firstname, lastname, email } = req.body;
        
        await mollieClient.customers.update(req.params.id , {
            name: `${firstname} ${lastname}`,
            email,
        })
        .then(customer => res.send(customer))
        .catch(err => res.json(err));
    }

    deleteCustomer = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }

        await mollieClient.customers.delete(req.params.id)
        .then(customer => res.send(customer))
        .catch(err => res.json(err));
    }

    
    /** Methods */


    /** Mandate */
    createMandate = async (req, res, next) => {
        //
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }

        await mollieClient.customers_mandates.create({
            customerId: req.params.customerid,
            method: 'paypal',
            consumerName: 'Thomas Delahaye',
            consumerEmail: 'thomas.delahaye@student.howest.be',
            // consumerAccount: 'NL55INGB0000000000',
            // consumerBic: 'INGBNL2A',
            signatureDate: '2022-06-15',
            mandateReference: 'Passionfruit',
        })
        .then(mandate => res.send(mandate))
        .catch(err => res.json(err));
    }
}

module.exports = MollieController;