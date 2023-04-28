const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');

router.get('/celebrities', async (req, res) => {
  const celebrity = await Celebrity.find();
  res.render('celebrities/celebrities.hbs', { celebrity });
});

router.get('/celebrities/create', async (req, res) => {
  res.render('celebrities/new-celebrity.hbs');
});

router.post('/celebrities/create', async (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  await Celebrity.create({ name, occupation, catchPhrase });
  res.redirect('/celebrities');
});

router.post('/celebrities/delete/:id', async (req, res) => {
  await Celebrity.findByIdAndDelete(req.params.id);
  res.redirect('/celebrities');
});

router.get('/celebrities/:id', async (req, res) => {
  const celebrity = await Celebrity.findById(req.params.id);
  res.render('celebrities/celebrity-details.hbs', { celebrity });
});
module.exports = router;
