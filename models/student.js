var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require ('mongoose-unique-validator');


var schema = new Schema({
    firstName : {
        type:String,
        required:true
    },
    lastName : {
        type:String,
        required:true
    },
    gender : {
        type: String,
        required:true
    },
    dateOfBirth : {
        type : String,
        required : true
    },
    streetAddress : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    zipCode : {
        type : Number,
        required : true
    },
    rank : {
        type : String,
        required : true
    },
    contactNumber : {
        type : Number
    },
    email : {
        type : String,
        unique : true
    },
    avatarSrc : {
        type : String
    }

});

schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Student', schema);