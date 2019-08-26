var User = require('../models/user');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

exports.login = function(req,res,next){
    mongoose.connect("mongodb://localhost:27017/Scader", { useNewUrlParser: true });

    User.findOne({email: req.body.email}, function(err, user){
       if(err) throw err; 
       if(user)
       {
            bcrypt.compare(req.body.upass, user.upass, function(err, isMatch)
            {
            if(err) throw err;
            
            if(isMatch)
            {
                res.render('index', { title: 'Scader',user });
            }
            else{
                var errors =[];
                errors.push({msg : 'Wrong Password'});
                res.render('sign/login', {title:'Login', layout: 'signlayout', errors});
            }
            
            });
        }
        else
        {
            var errors =[];
            errors.push({msg : 'User is not registered'});
            res.render('sign/signup', {title:'Login', layout: 'signlayout', errors});
        }
    });
}