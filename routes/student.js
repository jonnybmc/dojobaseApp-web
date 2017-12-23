var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var jwt = require('jsonwebtoken');

//set storage engine for multer
var storage = multer.diskStorage({
    destination : '../public/uploads/',
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initiialize the upload 
var upload = multer({
    dest : storage
}).single('avatar');


var Student = require('../models/student');
var User = require('../models/user');

router.get('/', function(req,res,next){
    Student.find()
    .exec(function(err,students){
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error : err
            });
        }
        res.status(200).json({
            message : 'Success',
            obj : students
        });
    });
});

router.get('/:id' , function(req,res,next){
    Student.findById(req.params.id , function(err, student){
        if (err) {
            return res.status(500).json({
                title : 'Oops, an error has occured',
                error : err
            });
        }
        res.status(200).json({
            title : 'Success',
            obj : student
        });
    });
 });

//intentionally placed below standard get('/') so it can safeguard any routes after that one.
router.use('/', function(req,res,next){
        jwt.verify(req.query.token, 'secret', function(err,decoded){
            if (err) {
                return res.status(401).json({
                    title : 'Not Authenticated',
                    error : err
                });
            }
            next();
        });
});


router.post('/', function(req,res,next){
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user){
        if (err) {
            return res.status(500).json({
                title : 'An error occured',
                error : err
            });
        }
        var student = new Student({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            gender : req.body.gender,
            dateOfBirth : req.body.dateOfBirth,
            streetAddress : req.body.streetAddress,
            city : req.body.city,
            zipCode : req.body.zipCode,
            rank : req.body.rank,
            contactNumber : req.body.contactNumber,
            email : req.body.email,
            avatarSrc : req.body.avatarSrc,
            createdBy : user._id
        });
        student.save(function(err,result){
            if (err) {
                return res.status(500).json({
                    title : 'An error has occured',
                    error: err
                });
            }
            user.students.push(result);
            user.save();
            res.status(201).json({
                message : 'a new student has been added',
                obj : result
            });
        });

    });   
});

router.patch('/:id', function(req,res,next){
    var decoded = jwt.decode(req.query.token);
    Student.findById(req.params.id, function(err,student){
        if (err) {
            return res.status(500).json({
                title : 'An error has occured',
                error : err
            });
        }
        if (!student) {
            return res.status(500).json({
                title : 'Message not found',
                error : {student : 'Message not found'}
            });
        }
        if (student.createdBy != decoded.user._id) {
            return res.status(401).json({
                title : 'Not authenticated',
                error : {message : 'Users do not match'}
            });
        }
        student.firstName = req.body.firstName;
        student.lastName = req.body.lastName;
        student.gender = req.body.gender;
        student.dateOfBirth = req.body.dateOfBirth;
        student.streetAddress = req.body.streetAddress;
        student.city = req.body.city;
        student.zipCode = req.body.zipCode;
        student.rank = req.body.rank;
        student.contactNumber = req.body.contactNumber;
        student.email = req.body.email;
        student.avatarSrc = req.body.avatarSrc;  
        student.save(function(err,result){
            if (err) {
                return res.status(500).json({
                    title : 'An error has occured',
                    error: err
                });
            }
            res.status(200).json({
                student: 'Student details have been updated',
                obj : result
            });
        });
    });
});

router.delete('/:id', function(req,res,next){
    var decoded = jwt.decode(req.query.token);
    Student.findById(req.params.id, function(err,student){
        if (err) {
            return res.status(500).json({
                title : 'An error has occured',
                error : err
            });
        }
        if (!student) {
            return res.status(500).json({
                title : 'Student not found',
                error : {student : 'Message not found'}
            });
        }
        if (student.createdBy != decoded.user._id) {
            return res.status(401).json({
                title : 'Not authenticated',
                error : {message : 'Users do not match'}
            });
        }
        student.remove(function(err,result){
            if (err) {
                return res.status(500).json({
                    title: 'An error has occured',
                    error : err
                });
            }
            res.status(200).json({
                student : 'Student has been successfully deleted',
                obj:result
            });
        });
    });
});

module.exports = router;