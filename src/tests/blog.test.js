import path from 'path';
import request from 'supertest';
import Blog from '../models/Blog';
import User from '../models/User';
import { signToken } from '../helpers/auth';
import uploader from '../config/cloudinary';
import app from '../app';

describe('blog route', () => {


    let signupUser = {};
    let counter = 0;
    const testBlog = {
        title: 'Hello World',
        image: 'https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png',
        body: 'today action',

    };
    let mockToken = `Bearer ${signToken({
        _id: signupUser._id,
        name: 'test',
        role: 'Guest',
        email: 'test@gmail.com',
        image:
            'https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png',
    })}`;


    beforeEach(async () => {
        await Blog.deleteMany({});
        signupUser = await User.create({
            name: 'test',
            email: `test${counter}@gmail.com`,
            password: '$2b$12$xSd2pavqxxiSA09bGrENmeLN3Zkl89uJLXhWTS/lZEvXB3UdZ.hja'
        });
        counter += 1;
        await signupUser.save();

        
    });
    afterAll(async () => {
        await Blog.deleteMany({});
        await User.deleteMany({});

    });

    describe('POST', () => {
        it('should create post when valid token provided', async (done) => {
            const res = await request(app)
                .post('/blog')
                .set('authorization', mockToken)
                .set('content-type', 'multipart/form-data')
                .attach('image', path.join(__dirname, 'assets/test.jpg'))
                .field('title', testBlog.title)
                .field('body', testBlog.body);
            expect(res).toHaveProperty('status', 201);
            expect(res.body).toHaveProperty('status', 201);
            expect(res.body).toHaveProperty('message', 'Blog Created successfully');
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toHaveProperty('title', testBlog.title);
            done()
        });
    });

    describe('PATCH /:blogId', () => {
        it('should update post when valid token provided', async () => {
          const blog = await Blog.create({ ...testBlog});
          await blog.save();
    
          const res = await request(app)
            .patch(`/blog/${blog._id}`)
            .set('authorization', mockToken)
            .send({ title: 'new' });
    
          expect(res).toHaveProperty('status', 200);
          expect(res.body).toHaveProperty('status', 200);
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toHaveProperty('title', 'new');
        });
      });

    describe('GET all', () => {
        it('should read all posts', async (done) => {
            const testblogs = [
                { ...testBlog },
                { ...testBlog, title: 'title of blog' },
                { ...testBlog, title: 'title of blog 2' }
            ];

            await Blog.insertMany(testblogs);

            const res = await request(app).get('/blog');
            expect(res).toHaveProperty('status', 200);
            expect(res.body).toHaveProperty('status', 200);
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toHaveProperty('count', testblogs.length);
            expect(res.body.data).toHaveProperty('blogs');
            expect(res.body.data.blogs[0]).toHaveProperty('title', testBlog.title);

            done()
        });
    });

    describe('GET /:blogId', () => {
        it('should read single post', async (done) => {
            const toRead = await Blog.create({ ...testBlog });
            await toRead.save();
            const res = await request(app).get(`/blog/${toRead._id}`);
            expect(res).toHaveProperty('status', 200);
            expect(res.body).toHaveProperty('status', 200);
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toHaveProperty('title', toRead.title);
            done();
        });
    });
    describe('DELETE /:blogId', () => {
        it('should delete post when valid token provided', async () => {
          const toDelete = await Blog.create({ ...testBlog, author: signupUser._id });
          await toDelete.save();
    
          const res = await request(app)
            .delete(`/blog/${toDelete._id}`)
            .set('authorization', mockToken);
          expect(res).toHaveProperty('status', 200);
          expect(res.body).toHaveProperty('status', 200);
          expect(res.body).toHaveProperty('message', 'Blog deletd successfully');
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toHaveProperty('title', toDelete.title);
        });
      });
});