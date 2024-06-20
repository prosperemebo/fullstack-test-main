const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = Schema(
  {
    name: {
      type: String,
      maxlength: 128,
      trim: true
    },
    budget: {
      type: Number
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.models.Category || mongoose.model('Category', schema);
