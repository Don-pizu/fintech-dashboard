//routes/dashboardRoutes.js

const express = require('express');
const router = express.Router();
const { getDashboard, getTransactions } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');
const { makeTransaction } = require('../controllers/transactionController');

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: get user's dashboard summary (requires JWT)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns username, role, and balance
 */

// All routes protected - user must be logged in  
router.post('/transactions', protect, makeTransaction);
router.get('/transactions', protect, getTransactions); // To get all the transactions of a user with the token
router.get('/dashboard', protect, getDashboard);            // get dashboard of a user using the token


module.exports = router;


