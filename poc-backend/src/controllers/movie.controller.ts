import {Count, CountSchema, repository, Where} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Movie} from '../models';
import {MovieRepository} from '../repositories';

type CustomResponse = {
  data: Movie[] | Movie;
  status: boolean;
  message: string;
};
export class MovieController {
  constructor(
    @repository(MovieRepository)
    public movieRepository: MovieRepository,
  ) {}

  @post('/movies')
  @response(200, {
    description: 'Movie model instance',
    content: {'application/json': {schema: getModelSchemaRef(Movie)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movie, {
            title: 'NewMovie',
            exclude: ['id'],
          }),
        },
      },
    })
    movie: Omit<Movie, 'id'>,
  ): Promise<CustomResponse> {
    try {
      if (!movie.title) throw new Error('Title is required');
      if (!movie.year_of_release) throw new Error('Date is required');
      if (!movie.cost) throw new Error('Cost is required');
      if (!movie.description) throw new Error('Description is required');
      if (movie.actorIds.length === 0) throw new Error('Actor/s is required');
      if (!movie.image_link) throw new Error('Image link is required');

      await this.movieRepository.create(movie);
      return {data: [], status: true, message: 'Movie is added'};
    } catch (error) {
      return {data: [], status: false, message: error.message};
    }
  }

  @get('/movies/count')
  @response(200, {
    description: 'Movie model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Movie) where?: Where<Movie>): Promise<Count> {
    return this.movieRepository.count(where);
  }

  @get('/movies')
  @response(200, {
    description: 'Array of Movie model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Movie, {includeRelations: true}),
        },
      },
    },
  })
  async find(): Promise<Movie[]> {
    return this.movieRepository.find({include: ['actors', 'reviews']});
  }

  @patch('/movies')
  @response(200, {
    description: 'Movie PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movie, {partial: true}),
        },
      },
    })
    movie: Movie,
    @param.where(Movie) where?: Where<Movie>,
  ): Promise<Count> {
    return this.movieRepository.updateAll(movie, where);
  }

  @get('/movies/{id}')
  @response(200, {
    description: 'Movie model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Movie, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Movie> {
    return this.movieRepository.findById(id, {include: ['actors', 'reviews']});
  }

  @get('/movies/search/{name}')
  @response(200, {
    description: 'Used for movie search',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Movie, {includeRelations: true}),
        },
      },
    },
  })
  async findMovies(@param.path.string('name') name?: string): Promise<Movie[]> {
    const pattern = new RegExp('^' + name + '.*', 'i');
    const data = await this.movieRepository.find({
      where: {title: {regexp: pattern}},
      include: ['actors', 'reviews'],
    });
    return data;
  }

  @patch('/movies/{id}')
  @response(204, {
    description: 'Movie PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movie, {partial: true}),
        },
      },
    })
    movie: Movie,
  ): Promise<CustomResponse> {
    try {
      if (!movie.title) throw new Error('Title is required');
      if (!movie.year_of_release) throw new Error('Date is required');
      if (!movie.cost) throw new Error('Cost is required');
      if (!movie.description) throw new Error('Description is required');
      if (movie.actorIds.length === 0) throw new Error('Actor/s is required');
      if (!movie.image_link) throw new Error('Image link is required');

      await this.movieRepository.updateById(id, movie);
      return {data: [], status: true, message: 'Movie is edited'};
    } catch (error) {
      return {data: [], status: false, message: error.message};
    }
  }

  @put('/movies/{id}')
  @response(204, {
    description: 'Movie PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() movie: Movie,
  ): Promise<void> {
    await this.movieRepository.replaceById(id, movie);
  }

  @del('/movies/{id}')
  @response(204, {
    description: 'Movie DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.movieRepository.deleteById(id);
  }
}
