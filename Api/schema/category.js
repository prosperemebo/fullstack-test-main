module.exports = {
  category: {
    $id: 'category',
    type: 'object',
    properties: {
      budget: { type: 'number' },
      name: { type: 'string' },
      user: { $ref: 'user' }
    },
    required: ['name'],
    additionalProperties: false
  },
  createCategory: {
    $id: 'createCategory',
    type: 'object',
    properties: {
      budget: { type: 'number' },
      name: { type: 'string' },
      user: { $ref: 'user' }
    },
    required: ['name'],
    additionalProperties: false
  }
};
