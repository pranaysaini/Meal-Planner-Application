const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Register User
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {username, email, password} = req.body;

    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).send({message: 'User Already Exist'});
        }

        user = new User({username, email, password});
        user.save();

        const payload = {userId: user.id}
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'})

        res.json({token});
    }

    catch(err){
        res.status(500).send("Server Error")
    }
};

exports.login = async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return req.status(400).json.json({errors: 'Invalid Credentials'})
        }

        const match = await user.comparePassword(password);
        if(!match){
            return req.status(400).json({error: 'Invalid Credentials'})
        }

        const payload = {userId: user.id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json(token);
    }
    catch(err){
        res.status(500).send('Server error');
    }
};


// Get Current User
exports.getIn = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user);
    }
    catch(err){
        res.status(500).send('Server error');
    }
}