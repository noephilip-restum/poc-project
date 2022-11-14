import {givenHttpServerConfig} from '@loopback/testlab';
import {PocBackendApplication} from '..';
import {Actor, Movie, Review} from '../models';
import {UsersRepository} from '../repositories';

export async function givenRunningApplicationWithCustomConfiguration() {
  const app = new PocBackendApplication({
    rest: givenHttpServerConfig(),
  });

  await app.boot();

  app.bind('datasources.config.mongodb').to({
    name: 'mongodb',
    connector: 'mongodb',
  });

  await app.start();
  return app;
}

export async function givenUserRepositories(app: PocBackendApplication) {
  const userRepo = await app.getRepository(UsersRepository);
  return {userRepo};
}

export function givenActor(actor?: Partial<Actor>) {
  const data = Object.assign(
    {
      firstName: 'Test',
      lastName: 'Actor',
      gender: 'Male',
      age: 42,
      image_link:
        'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/j9d4i2xsLGUhwpuy5y0fkx1qAcz.jpg',
    },
    actor,
  );
  return new Actor(data);
}

export function givenMovie(movie?: Partial<Movie>) {
  const data = Object.assign(
    {
      title: 'Test Movie',
      description: 'This is a description',
      cost: 10000,
      year_of_release: '2022-09-08',
      image_link:
        'https://www.themoviedb.org/t/p/original/hIZFG7MK4leU4axRFKJWqrjhmxZ.jpg',
      actorIds: ['6369d99be75c3324b0bf82c3'],
    },
    movie,
  );
  return new Movie(data);
}

export function givenReview(review?: Partial<Review>) {
  const data = Object.assign(
    {
      rating: 5,
      message: 'This is a review',
      review_status: true,
      movieId: '635e2a561fd72a3b343f1576',
      usersId: '636c6b5a6861ba21acb89047',
    },
    review,
  );
  return new Review(data);
}
