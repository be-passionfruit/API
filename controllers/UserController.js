const nodemailer = require('nodemailer');

class UserController {
    
    index = (req, res, next) => {
        res.status(201).send('API Connected');
    }

    contact = async (req, res, next) => {
        // 01 Check Auth Header
        if (req.headers.authorization !== `TOKEN ${process.env.AUTH_TOKEN}`) {
            res.status(401).send('Unauthorized');
        }

        // 02 Create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });

        // 03 Create options
        const options = {
            from: process.env.NODEMAILER_USER,
            to: process.env.NODEMAILER_USER,
            subject: 'Nieuwe intake aanvraag.',
            text: JSON.stringify(req.body),
        }

        // 04 Send Mail
        transporter.sendMail(options, function (err, info) {
            if(err) {
                console.log(err);
                return;
            }
            
            // 05 Send Reponse
            console.log(`Send: ${info.response}`);
        });

        // res.status(201).json({
        //     status: 'Email sent!',
        //     body: req.body,
        // });
    }
}

module.exports = UserController;