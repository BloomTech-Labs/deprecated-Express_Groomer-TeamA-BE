const router = require('express').Router;
const authRequired = require('../middleware/authRequired');
const certificationsModel = require('./certificationsModel');

router.post('/', authRequired, async (req, res) => {
  try {
    const cert = { ...req.body, groomer_id: req.profile.id };
    const newCert = certificationsModel.createCertificate(cert);

    res.status(201).json({ newCert });
  } catch (e) {
    console.log(e.stack);
    res.status(500).json({ error: 'Error creating certificate.' });
  }
});

module.exports = router;
