import request from 'supertest';
import { app } from '../../app'; 

it('fails when email tha does not exist is supplied', async ()=>{
    await request(app)
        .post('/api/users/signin')
        .send({
            email:'zivora@gmail.com',
            password: '12345'
        })
        .expect(400);
});

it('fails when an incorret password is supplied', async ()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email:'zivora@gmail.com',
            password: '123456'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email:'zivora@gmail.com',
            password: '1234566'
        })
        .expect(400);
});

it('respond with coockie when correct creditendals are provided', async ()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email:'zivora@gmail.com',
            password: '123456'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email:'zivora@gmail.com',
            password: '123456'
        })
        .expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
});