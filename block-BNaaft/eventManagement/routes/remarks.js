const express = require('express');
const router = express.Router();

const Remark = require('../models/remark');
const Event = require('../models/event');

router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  Remark.findById(id, (err, remark) => {
    if (err) return next(err);
    res.render('updateRemark', { remark });
  });
});

router.post('/:id', (req, res, next) => {
  console.log(req.body);
  const id = req.params.id;
  Remark.findByIdAndUpdate(id, req.body, (err, updatedRemark) => {
    if (err) return next(err);
    res.redirect('/events/' + updatedRemark.eventId);
  });
});

router.get('/:id/delete', (req, res, next) => {
  const remarkId = req.params.id;
  Remark.findByIdAndRemove(remarkId, (err, comment) => {
    if (err) return next(err);
    Event.findByIdAndUpdate(remark.eventId, { $pull: { remarks: remark._id } }, (err, event) => {
      res.redirect('/events/' + remark.remarkId);
    });
  });
});

module.exports = router;
