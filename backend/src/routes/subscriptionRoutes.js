const express = require('express');
const subscriptionController = require('../controllers/subscription.controller');
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get('/content', 
verifyToken, 
subscriptionController.getContent);
router.post('/subscribe', 
verifyToken, 
subscriptionController.updateSubscription);

module.exports = router;
