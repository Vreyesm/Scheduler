import {BackendApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import * as path from 'path';

export {BackendApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new BackendApplication(options);
  await app.boot();
  await app.migrateSchema();
  await app.start();
  // app.static('/', path.join(__dirname, '../../Client/dist'));

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
