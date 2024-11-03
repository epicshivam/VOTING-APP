const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const {jwtAuthMiddleware,generateToken} = require('../jwt.js');

router.post('/signup', async (req,res)=>{
    try {

        const data = req.body;
        const newUser = new User(data);
        const response = await newUser.save();
        console.log('data saved');

        const payload = {
            id: response._id,
        }

        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log('Token is : ' + token);
        res.status(200).json({response:response, token: token});

    } catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});

router.post('/login', async(req,res)=>{
    try {
        const {adhaarCardNumber,password} = req.body;

        const user = await User.findOne({adhaarCardNumber:adhaarCardNumber});
        if(!user || !(await user.comparePassword(password))){
            res.status(401).json({error:'Invalid username or password'});
    }
    const payload = {
        id : user.id,
    }

    const token = generateToken(payload);

    res.json({token});

}   catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
}});

router.get('/profile', jwtAuthMiddleware, async(req,res)=>{
    try {
        const userData = req.user;
        const userId = userData.id;
        
        const user = await User.findById(userId);

        res.status(200).json({error : 'Internal Server Error'});
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.put('/profile/password', jwtAuthMiddleware, async (req,res)=>{
    try{
        const userId = req.user.id;
        const {currentPassword, newPassword} = req.body;

        const user = await User.findById(userId);

        if(!(await user.comparePassword(currentPassword))){
            res.status(401).json({error:'Invalid username or password'});
        }

        user.password = newPassword;
        await user.save();

        console.log('password updated');
        res.status(200).json({message:"Password updated"});
    } catch(err){
        res.status(404).json({error:'Invalid Error'});
    }
});


module.exports = router;