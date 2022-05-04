var express = require('express');
var router = express.Router();
const Event = require('../models/event');
const Remark = require('../models/remark');

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
    .populate('remarks')
    .exec((err, event) => {
      if (err) return next(err);
      console.log(event);
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
  Event.findByIdAndDelete(req.params.id, (err, event) => {
    if (err) return next(err);
    Remark.deleteMany({ eventId: event.id }, (err, info) => {
      res.redirect('/events');
    });
  });
});

// create a comment
router.post('/:id/remarks', (req, res, next) => {
  const id = req.params.id;
  req.body.eventId = id;
  Remark.create(req.body, (err, remark) => {
    if (err) return next(err);
    // update book with comment id into comment section
    Event.findByIdAndUpdate(id, { $push: { remarks: remark._id } }, (err, updatedEvent) => {
      if (err) return next(err);
      res.redirect('/events/' + id);
    });
  });
});

module.exports = router;
