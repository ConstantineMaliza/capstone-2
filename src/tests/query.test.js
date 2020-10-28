import request from 'supertest';
import {signToekn} from '../helpers/auth';
import Query from '../models/Query';
import app from '../app';

describe('query', () => {
    beforeEach (async () => {
        await Query.deleteMany({});
    });
    afterEach(async () => {
        await Query.deleteMany();
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
    })
})