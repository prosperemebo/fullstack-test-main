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
  }
};
