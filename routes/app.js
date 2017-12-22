var express = require('express');
var router = express.Router();
// var User = require('../models/user');

router.get('/', function (req, res, next) {
    // User.findOne({}, function(err,doc){
    //     if (err) {
    //         return res.send('error');
    //     }
    //     if (doc) {
    //         email = doc.email;
    //     }
    //     res.render('students', {
    //         email:email
    //     });
    // });
    res.render('index');
    
});
// router.post('/', function(req,res,next){
//     var email = req.body.email;
//     var user = new User({
//         firstName : 'Jonathan',
//         lastName : 'Booysen',
//         password : 'super-secret',  
//         email: email
//     });

//     user.save();
//     res.redirect('/');
    
// });

module.exports = router;
