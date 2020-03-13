const express = require('express');
const Goals = require('./goals-model');
const router = express.Router();

//Create new Goal
router.post('/', (req, res) => {
    const data = req.body;

    Goals.add(data)
        .then(goal =>
            res.status(201).json({
                message: 'New Goal created',
                goal
            })
        )
        .catch(err => res.status(500).json({ message: err.message }));
});

//Get Goals on WS

//Update Goal

//Delete Goal

module.exports = router;
