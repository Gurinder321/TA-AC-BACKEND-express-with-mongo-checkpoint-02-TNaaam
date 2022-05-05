const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    //   basic info of user

    title: { type: String, required: true },

    summary: String,
    host: String,
    start_date: { type: Date, default: Date.now },
    end_date: { type: Date, default: Date.now },
    event_category: [String],
    location: String,
    likes: { type: Number, default: 0 },
    phone: Number,
    remarks: [{ type: Schema.Types.ObjectId, ref: 'Remark' }],
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
