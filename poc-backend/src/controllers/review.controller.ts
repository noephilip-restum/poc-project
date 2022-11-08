import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
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
import {Review} from '../models';
import {ReviewRepository} from '../repositories';

type CustomResponse = {
  data: Review[] | Review;
  status: boolean;
  message: string;
};
export class ReviewController {
  constructor(
    @repository(ReviewRepository)
    public reviewRepository: ReviewRepository,
  ) {}

  @post('/reviews')
  @response(200, {
    description: 'Review model instance',
    content: {'application/json': {schema: getModelSchemaRef(Review)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Review, {
            title: 'NewReview',
            exclude: ['id'],
          }),
        },
      },
    })
    review: Omit<Review, 'id'>,
  ): Promise<CustomResponse> {
    try {
      if (!review.message) throw new Error('Message is required');
      if (!review.rating) throw new Error('Rating is required');
      if (!review.movieId) throw new Error('Movie is required');

      await this.reviewRepository.create(review);
      return {
        data: [],
        status: true,
        message: 'Review is added',
      };
    } catch (err) {
      return {data: [], status: false, message: err.message};
    }
  }

  @get('/reviews/count')
  @response(200, {
    description: 'Review model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Review) where?: Where<Review>): Promise<Count> {
    return this.reviewRepository.count(where);
  }

  @get('/reviews')
  @response(200, {
    description: 'Array of Review model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Review, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Review) filter?: Filter<Review>): Promise<Review[]> {
    return this.reviewRepository.find({include: ['users']});
  }

  @patch('/reviews')
  @response(200, {
    description: 'Review PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Review, {partial: true}),
        },
      },
    })
    review: Review,
    @param.where(Review) where?: Where<Review>,
  ): Promise<Count> {
    return this.reviewRepository.updateAll(review, where);
  }

  @get('/reviews/{id}')
  @response(200, {
    description: 'Review model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Review, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Review, {exclude: 'where'})
    filter?: FilterExcludingWhere<Review>,
  ): Promise<Review> {
    return this.reviewRepository.findById(id, filter);
  }

  @patch('/reviews/{id}')
  @response(204, {
    description: 'Review PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Review, {partial: true}),
        },
      },
    })
    review: Review,
  ): Promise<CustomResponse> {
    try {
      if (!review.message) throw new Error('Message is required');
      if (!review.rating) throw new Error('Rating is required');
      if (!review.movieId) throw new Error('Movie is required');

      await this.reviewRepository.updateById(id, review);
      return {
        data: [],
        status: true,
        message: 'Review is edited',
      };
    } catch (err) {
      return {data: [], status: false, message: err.message};
    }
  }

  @put('/reviews/{id}')
  @response(204, {
    description: 'Review PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() review: Review,
  ): Promise<void> {
    await this.reviewRepository.replaceById(id, review);
  }

  @del('/reviews/{id}')
  @response(204, {
    description: 'Review DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.reviewRepository.deleteById(id);
  }
}
