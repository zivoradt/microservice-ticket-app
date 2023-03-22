import request from 'supertest';
import { app } from '../../app';

it('Clears the coockie after signing out', async ()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email:'zivora@gmail.com',
            password: '123456'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(200);
    console.log(response.get('Set-Cookie'));
})