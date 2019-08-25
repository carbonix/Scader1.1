var express = require('express');
var router = express.Router();
var signupController = require('../controllers/signup');
var logincontroller = require('../controllers/login');

/* Get Sign up page */
router.get('/signup', function(req, res, next)
{
    res.render('sign/signup', {title:'SignUp', layout: 'signlayout' });
});

//POST the user data

router.post('/signup', signupController.signup);


//Get Login page
router.get('/login', function(req, res, next)
{
    res.render('sign/login', {title:'Login', layout: 'signlayout' });
});

//POST login data
router.post('/login', logincontroller.login);

module.exports = router;