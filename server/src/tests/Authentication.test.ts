import { expect } from 'chai';
import { stub } from 'sinon';
import supertest from 'supertest';
import { App } from '../app';
import { User } from '../models/User';
import { dbUser } from './Mocks/UserMock';

const app = supertest(new App().app.listen());

describe('test register endpoint', () => {
  stub(User, 'create').resolves();

  it('should work correctly', async () => {
    const result = await app.post('/register').send({
      name: 'hazem',
      email: 'w@t.com',
      password: '123456',
    });
    expect(result.status).equal(200);
    expect(result.body.message).equal('user is registered. please login');
  });

  it('should return validation error', async () => {
    const result = await app.post('/register').send({
      name: 'hazem',
      email: 'wt.com',
      password: '1456',
    });
    expect(result.status).equal(422);
    expect(result.body.errors.length).equal(2);
  });
});

describe('test login endpoint', () => {
  stub(User, 'findOne').resolves(dbUser as User)

  it('should work correctly and return tokens', async() => {
    const result = await app.post('/login').send({
      email: 'h@h.com',
      password: '123456'
    })
    expect(result.status).equal(200)
    expect(result.body).haveOwnProperty('accessToken')
    expect(result.body).haveOwnProperty('refreshToken')
  })

  it('should return wrong credentials error', async() => {
    const result = await app.post('/login').send({
      email: 'h@h.com',
      password: '1234567956'
    })
    expect(result.status).equal(400)
    expect(result.body.message).equal('wrong credentials')
  })
});
