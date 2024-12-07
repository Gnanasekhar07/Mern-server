const fs = require('fs');
const path = require('path');
const Transaction = require('../models/Transaction');
const csv = require('csv-writer').createObjectCsvWriter;

const exportTransactionsToCSV = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });

    const csvWriter = csv({
      path: path.join(__dirname, '../exports/transactions.csv'),
      header: [
        { id: 'type', title: 'TYPE' },
        { id: 'amount', title: 'AMOUNT' },
        { id: 'category', title: 'CATEGORY' },
        { id: 'date', title: 'DATE' },
        { id: 'description', title: 'DESCRIPTION' },
      ],
    });

    await csvWriter.writeRecords(transactions);
    res.download(path.join(__dirname, '../exports/transactions.csv'), 'transactions.csv');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const importTransactionsFromCSV = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const csvFilePath = file.path;
  const csvStream = fs.createReadStream(csvFilePath);
  const csvParser = require('csv-parser');

  const transactions = [];

  csvStream.pipe(csvParser())
    .on('data', (row) => {
      transactions.push({
        type: row.TYPE,
        amount: parseFloat(row.AMOUNT),
        category: row.CATEGORY,
        date: new Date(row.DATE),
        description: row.DESCRIPTION,
        user: req.user.id,
      });
    })
    .on('end', async () => {
      try {
        await Transaction.insertMany(transactions);
        res.json({ msg: 'Transactions imported successfully' });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    });
};

module.exports = {
  exportTransactionsToCSV,
  importTransactionsFromCSV,
};
