module.exports = {
  category: {
    $id: 'category',
    type: 'object',
    properties: {
      budget: { type: 'number' },
      name: { type: 'string' }
    },
    required: ['name'],
    additionalProperties: false
  },
  createCategory: {
    $id: 'createCategory',
    type: 'object',
    properties: {
      budget: { type: 'number' },
      name: { type: 'string' }
    },
    required: ['name'],
    additionalProperties: false
  },
  updateCategory: {
    $id: 'updateCategory',
    type: 'object',
    properties: {
      budget: { type: 'number' },
      name: { type: 'string' }
    },
    additionalProperties: false
  }
};
