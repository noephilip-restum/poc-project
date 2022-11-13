import {givenHttpServerConfig} from '@loopback/testlab';
import {PocBackendApplication} from '..';
import {Actor, Movie, Review, Users} from '../models';
import {UsersRepository} from '../repositories';

type CustomResponse<T> = {
  status: 'success' | 'fail';
  data?: T | T[] | null;
  message?: string;
};

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

export function rootAdminBody(user?: Partial<Users>) {
  const passValue = 'iAmAdmin';
  const data = Object.assign(
    {
      firstName: 'admin',
      lastName: 'root',
      email: 'admin@root.com',
      password: passValue,
    },
    user,
  );
  return new Users(data);
}

export function rootAdminUserResponse(user?: Partial<Users>) {
  const data = Object.assign(
    {
      status: 'success',
      data: {
        firstName: 'admin',
        lastName: 'root',
        email: 'admin@root.com',
        role: 'admin',
        isActivated: true,
      },
      message: 'Root admin created successfully.',
    },
    user,
  );
  return new Users(data);
}
export function givenMovie(movie?: Partial<Movie>) {
  const data = Object.assign(
    {
      title: 'Barbarian',
      description:
        'In town for a job interview, a young woman arrives at her Airbnb late at night only to find that it has been mistakenly double-booked and a strange man is already staying there. Against her better judgement, she decides to stay the night anyway, but soon discovers that there is much more to be afraid of in the house than the other house guest.',
      cost: 10000,
      year_of_release: '2022-09-08',
      image_link:
        'https://img.xmovies8.fun/xxrz/250x400/100/0a/b0/0ab08224c226dd6b284144f1b91dac79/0ab08224c226dd6b284144f1b91dac79.jpg',
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

export function newUserBody(user?: Partial<Users>) {
  const passValue = 'secretKey';
  const data = Object.assign(
    {
      firstName: 'new',
      lastName: 'test',
      email: 'new@gmail.com',
      password: passValue,
    },
    user,
  );
  return new Users(data);
}

export function newUserResponse(user?: Partial<Users>) {
  const data = Object.assign(
    {
      status: 'success',
      data: {
        id: '636c71ab2945650ee89caf86',
        firstName: 'new',
        lastName: 'test',
        email: 'new@gmail.com',
        role: 'user',
        isActivated: false,
        dateCreated: '2022-11-10T03:34:33.932Z',
      },
      message: 'User registered successfully.',
    },
    user,
  );
  return new Users(data);
}

export function newActorBody(actor?: Partial<Actor>) {
  const data = Object.assign(actor as Partial<Actor>);
  return new Actor(data);
}

export function newActorResponse(actor?: Partial<Actor>) {
  const data = Object.assign(actor as Partial<Actor>);
  const expectedResponse = {
    status: 'success',
    data: new Actor(data),
    message: 'Successfully added a new actor.',
  };
  return expectedResponse;
}

export function failedRes(message: string): CustomResponse<{}> {
  return {
    status: 'fail',
    data: null,
    message: message || 'Error',
  };
}

export const mockActor = {
  firstName: 'Joel',
  lastName: 'Edgerton',
  gender: 'male',
  age: 48,
  image: 'https://flxt.tmsimg.com/assets/171833_v9_bd.jpg',
  link: 'https://www.imdb.com/name/nm0249291/',
};

export const fetchUsers: CustomResponse<{}> = {
  status: 'success',
  data: [
    {
      dateCreated: '2022-11-05T02:27:26.229Z',
      email: 'admin@root.com',
      firstName: 'admin',
      id: '6365cbc3e303fc6228363b9d',
      isActivated: true,
      lastName: 'root',
      role: 'admin',
    },
    {
      dateCreated: '2022-11-05T23:57:58.575Z',
      email: 'john@doe.com',
      firstName: 'John',
      id: '6367094d5c935e220c912f54',
      isActivated: true,
      lastName: 'Doe',
      role: 'user',
    },
  ],
  message: 'All users data fetched successfully.',
};

export const fetchActors: CustomResponse<{}> = {
  status: 'success',
  data: [
    {
      age: 35,
      firstName: 'Keanu',
      gender: 'male',
      id: '6365cd4ee303fc6228363b9f',
      image:
        'https://images.mubicdn.net/images/cast_member/2899/cache-2935-1581314680/image-w856.jpg?size=240x',
      lastName: 'Reeves',
      link: 'https://mubi.com/cast/keanu-reeves',
      moviesCasted: 0,
    },
    {
      age: 51,
      firstName: 'Bridget',
      gender: 'female',
      id: '6365ce7ee303fc6228363ba0',
      image:
        'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQBW-QGOzpSgW5wPbL7mya6t_2Kj2wKJTgHsixsj_OQsif1Cf_myVaffqLEXuND2_UaJsRO_4GuAPzwlkQ',
      lastName: 'Moynahan',
      link: '',
      moviesCasted: 0,
    },
  ],
  message: 'Successfully fetched all actors in the database.',
};

export const fetchActorById: CustomResponse<{}> = {
  status: 'success',
  data: {
    age: 35,
    firstName: 'Keanu',
    gender: 'male',
    id: '6365cd4ee303fc6228363b9f',
    image:
      'https://images.mubicdn.net/images/cast_member/2899/cache-2935-1581314680/image-w856.jpg?size=240x',
    lastName: 'Reeves',
    link: 'https://mubi.com/cast/keanu-reeves',
    moviesCasted: [
      {
        cost: 4500000,
        description:
          "With the untimely death of his beloved wife still bitter in his mouth, John Wick, the expert former assassin, receives one final gift from her--a precious keepsake to help John find a new meaning in life now that she is gone. But when the arrogant Russian mob prince, Iosef Tarasov, and his men pay Wick a rather unwelcome visit to rob him of his prized 1969 Mustang and his wife's present, the legendary hitman will be forced to unearth his meticulously concealed identity. Blind with revenge, John will immediately unleash a carefully orchestrated maelstrom of destruction against the sophisticated kingpin, Viggo Tarasov, and his family, who are fully aware of his lethal capacity. Now, only blood can quench the boogeyman's thirst for retribution.",
        id: '6365ced2e303fc6228363ba3',
        image:
          'https://img.yts.mx/assets/images/movies/john_wick_2014/medium-cover.jpg',
        title: 'John Wick',
        yearReleased: 2014,
      },
      {
        cost: 40000000,
        description:
          "Bound by an inescapable blood debt to the Italian crime lord, Santino D'Antonio, and with his precious 1969 Mustang still stolen, John Wick--the taciturn and pitiless assassin who thirsts for seclusion--is forced to visit Italy to honour his promise. But, soon, the Bogeyman will find himself dragged into an impossible task in the heart of Rome's secret criminal society, as every killer in the business dreams of cornering the legendary Wick who now has an enormous price on his head. Drenched in blood and mercilessly hunted down, John Wick can surely forget a peaceful retirement as no one can make it out in one piece.",
        id: '636708775c935e220c912f49',
        image:
          'https://img.yts.mx/assets/images/movies/john_wick_chapter_2_2017/medium-cover.jpg',
        title: 'John Wick: Chapter 2',
        yearReleased: 2017,
      },
    ],
  },
  message: 'Successfully fetched actor data.',
};

export const searchActorByName: CustomResponse<{}> = {
  status: 'success',
  data: [
    {
      age: 35,
      firstName: 'Keanu',
      gender: 'male',
      id: '6365cd4ee303fc6228363b9f',
      image:
        'https://images.mubicdn.net/images/cast_member/2899/cache-2935-1581314680/image-w856.jpg?size=240x',
      lastName: 'Reeves',
      link: 'https://mubi.com/cast/keanu-reeves',
      moviesCasted: 0,
    },
  ],
  message: 'Successfully fetched actor data.',
};

export const fetchMovies: CustomResponse<{}> = {
  status: 'success',
  data: [
    {
      id: '6365ced2e303fc6228363ba3',
      title: 'John Wick',
      description:
        "With the untimely death of his beloved wife still bitter in his mouth, John Wick, the expert former assassin, receives one final gift from her--a precious keepsake to help John find a new meaning in life now that she is gone. But when the arrogant Russian mob prince, Iosef Tarasov, and his men pay Wick a rather unwelcome visit to rob him of his prized 1969 Mustang and his wife's present, the legendary hitman will be forced to unearth his meticulously concealed identity. Blind with revenge, John will immediately unleash a carefully orchestrated maelstrom of destruction against the sophisticated kingpin, Viggo Tarasov, and his family, who are fully aware of his lethal capacity. Now, only blood can quench the boogeyman's thirst for retribution.",
      image:
        'https://img.yts.mx/assets/images/movies/john_wick_2014/medium-cover.jpg',
      cost: 4500000,
      yearReleased: 2014,
      movieReviews: [
        {
          datePosted: '2022-11-05T23:57:58.575Z',
          description:
            'Best Non Stop Action. And I mean Action and Not corny dramas. Other film I recommend you to watch is The Raid.',
          id: '63670b495c935e220c912f62',
          isApproved: true,
          movieId: '6365ced2e303fc6228363ba3',
          rating: 5,
          userId: '6365d163e303fc6228363baa',
        },
      ],
    },
    {
      id: '636708775c935e220c912f49',
      title: 'John Wick: Chapter 2',
      description:
        "Bound by an inescapable blood debt to the Italian crime lord, Santino D'Antonio, and with his precious 1969 Mustang still stolen, John Wick--the taciturn and pitiless assassin who thirsts for seclusion--is forced to visit Italy to honour his promise. But, soon, the Bogeyman will find himself dragged into an impossible task in the heart of Rome's secret criminal society, as every killer in the business dreams of cornering the legendary Wick who now has an enormous price on his head. Drenched in blood and mercilessly hunted down, John Wick can surely forget a peaceful retirement as no one can make it out in one piece.",
      image:
        'https://img.yts.mx/assets/images/movies/john_wick_chapter_2_2017/medium-cover.jpg',
      cost: 40000000,
      yearReleased: 2017,
    },
    {
      id: '636707055c935e220c912f43',
      title: 'Enola Holmes 2',
      description:
        'Now a detective-for-hire, Enola Holmes takes on her first official case to find a missing girl as the sparks of a dangerous conspiracy ignite a mystery that requires the help of friends - and Sherlock himself - to unravel',
      image:
        'https://img.yts.mx/assets/images/movies/enola_holmes_2_2022/medium-cover.jpg',
      cost: 25000000,
      yearReleased: 2022,
    },
  ],
  message: 'Successfully fetched all movies.',
};

export const fetchMovieReviews: CustomResponse<{}> = {
  status: 'success',
  data: [
    {
      id: '63670b495c935e220c912f62',
      description: 'Actor is a beast',
      rating: 5,
      datePosted: '2022-11-05T23:57:58.575Z',
      isApproved: true,
      movieId: '6365ced2e303fc6228363ba3',
      userId: '6365d163e303fc6228363baa',
      userReviewer: {
        id: '6365d163e303fc6228363baa',
        firstName: 'Jane',
        lastName: 'Doe',
      },
    },
    {
      id: '63670c8b5c935e220c912f66',
      description: 'Best',
      rating: 5,
      datePosted: '2022-11-05T23:57:58.575Z',
      isApproved: true,
      movieId: '6365ced2e303fc6228363ba3',
      userId: '6367094d5c935e220c912f54',
      userReviewer: {
        id: '6367094d5c935e220c912f54',
        firstName: 'John',
        lastName: 'Doe',
      },
    },
  ],
  message: 'Reviews fetched successfully.',
};
