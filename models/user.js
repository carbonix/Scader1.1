var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    uname : {type: String, required: true},
    upass : {type: String, required: true},
    phone : {type: Number, required: true},
    email : {type: String, required: true}
});

module.exports = mongoose.model('User', schema);