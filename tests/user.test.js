const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Asegúrate de exportar `app` desde server.js

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('User API', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'User registered successfully');
    });

    it('should not register a user with existing email', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser2',
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    });
});
