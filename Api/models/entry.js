const mongoose = require('mongoose');
const dbFields = require('../helpers/dbFields');

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

schema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: '_id name budget'
  });

  next();
});

schema.plugin(dbFields, {
  fields: {
    public: ['_id', 'amount', 'description', 'category', 'date', 'createdAt'],
    listing: ['_id', 'amount', 'description', 'category', 'date', 'createdAt'],
    entry: ['_id', 'amount', 'description', 'category', 'date', 'createdAt']
  }
});

module.exports = mongoose.models.Entry || mongoose.model('Entry', schema);
