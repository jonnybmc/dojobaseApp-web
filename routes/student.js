var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

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

router.post('/', function(req,res,next){
    // var path = '';
    // upload(req,res, function(err){
    //     if (err) {
    //         console.log(err);
    //         return res.status(422).json({
    //             title : 'an error occured',
    //             error : err
    //         });
    //     }
    //     path = req.file;
    //     console.log(path);
        
    //     return res.send("Upload Completed for " + path);
    // });
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
        avatarSrc : req.body.avatarSrc

    });
    student.save(function(err,result){
        if (err) {
            return res.status(500).json({
                title : 'An error has occured',
                error: err
            });
        }
        res.status(201).json({
            message : 'a new student has been added',
            obj : result
        });
    });
});

router.patch('/:id', function(req,res,next){
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