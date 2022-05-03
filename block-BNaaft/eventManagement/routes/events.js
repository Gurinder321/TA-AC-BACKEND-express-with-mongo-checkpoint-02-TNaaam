var express = require('express');
var router = express.Router();
const Event = require('../models/event');

router.get('/', (req, res) => {
  // fetch list of books from database
  Event.find({}, (err, events) => {
    if (err) return next(err);
    res.render('events', { events });
  });
});

router.get('/new', (req, res) => {
  res.render('addEvent');
});

// when user presses enter
router.post('/', (req, res, next) => {
  // capture data
  // console.log(req.body);
  // save it to the database
  Event.create(req.body, (err, createdEvent) => {
    if (err) return next(err);
    res.redirect('/events');
  });
  //   response
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Event.findById(id)
    // .populate('comments')
    .exec((err, event) => {
      if (err) return next(err);
      res.render('eventDetails', { event });
    });
});

// edit book form
router.get('/:id/edit', (req, res, next) => {
  // find the book details
  const id = req.params.id;
  Event.findById(id, (err, event) => {
    if (err) return next(err);
    res.render('editEventForm', { event });
  });
  // render update form
});

router.post('/:id', (req, res) => {
  // capture the updated data from form
  const id = req.params.id;
  // using id find the book and update it with data coming from the form
  Event.findByIdAndUpdate(id, req.body, (err, updatedEvent) => {
    if (err) return next(err);
    res.redirect('/events/' + id);
  });
});

// delete event
router.get('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Event.findByIdAndDelete(id, (err, event) => {
    if (err) return next(err);
    res.redirect('/events');
  });
});

module.exports = router;