const express = require('express');
const router = express.Router();
const { addTransaction, getTransactions, deleteTransaction } = require('../controllers/transactionController');
const auth = require('../middleware/auth');

// @route   POST api/transactions
// @desc    Add a new transaction
// @access  Private
router.post('/', auth, addTransaction);

// @route   GET api/transactions
// @desc    Get all transactions
// @access  Private
router.get('/', auth, getTransactions);

// @route   DELETE api/transactions/:id
// @desc    Delete a transaction
// @access  Private
router.delete('/:id', auth, deleteTransaction);

module.exports = router;
