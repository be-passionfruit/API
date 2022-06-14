class MollieController {
    
    index = (req, res, next) => {
        res.status(201).send('Mollie OK!');
    }
}

module.exports = MollieController;