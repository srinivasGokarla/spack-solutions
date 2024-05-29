const express = require('express');
const { getContent, updateSubscription } = require('../controllers/subscriptionController');
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get('/content', verifyToken, getContent);
router.post('/subscribe', verifyToken, updateSubscription);

module.exports = router;
