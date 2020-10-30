import request from 'supertest';
import app from '../app';
import User from '../models/User';
import { signToken } from '../helpers/auth';
import Blog from '../models/Blog';

describe('/comment', () => {
    let mockUser = {};
    let counter = 0;
    let mockToken = '';
    const mockBlog = {
      title: 'Hello world',
      image:
        'https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png',
      body: 'lorem ipsum dolor ikiss sanalmman !',
      author: mockUser._id,
    };
    const mockComment = { body: 'Test here' };
    beforeEach(async () => {
      await Blog.deleteMany({});
      mockUser = await User.create({
        name: 'test',
        email: `test${counter}@gmail.com`,
        password: '$2b$12$xSd2pavqxxiSA09bGrENmeLN3Zkl89uJLXhWTS/lZEvXB3UdZ.hja',
      });
      counter += 1;
      await mockUser.save();
      mockToken = `Bearer ${signToken({
        _id: mockUser._id,
        name: 'test',
        role: 'Guest',
        email: 'test@gmail.com',
        image:
          'https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png',
      })}`;
    });
    afterAll(async () => {
      await Blog.deleteMany({});
      await User.deleteMany({});
    });
    describe('POST /:blogId', () => {
     
      it('should create comment on post when valid token provided', async () => {
        const blog = await Blog.create({ ...mockBlog, author: mockUser._id });
        await blog.save();
  
        const res = await request(app)
          .post(`/comment/${blog._id}`)
          .set('authorization', mockToken)
          .send(mockComment);
  
        expect(res).toHaveProperty('status', 201);
        expect(res.body).toHaveProperty('status', 201);
        expect(res.body).toHaveProperty(
          'message',
          'Successfully commented on post'
        );
        expect(res.body.data).toHaveProperty('body', mockComment.body);
      });
    });
  });
  