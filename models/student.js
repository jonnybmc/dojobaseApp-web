var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require ('mongoose-unique-validator');

var User = require('./user');

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
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }

});

schema.post('remove', function(student){
    User.findById(student.createdBy, function(err,user){
        user.students.pull(student._id);
        user.save();
    });
});

schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Student', schema);