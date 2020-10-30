import request from 'supertest';
import {signToken} from '../helpers/auth';
import Query from '../models/Query';
import app from '../app';

describe('query', () => {
    beforeEach (async () => {
        await Query.deleteMany({});
    });
    afterEach(async () => {
        await Query.deleteMany();
    });
    const mockToken = signToken({
        _id: '0',
        name: 'test',
        role: 'Admin',
        email: 'test@gmail.com',
      });
    const testQuery = {
        name: 'user',
        email:'user@gmail.com',
        body: 'yeshhguj jgk'
    };

    describe('Post/', () => {
        it('should return created query ', async(done) => {
            const res = await request(app)
            .post('/query')
            .send(testQuery)

            expect(res.status).toEqual(201);
            expect(res.body).toHaveProperty('status', 201);
            expect(res.body.data).toHaveProperty('name', testQuery.name);
            expect(res.body.data).toHaveProperty('body', testQuery.body);
            expect(res.body.data).toHaveProperty('email', testQuery.email);
            done()
        })
    });


    describe('GET /', () => {
        it('should return all queries when a valid token is provided', async () => {
          await Query.insertMany([
            testQuery,
            { ...testQuery, email: 'test1@gmail.com', name: 'test1' },
            { ...testQuery, email: 'test2@gmail.com', name: 'test2' },
          ]);
          const res = await request(app)
            .get('/query/')
            .set('authorization', `Bearer ${mockToken}`);
          expect(res.status).toEqual(200);
          expect(res.body).toHaveProperty('status', 200);
          expect(res.body.data).toHaveProperty('count');
          expect(res.body.data).toHaveProperty('queries');
        });
      });
})