module.exports = {
  createEntry: {
    $id: 'createEntry',
    type: 'object',
    properties: {
      amount: { type: 'number' },
      description: { type: 'string' },
      category: { oneOf: [{ $ref: 'objectId' }, { type: 'null' }] },
      type: { type: 'string', enum: ['income', 'expense'] },
      user: { $ref: 'user' },
      date: { type: 'string' }
    },
    required: ['amount', 'description', 'type'],
    additionalProperties: false
  },
  updateEntry: {
    $id: 'updateEntry',
    type: 'object',
    properties: {
      amount: { type: 'number' },
      description: { type: 'string' },
      type: { type: 'string', enum: ['income', 'expense'] },
      category: { oneOf: [{ $ref: 'objectId' }, { type: 'null' }] },
      date: { type: 'string' }
    },
    additionalProperties: false
  }
};
