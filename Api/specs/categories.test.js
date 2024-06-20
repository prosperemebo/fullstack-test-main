const supertest = require('supertest');

const app = require('../app');
const db = require('../db/connect-test');
const Category = require('../models/category');
const User = require('../models/user');
const { genereteAuthToken } = require('../helpers/auth');

const agent = supertest.agent(app);

jest.mock('../helpers/secrets.js');

beforeAll(async () => await db.connect());

describe('Categories', () => {
  let user;
  let userToken;
  let category1;
  let category2;
  let category3;

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

  describe('GET /categories', () => {
    test('Get all categories', () =>
      agent
        .get('/categories?sorter=name')
        .set('Cookie', `accessToken=${userToken}`)
        .expect(200)
        .then(res =>
          expect(res.body).toStrictEqual([
            {
              _id: category1.id,
              name: category1.name,
              budget: category1.budget,
              createdAt: expect.any(String)
            },
            {
              _id: category2.id,
              name: category2.name,
              budget: category2.budget,
              createdAt: expect.any(String)
            },
            {
              _id: category3.id,
              name: category3.name,
              budget: category3.budget,
              createdAt: expect.any(String)
            }
          ])
        ));
  });

  describe('POST /categories', () => {
    test('Create a category with all fields', () =>
      agent
        .post('/categories')
        .set('Cookie', `accessToken=${userToken}`)
        .send({
          name: 'new test category',
          budget: 1000
        })
        .expect(200)
        .then(res =>
          expect(res.body).toStrictEqual({
            _id: expect.any(String),
            name: 'new test category',
            budget: 1000,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          })
        ));

    test('Create category with existing name', () =>
      agent
        .post('/categories')
        .set('Cookie', `accessToken=${userToken}`)
        .send({
          name: 'new test category',
          budget: 1000
        })
        .expect(400)
        .then(res =>
          expect(res.body).toStrictEqual({
            error: 203,
            message: 'The resource already exists',
            data: {}
          })
        ));
  });

  describe('GET /categories/:id', () => {
    test('Get specific category', () =>
      agent
        .get(`/categories/${category1._id}`)
        .set('Cookie', `accessToken=${userToken}`)
        .expect(200)
        .then(res =>
          expect(res.body).toStrictEqual({
            _id: category1.id,
            name: category1.name,
            budget: category1.budget,
            updatedAt: expect.any(String),
            createdAt: expect.any(String)
          })
        ));
  });

  describe('PATCH /categories/:id', () => {
    test('Test updating category', async () =>
      agent
        .patch(`/categories/${category1.id}`)
        .send({ name: 'new name', budget: 500 })
        .set('Cookie', `accessToken=${userToken}`)
        .expect(200)
        .then(res =>
          expect(res.body).toStrictEqual({
            _id: category1.id,
            name: 'new name',
            budget: 500,
            updatedAt: expect.any(String),
            createdAt: expect.any(String)
          })
        ));
  });

  describe('DELETE /categories/:id', () => {
    test('Test deleting Category', async () =>
      agent
        .delete(`/categories/${category1.id}`)
        .set('Cookie', `accessToken=${userToken}`)
        .expect(200)
        .then(res => expect(res.body).toStrictEqual({ message: 'Category deleted successfully' }))
        .then(() => Category.findById(category1.id))
        .then(data => expect(data).toBe(null)));

    test('Cannot delete category twice', () =>
      agent
        .delete(`/categories/${category1.id}`)
        .set('Cookie', `accessToken=${userToken}`)
        .expect(404)
        .then(() => agent.delete(`/categories/${category1.id}`).set('Cookie', `accessToken=${userToken}`).expect(404)));
  });
});
