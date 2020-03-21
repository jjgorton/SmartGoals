const express = require('express');
const Goals = require('./goals-model');
const permissions = require('../../auth/permissions');
const router = express.Router();

//Create new Goal
router.post('/', permissions.ws(['admin', 'contrib']), (req, res) => {
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
router.get(
    '/:id',
    permissions.ws(['admin', 'contrib', 'viewer']),
    (req, res) => {
        const id = req.params.id;

        Goals.findByWorkspace(id)
            .then(goals => res.status(200).json(goals))
            .catch(err => res.status(500).json({ message: err.message }));
    }
);

//Update Goal
router.put('/', permissions.goal(['admin', 'contrib']), (req, res) => {
    const goalID = req.body.id;
    const newInfo = req.body;
    Goals.update(goalID, newInfo)
        .then(goal => {
            if (!goal) {
                res.status(404).json({ message: 'Goal ID does not exist.' });
            } else {
                res.status(200).json(goal);
            }
        })
        .catch(err => res.status(500).json({ message: err.message }));
});

//Delete Goal
router.delete('/:id', permissions.goal(['admin', 'contrib']), (req, res) => {
    const goalID = req.params.id;
    Goals.remove(goalID)
        .then(goal => {
            if (!goal) {
                res.status(404).json({
                    message: 'Goal ID does not exist.'
                });
            } else {
                res.status(200).json({
                    message: `Successfully deleted goal ${goalID}`,
                    goalID: goalID
                });
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
});

module.exports = router;
