module.exports = {
  createEntry: {
    $id: 'createEntry',
    type: 'object',
    properties: {
      amount: { type: 'number' },
      description: { type: 'string' },
      category: { oneOf: [{ $ref: 'category' }, { type: 'null' }] },
      user: { $ref: 'user' },
      date: { type: 'string' }
    },
    required: ['amount', 'description'],
    additionalProperties: false
  },
  updateEntry: {
    $id: 'updateEntry',
    type: 'object',
    properties: {
      amount: { type: 'number' },
      description: { type: 'string' },
      category: { oneOf: [{ $ref: 'category' }, { type: 'null' }] },
      date: { type: 'string' }
    },
    additionalProperties: false
  }
};