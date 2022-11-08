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
import {Actor} from '../models';
import {ActorRepository} from '../repositories';

type CustomResponse = {
  data: Actor[] | Actor;
  status: boolean;
  message: string;
};

export class ActorController {
  constructor(
    @repository(ActorRepository)
    public actorRepository: ActorRepository,
  ) {}

  @post('/actors')
  @response(200, {
    description: 'Actor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Actor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actor, {
            title: 'NewActor',
            exclude: ['id'],
          }),
        },
      },
    })
    actor: Omit<Actor, 'id'>,
  ): Promise<CustomResponse> {
    try {
      if (!actor.firstName) throw new Error('First name is required');
      if (!actor.lastName) throw new Error('Last name is required');
      if (!actor.gender) throw new Error('Gender is required');
      if (!actor.age) throw new Error('Age is required');
      if (!actor.image_link) throw new Error('Image Link is required');

      this.actorRepository.create(actor);
      return {data: [], status: true, message: 'Actor is successfully added'};
    } catch (err) {
      return {data: [], status: false, message: err.message};
    }
  }

  @get('/actors/count')
  @response(200, {
    description: 'Actor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Actor) where?: Where<Actor>): Promise<Count> {
    return this.actorRepository.count(where);
  }

  @get('/actors')
  @response(200, {
    description: 'Array of Actor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Actor, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Actor) filter?: Filter<Actor>): Promise<Actor[]> {
    return this.actorRepository.find(filter);
  }

  @patch('/actors')
  @response(200, {
    description: 'Actor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actor, {partial: true}),
        },
      },
    })
    actor: Actor,
    @param.where(Actor) where?: Where<Actor>,
  ): Promise<Count> {
    return this.actorRepository.updateAll(actor, where);
  }

  @get('/actors/{id}')
  @response(200, {
    description: 'Actor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Actor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Actor, {exclude: 'where'})
    filter?: FilterExcludingWhere<Actor>,
  ): Promise<Actor> {
    return this.actorRepository.findById(id, filter);
  }

  @get('/actors/search/{name}')
  @response(200, {
    description: 'Used for actor search',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Actor, {includeRelations: true}),
        },
      },
    },
  })
  async findActors(@param.path.string('name') name: string): Promise<Actor[]> {
    const pattern = new RegExp('^' + name + '.*', 'i');
    const data = await this.actorRepository.find({
      where: {firstName: {regexp: pattern}},
    });
    return data;
  }

  @patch('/actors/{id}')
  @response(204, {
    description: 'Actor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actor, {partial: true}),
        },
      },
    })
    actor: Actor,
  ): Promise<CustomResponse> {
    try {
      if (!actor.firstName) throw new Error('First name is required');
      if (!actor.lastName) throw new Error('Last name is required');
      if (!actor.gender) throw new Error('Gender is required');
      if (!actor.age) throw new Error('Age is required');
      if (!actor.image_link) throw new Error('Image Link is required');

      await this.actorRepository.updateById(id, actor);
      return {
        data: [],
        status: true,
        message: 'Actor is edited',
      };
    } catch (err) {
      return {data: [], status: false, message: err.message};
    }
  }

  @put('/actors/{id}')
  @response(204, {
    description: 'Actor PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() actor: Actor,
  ): Promise<void> {
    await this.actorRepository.replaceById(id, actor);
  }

  @del('/actors/{id}')
  @response(204, {
    description: 'Actor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.actorRepository.deleteById(id);
  }
}
