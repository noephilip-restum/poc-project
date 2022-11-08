import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Review,
  Users,
} from '../models';
import {ReviewRepository} from '../repositories';

export class ReviewUsersController {
  constructor(
    @repository(ReviewRepository)
    public reviewRepository: ReviewRepository,
  ) { }

  @get('/reviews/{id}/users', {
    responses: {
      '200': {
        description: 'Users belonging to Review',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Users)},
          },
        },
      },
    },
  })
  async getUsers(
    @param.path.string('id') id: typeof Review.prototype.id,
  ): Promise<Users> {
    return this.reviewRepository.users(id);
  }
}
