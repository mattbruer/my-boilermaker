const router = require('express').Router();
const {
  models: { Song },
} = require('../db');
const { requireToken } = require('./middleware');

module.exports = router;

router.get('/', requireToken, async (req, res, next) => {
  try {
    const songs = await Song.findAll({ where: { userId: req.user.id } });

    res.json(songs);
  } catch (error) {
    next(error);
  }
});

router.post('/', requireToken, async (req, res, next) => {
  try {
    const song = await Song.create({ ...req.body, userId: req.user.id });
    res.json(song);
  } catch (error) {
    next(error);
  }
});
