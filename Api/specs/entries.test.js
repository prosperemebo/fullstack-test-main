const supertest = require('supertest');

const app = require('../app');
const db = require('../db/connect-test');
const Category = require('../models/category');
const Entry = require('../models/entry');
const User = require('../models/user');
const { genereteAuthToken } = require('../helpers/auth');

const agent = supertest.agent(app);

jest.mock('../helpers/secrets.js');

beforeAll(async () => await db.connect());

describe('Entries', () => {
  let user;
  let userToken;

  let category1;
  let category2;
  let category3;

  let entry1;
  let entry2;
  let entry3;

  beforeAll(async () => {
    await db.clear();

    const testUser = async () => {
      user = await new User({
        name: 'Prosper',
        lastname: 'Emebo',
        email: 'prosperemebo@meblabs.com',
        password: 'test',
        roles: [],
        active: true
      }).save();

      userToken = genereteAuthToken(user).token;
    };

    return testUser();
  });

  beforeAll(async () => {
    const testCategory1 = async () => {
      category1 = await new Category({
        name: 'Test Category 1',
        budget: Math.floor(Math.random() * 1000) + 1,
        user: user._id
      }).save();
    };

    const testCategory2 = async () => {
      category2 = await new Category({
        name: 'Test Category 2',
        budget: Math.floor(Math.random() * 1000) + 1,
        user: user._id
      }).save();
    };

    const testCategory3 = async () => {
      category3 = await new Category({
        name: 'Test Category 3',
        budget: Math.floor(Math.random() * 1000) + 1,
        user: user._id
      }).save();
    };

    return Promise.all([testCategory1(), testCategory2(), testCategory3()]);
  });

  beforeAll(async () => {
    const testEntry1 = async () => {
      entry1 = await new Entry({
        amount: Math.floor(Math.random() * 1000) + 1,
        description: 'Test Entry 1',
        user: user._id,
        type: 'income'
      }).save();
    };

    const testEntry2 = async () => {
      entry2 = await new Entry({
        amount: Math.floor(Math.random() * 100) + 1,
        description: 'Test Entry 2',
        user: user._id,
        type: 'expense',
        category: category1.id
      }).save();
    };

    const testEntry3 = async () => {
      entry3 = await new Entry({
        amount: Math.floor(Math.random() * 100) + 1,
        description: 'Test Entry 3',
        user: user._id,
        type: 'expense',
        category: category2.id
      }).save();
    };

    return Promise.all([testEntry1(), testEntry2(), testEntry3()]);
  });

  describe('GET /entries', () => {
    test('Get all entries', () =>
      agent
        .get('/entries?sorter=name')
        .set('Cookie', `accessToken=${userToken}`)
        .expect(200)
        .then(res =>
          expect(res.body).toStrictEqual([
            {
              _id: entry1.id,
              amount: entry1.amount,
              description: entry1.description,
              type: entry1.type,
              date: expect.any(String),
              createdAt: expect.any(String)
            },
            {
              _id: entry2.id,
              amount: entry2.amount,
              description: entry2.description,
              type: entry2.type,
              category: {
                _id: category1.id,
                name: category1.name,
                budget: category1.budget
              },
              date: expect.any(String),
              createdAt: expect.any(String)
            },
            {
              _id: entry3.id,
              amount: entry3.amount,
              description: entry3.description,
              type: entry3.type,
              category: {
                _id: category2.id,
                name: category2.name,
                budget: category2.budget
              },
              date: expect.any(String),
              createdAt: expect.any(String)
            }
          ])
        ));
  });

  describe('GET /entries/stats', () => {
    test('Get entries Stats', () =>
      agent
        .get('/entries/stats')
        .set('Cookie', `accessToken=${userToken}`)
        .expect(200)
        .then(res =>
          expect(res.body).toStrictEqual({
            income: {
              count: 1,
              totalAmount: entry1.amount,
              type: 'income'
            },
            expense: {
              count: 2,
              totalAmount: entry2.amount + entry3.amount,
              type: 'expense'
            }
          })
        ));
  });

  describe('POST /entries', () => {
    test('Create a entry with all fields', () =>
      agent
        .post('/entries')
        .set('Cookie', `accessToken=${userToken}`)
        .send({
          amount: 3000,
          description: 'test entry',
          type: 'income'
        })
        .expect(200)
        .then(res =>
          expect(res.body).toStrictEqual({
            _id: expect.any(String),
            description: 'test entry',
            amount: 3000,
            type: 'income',
            date: expect.any(String),
            createdAt: expect.any(String)
          })
        ));

    test('Test for invalid type', () =>
      agent
        .post('/entries')
        .set('Cookie', `accessToken=${userToken}`)
        .send({
          amount: 3000,
          description: 'test entry',
          type: 'type'
        })
        .expect(400)
        .then(res =>
          expect(res.body).toStrictEqual({
            error: 200,
            message: 'Validation error',
            data: '/type'
          })
        ));

    test('Test for invalid category', () =>
      agent
        .post('/entries')
        .set('Cookie', `accessToken=${userToken}`)
        .send({
          amount: 3000,
          description: 'test entry',
          category: 'invalid',
          type: 'type'
        })
        .expect(400)
        .then(res =>
          expect(res.body).toStrictEqual({
            error: 200,
            message: 'Validation error',
            data: '/category'
          })
        ));
  });

  describe('GET /entries/:id', () => {
    test('Get specific entry', () =>
      agent
        .get(`/entries/${entry1._id}`)
        .set('Cookie', `accessToken=${userToken}`)
        .expect(200)
        .then(res =>
          expect(res.body).toStrictEqual({
            _id: entry1.id,
            amount: entry1.amount,
            description: entry1.description,
            type: entry1.type,
            date: expect.any(String),
            createdAt: expect.any(String)
          })
        ));
  });

  describe('PATCH /entries/:id', () => {
    test('Test updating entry', async () =>
      agent
        .patch(`/entries/${entry1.id}`)
        .send({ description: 'new description' })
        .set('Cookie', `accessToken=${userToken}`)
        .expect(200)
        .then(res =>
          expect(res.body).toStrictEqual({
            _id: entry1.id,
            amount: entry1.amount,
            description: 'new description',
            type: entry1.type,
            date: expect.any(String),
            createdAt: expect.any(String)
          })
        ));
  });

  describe('DELETE /entries/:id', () => {
    test('Test deleting Entry', async () =>
      agent
        .delete(`/entries/${entry1.id}`)
        .set('Cookie', `accessToken=${userToken}`)
        .expect(200)
        .then(res => expect(res.body).toStrictEqual({ message: 'Entry deleted successfully' }))
        .then(() => Entry.findById(entry1.id))
        .then(data => expect(data).toBe(null)));

    test('Cannot delete category twice', () =>
      agent
        .delete(`/entries/${entry1.id}`)
        .set('Cookie', `accessToken=${userToken}`)
        .expect(404)
        .then(() => agent.delete(`/entries/${entry1.id}`).set('Cookie', `accessToken=${userToken}`).expect(404)));
  });
});
