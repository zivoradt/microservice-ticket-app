import {MongoMemoryServer} from 'mongodb-memory-server';
import request from 'supertest';
import {beforeAll, beforeEach, afterAll} from '@jest/globals'
import mongoose from 'mongoose';
import { app } from '../app';

declare global {
    var signin: () => Promise<string[]>;
  }



let mongo: any;

// Config before Test to conect to Memory DB
beforeAll(async()=>{
    process.env.JWT_KEY = 'asdf';

    mongo = await MongoMemoryServer.create();
    const mongoURI = await mongo.getUri();

    await mongoose.connect(mongoURI);
});

// Config before each test - removing all collection from Memory DB
beforeEach(async()=>{
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections){
        await collection.deleteMany({});
    }
})

afterAll(async()=>{
    await mongo.stop();
    await mongoose.connection.close();
})

global.signin = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email, password
        })
        .expect(201);

        const cookie = response.get('Set-Cookie');

        return cookie;
}