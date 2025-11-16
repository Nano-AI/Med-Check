// Express.js backend for warnings with lowdb
const express = require('express');
const { JSONFilePreset } = require('lowdb/node');
const cors = require('cors');
const app = express();
const port = 3001;

// Setup lowdb
let db;
(async () => {
  db = await JSONFilePreset('./db.json', { warnings: [] });
})();

app.use(cors());
app.use(express.json());

// POST /warnings - Add a warning
app.post('/warnings', async (req, res) => {
  const {
    companyHash,
    dose,
    medicine,
    productionLocation,
    provider,
    manufactureDateStart,
    manufactureDateEnd,
    title,
    severity,
    description
  } = req.body;

  // Required fields check
  if (!companyHash || !title || !severity || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  await db.update(({ warnings }) => warnings.push({
    companyHash,
    dose,
    medicine,
    productionLocation,
    provider,
    manufactureDateStart,
    manufactureDateEnd,
    title,
    severity,
    description
  }));
  res.status(201).json({ success: true });
});

// GET /warnings - Filter and return warnings
app.get('/warnings', async (req, res) => {
  const {
    companyHash,
    dose,
    medicine,
    productionLocation,
    provider,
    manufactureDateStart,
    manufactureDateEnd,
    title,
    severity,
    description
  } = req.query;

  const { warnings } = db.data;
  let results = warnings;

  if (companyHash) results = results.filter(w => (w.companyHash === undefined || w.companyHash === null || w.companyHash.trim().toLowerCase() === companyHash.trim().toLowerCase()));
  if (dose) results = results.filter(w => (w.dose === undefined || w.dose === null || w.dose.toLowerCase() === dose.toLowerCase()));
  if (medicine) results = results.filter(w => (w.medicine === undefined || w.medicine === null || w.medicine.toLowerCase() === medicine.toLowerCase()));
  if (productionLocation) results = results.filter(w => (w.productionLocation === undefined || w.productionLocation === null || w.productionLocation.toLowerCase() === productionLocation.toLowerCase()));
  if (provider) results = results.filter(w => (w.provider === undefined || w.provider === null || w.provider.trim().toLowerCase() === provider.trim().toLowerCase()));
  if (manufactureDateStart) results = results.filter(w => (w.manufactureDateStart === undefined || w.manufactureDateStart === null || w.manufactureDateStart.toLowerCase() === manufactureDateStart.toLowerCase()));
  if (manufactureDateEnd) results = results.filter(w => (w.manufactureDateEnd === undefined || w.manufactureDateEnd === null || w.manufactureDateEnd.toLowerCase() === manufactureDateEnd.toLowerCase()));
  if (title) results = results.filter(w => (w.title === undefined || w.title === null || w.title.toLowerCase() === title.toLowerCase()));
  if (severity) results = results.filter(w => (w.severity === undefined || w.severity === null || String(w.severity).toLowerCase() === String(severity).toLowerCase()));
  if (description) results = results.filter(w => (w.description === undefined || w.description === null || w.description.toLowerCase() === description.toLowerCase()));

  res.json(results);
});

app.listen(port, () => {
  console.log(`Warning backend listening on port ${port}`);
});
