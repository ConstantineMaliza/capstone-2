import request from 'supertest';
import app from '../app';
import User from '../models/User';
import { verifyToken, signToken } from '../helpers/auth';

describe('user', () => {

  beforeEach(async () => {
    await User.deleteMany({});
  });
  afterEach(async () => {

    await User.deleteMany({});

  });
  
const SignupUser = {
      name:"test",
      email:"test@gmail.com",
      password:"$2b$12$xSd2pavqxxiSA09bGrENmeLN3Zkl89uJLXhWTS/lZEvXB3UdZ.hja"
  };
  const LoginUser = {
    email: 'test@gmail.com',
    password: 'Jannyda1',
  };

  describe('POST /signup', () => {
    it('should return valid token when the all request body is valid', async (done) => {
      const res = await request(app).post('/user/signup').send(SignupUser);

      const data = verifyToken(res.body.data);

      expect(res.status).toEqual(201);
      expect(res.body).toHaveProperty('status', 201);
      expect(res.body).toHaveProperty('data');
      expect(data).toHaveProperty('name', SignupUser.name);
      expect(data).toHaveProperty('email', SignupUser.email);
      done();
    });
  });

  
describe('POST /login', () => {
  it('should validate email & password', async (done) => {
    const user = await User.create(SignupUser);
    await user.save();

    const res = await request(app)
      .post('/user/login/')
      .send({ ...LoginUser, email: 'null@nibo.haha' });

    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty('status', 404);
    expect(res.body).toHaveProperty('error');

    const res2 = await request(app)
      .post('/user/login/')
      .send({ ...LoginUser, password: 'nuller' });

    expect(res2.status).toEqual(401);
    expect(res2.body).toHaveProperty('status', 401);
    expect(res2.body).toHaveProperty('message', 'wrong password');
    expect(res2.body).toHaveProperty('error');
    done();
  });
  it('should return valid token when email & password are valid', async (done) => {
    const user = await User.create(SignupUser);
    await user.save();

    const res = await request(app)
      .post('/user/login/')
      .send(LoginUser);

    const data = verifyToken(res.body.data);

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('status', 200);
    expect(res.body).toHaveProperty('data');
    expect(data).toHaveProperty('name', SignupUser.name);
    expect(data).toHaveProperty('email', SignupUser.email);
    
    done()
  });

});


});
