import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PocDbDataSource} from '../datasources';
import {Review, ReviewRelations, Users} from '../models';
import {UsersRepository} from './users.repository';

export class ReviewRepository extends DefaultCrudRepository<
  Review,
  typeof Review.prototype._id,
  ReviewRelations
> {

  public readonly users: BelongsToAccessor<Users, typeof Review.prototype.id>;

  constructor(
    @inject('datasources.pocDb') dataSource: PocDbDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(Review, dataSource);
    this.users = this.createBelongsToAccessorFor('users', usersRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
