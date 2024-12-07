const express = require('express');
const router = express.Router();
const { exportTransactionsToCSV, importTransactionsFromCSV } = require('../controllers/csvController');
const auth = require('../middleware/auth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// @route   GET api/csv/export
// @desc    Export transactions to CSV
// @access  Private
router.get('/export', auth, exportTransactionsToCSV);

// @route   POST api/csv/import
// @desc    Import transactions from CSV
// @access  Private
router.post('/import', auth, upload.single('file'), importTransactionsFromCSV);

module.exports = router;
