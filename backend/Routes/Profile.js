const authMiddleware = require("./../Middlewares/checkAuthToken"); // Assuming you have some kind of authentication middleware

const express = require('express');
const router = express.Router();
// const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/UserSchema'); // Adjust the path as needed

// Assuming you have a middleware to authenticate users
router.use(authMiddleware);

// Get user profile
router.get('/getdata', async (req, res) => {
    try {
        const user = await User.findById(req.userId); // Assuming user ID is stored in req.user.id
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error); // Detailed error log
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user profile
router.put('/', async (req, res) => {
    let { name, email, password, height, weight, age, goal } = req.body;
    // console.log("name, email, password, age, height, weight, weightGoal",name, email, password, age, height, weight, weightGoal)
    // console.log("req",req.body)
    weight= [
        {
            weight: weight,
            unit: "kg",
            date: Date.now()
        }
    ]
    height= [
        {
            height: height,
            date: Date.now(),
            unit: "cm"
        }
    ]
    // gender,
    // dob,
    // goal,
    // activityLevel
    try {
        let user = await User.findById(req.userId);
        console.log("user:",user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        if (password) {
            user.password = password; // Ensure you hash the password before saving
        }
        user.age = age || user.age;
        user.height = height || user.height;
        user.weight = weight || user.weight;
        user.goal = goal || user.goal;

        await user.save();
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Error updating profile:', error); // Detailed error log
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
