var User = require('../models/user');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


exports.signup = function(req, res, next){
    mongoose.connect("mongodb://localhost:27017/Scader", { useNewUrlParser: true });

    
    //Checking some validations
    const {uname, email, upass, upass2 , phone} = req.body;
    let errors = [];
    if(!uname || !email || !upass || !upass2 || !phone){
        errors.push({ msg: 'Please fill all in fields'});
    }
    else if(upass.length < 6)
    {
        errors.push({ msg: 'Password should be atleast 6 characters' });
    }
    else if(upass !== upass2){
        errors.push({ msg: 'Passwords do not match' });
    }
    if(errors.length > 0)
    {
        res.render('sign/signup', {title:'SignUp', layout: 'signlayout', errors});
    }
    else{
    User.findOne({ $or: [{email: req.body.email},{phone: req.body.phone}] }, function(err, user){
        if(user){
            errors.push({ msg: 'User already exist' });
            res.render('sign/signup', {title:'SignUp', layout: 'signlayout', errors});
        }
        else{
            var newuser = User();
            newuser.uname = req.body.uname;
            newuser.email = req.body.email;
            newuser.phone = req.body.phone;
            newuser.upass = req.body.upass;

            //Hash Password
            bcrypt.genSalt(10,(err, salt) =>
                bcrypt.hash(newuser.upass, salt, (err, hash) => {
                    if(err) throw err;
                    
                        //Save Hash
                    newuser.upass = hash;
                    newuser.save();
                    
                })
            )


            
            
            res.redirect('/');
        }
    });
    }
};