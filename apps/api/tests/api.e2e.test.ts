import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module.js';

async function createApp(): Promise<INestApplication> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();
  await app.init();
  return app;
}

test('GET /health returns ok with env and mode', async () => {
  const app = await createApp();
  const server = app.getHttpServer();
  const res = await request(server).get('/health').expect(200);
  assert.equal(res.body.status, 'ok');
  assert.ok(typeof res.body.uptime === 'number');
  assert.ok(res.body.env);
  assert.ok(res.body.mode);
  await app.close();
});

test('POST /auth/login issues token for manager', async () => {
  const app = await createApp();
  const server = app.getHttpServer();
  const res = await request(server)
    .post('/auth/login')
    .send({ username: 'manager', password: 'any' })
    .expect(201);
  assert.ok(res.body.access_token);
  await app.close();
});

test('role-based access: inspector denied, manager allowed', async () => {
  const app = await createApp();
  const server = app.getHttpServer();

  const loginInspector = await request(server)
    .post('/auth/login')
    .send({ username: 'inspector', password: 'any' })
    .expect(201);
  const inspectorToken = loginInspector.body.access_token as string;

  const loginManager = await request(server)
    .post('/auth/login')
    .send({ username: 'manager', password: 'any' })
    .expect(201);
  const managerToken = loginManager.body.access_token as string;

  // inspector should be denied
  await request(server)
    .get('/health/secure')
    .set('Authorization', `Bearer ${inspectorToken}`)
    .expect(403);

  // manager should be allowed
  const ok = await request(server)
    .get('/health/secure')
    .set('Authorization', `Bearer ${managerToken}`)
    .expect(200);

  assert.equal(ok.body.status, 'ok-secure');

  await app.close();
});