const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = Schema(
  {
    amount: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 128
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      index: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      required: true
    },
    date: {
      type: Date,
      default: Date.now()
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.models.Entry || mongoose.model('Entry', schema);
