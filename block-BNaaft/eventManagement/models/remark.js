const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const remarkSchema = new Schema(
  {
    content: { type: String, required: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  },
  { timestamps: true }
);

const Remark = mongoose.model('Remark', remarkSchema);

module.exports = Remark;
