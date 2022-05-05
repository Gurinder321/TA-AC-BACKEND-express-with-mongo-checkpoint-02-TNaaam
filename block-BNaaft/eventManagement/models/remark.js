const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const remarkSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  },
  { timestamps: true }
);

const Remark = mongoose.model('Remark', remarkSchema);

module.exports = Remark;
