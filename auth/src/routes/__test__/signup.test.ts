import { response } from 'express';
import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async()=>{
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'zivora@gmail.com',
            password: '12345'
        })
        .expect(201);
});

it('returns a 400 with a invalid email', async()=>{
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'zivoragmail.com',
            password: '12345'
        })
        .expect(400);
});

it('returns a 400 with a invalid password', async()=>{
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'zivoragmail.com',
            password: '12345'
        })
        .expect(400);
});

it('returns a 400 with a missing email and password', async()=>{
    return request(app)
        .post('/api/users/signup')
        .send({
            
        })
        .expect(400);
});

it('dissalow duplicate emails', async()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'zivora@gmail.com',
            password: '12345'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'zivora@gmail.com',
            password: '12345'
        })
        .expect(400); 
});

it('sets a cookie after successfull signup', async()=>{
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'zivora@gmail.com',
            password: '12345'
        })
        .expect(201);
        expect(response.get('Set-Cookie')).toBeDefined();
});
