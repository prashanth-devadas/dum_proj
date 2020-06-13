const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

// Get all subscribers
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});

// Get one subscriber
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber);
});

// Create one subscriber
router.post('/', async (req, res)=> {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedChannel: req.body.subscribedChannel,
        recipe: JSON.stringify(req.body.recipe)
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
});

// Create a recipe with a new name
router.post('/', async (req, res)=> {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedChannel: req.body.subscribedChannel,
        recipe: req.body.recipe
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
});

// Update one subscriber
router.patch('/:id', getSubscriber, async (req, res) => {
    if(req.body.name !== null){
        res.subscriber.name = req.body.name;
    }

    if(req.body.subscribedChannel !== null){
        res.subscriber.subscribedChannel = req.body.subscribedChannel;
    }

    if(req.body.recipe !== null){
        res.subscriber.recipe = req.body.recipe;
    }

    try {
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
});

// Delete one subscriber
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove();
        res.json('Deleted the subscriber');
    } catch (err) {
        res.status(500).json({message: err.message});
        
    }
})

async function getSubscriber(req, res, next){
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({ message: "Can't find subscriber"});
        }
    } catch (err) {
        return res.status(500).json({ message: err.message});
    }

    res.subscriber = subscriber;
    next();
}

module.exports = router;

