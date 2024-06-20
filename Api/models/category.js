const mongoose = require('mongoose');
const dbFields = require('../helpers/dbFields');

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

schema.index({ name: 1, user: 1 }, { unique: true });

schema.plugin(dbFields, {
  fields: {
    public: ['_id', 'name', 'budget', 'user', 'createdAt'],
    listing: ['_id', 'name', 'budget', 'user', 'createdAt'],
    category: ['_id', 'name', 'budget', 'user', 'updatedAt', 'createdAt']
  }
});

module.exports = mongoose.models.Category || mongoose.model('Category', schema);
