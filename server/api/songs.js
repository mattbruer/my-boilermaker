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

router.put('/', requireToken, async (req, res, next) => {
  try {
    req.body.measures = JSON.stringify(req.body.measures);
    const song = await Song.update(req.body, {
      where: { id: req.body.id, userId: req.user.id },
    });
    res.json(song);
  } catch (error) {
    next(error);
  }
});
