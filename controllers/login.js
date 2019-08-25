var User = require('../models/user');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

exports.login = function(req,res,next){
    mongoose.connect("mongodb://localhost:27017/Scader", { useNewUrlParser: true });

    User.findOne({email: req.body.email}, function(err, user){
       if(err) throw err;
       
       
       if(user)
       {
            bcrypt.compare(user.upass, req.body.upass , function(err, isMatch){
                if(err) throw err;
                console.log(req.body.upass );
                if(isMatch)
                {
                    res.send('Need more help');
                }
                else{
                    var errors =[];
                    errors.push({msg : 'Wrong Password'});
                    res.render('sign/login', {title:'Login', layout: 'signlayout', errors});
                }
            });
       }
       else{
           var errors =[];
           errors.push({msg : 'User is not registered'});
           res.render('sign/signup', {title:'SignUp', layout: 'signlayout', errors});       
        }
    });
};