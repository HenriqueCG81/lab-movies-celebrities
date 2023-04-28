const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');
const router = require('express').Router();

// all your routes here
router.get('/movies', async (req, res) => {
  const movies = await Movie.find().populate('cast');
  res.render('movies/movies.hbs', { movies });
});

router.get('/movies/create', async (req, res) => {
  const celebrity = await Celebrity.find();
  res.render('movies/new-movie.hbs', { celebrity });
});

router.post('/movies/create', async (req, res) => {
  const { title, genre, plot, cast } = req.body;
  await Movie.create({ title, genre, plot, cast });
  res.redirect('/movies');
});

router.post('/movies/delete/:id', async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.redirect('/movies');
});

router.get('/movies/:id/edit', async (req, res) => {
  const movie = await Movie.findById(req.params.id).populate('cast');
  const celebrity = await Celebrity.find();
  res.render('movies/edit-movie', { movie, celebrity });
});

router.post('/movies/edit', async (req, res) => {
  const { title, genre, plot, cast } = req.body;
  await Movie.findByIdAndUpdate(req.query.id, {
    title,
    genre,
    plot,
    cast
  });
  res.redirect(`/movies/${req.query.id}`);
});

router.get('/movies/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id).populate('cast');
  console.log(movie.cast);
  res.render('movies/movie-details.hbs', { movie });
});
module.exports = router;
