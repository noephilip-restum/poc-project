import {
  Client,
  createRestAppClient,
  givenHttpServerConfig,
} from '@loopback/testlab';
import {PocBackendApplication} from '../..';

export async function setupApplication(): Promise<AppWithClient> {
  const app = new PocBackendApplication({
    rest: givenHttpServerConfig(),
  });

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: PocBackendApplication;
  client: Client;
}
