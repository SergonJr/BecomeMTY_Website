const express= require('express');
const router = express.Router();

router.get('/users/login', (req, res) => {
    res.send('Logging in...');
});

router.get('/users/signup', (req, res) => {
    res.send('Authenthication');
});

module.exports = router;