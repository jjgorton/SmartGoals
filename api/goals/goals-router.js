const express = require('express');
const Goals = require('./goals-model');
const Steps = require('./steps-model');
const permissions = require('../../auth/permissions');
const router = express.Router();

//Create new Goal
router.post('/', permissions.ws(['admin', 'contrib']), (req, res) => {
    const data = req.body;

    Goals.add(data)
        .then((goal) =>
            res.status(201).json({
                message: 'New Goal created',
                goal,
            })
        )
        .catch((err) => res.status(500).json({ message: err.message }));
});

//Create new Step
router.post('/step', permissions.step(['admin', 'contrib']), (req, res) => {
    const data = req.body;

    Steps.add(data)
        .then((step) =>
            res.status(201).json({
                message: 'New Step added',
                step,
            })
        )
        .catch((err) => res.status(500).json({ message: err.message }));
});

//Get Goals on WS and attach corresponding steps to goals
router.get(
    '/:id',
    permissions.ws(['admin', 'contrib', 'viewer']),
    async (req, res) => {
        try {
            const id = req.params.id;
            const goals = await Goals.findByWorkspace(id);

            Promise.all(
                goals.map(async (goal) => {
                    const steps = await Steps.findByGoal(goal.id);
                    return { ...goal, steps };
                })
            )
                .then((goalSteps) => res.status(200).json(goalSteps))
                .catch((err) =>
                    res.status(500).json({
                        error: err.message,
                        message:
                            'A problem occurred while retrieving your steps.',
                    })
                );
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);

//Update Goal
router.put('/', permissions.goal(['admin', 'contrib']), (req, res) => {
    const goalID = req.body.id;
    const newInfo = req.body;
    Goals.update(goalID, newInfo)
        .then((goal) => {
            if (!goal) {
                res.status(404).json({ message: 'Goal ID does not exist.' });
            } else {
                res.status(200).json(goal);
            }
        })
        .catch((err) => res.status(500).json({ message: err.message }));
});

//Delete Goal
router.delete('/:id', permissions.goal(['admin', 'contrib']), (req, res) => {
    const goalID = req.params.id;
    Goals.remove(goalID)
        .then((goal) => {
            if (!goal) {
                res.status(404).json({
                    message: 'Goal ID does not exist.',
                });
            } else {
                res.status(200).json({
                    message: `Successfully deleted goal ${goalID}`,
                    goalID: goalID,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});

module.exports = router;
