import {TokenService} from '@loopback/authentication';
import {
  Credentials,
  TokenServiceBindings,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
  SchemaObject,
} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';
import {Users} from '../models';
import {UsersRepository} from '../repositories';
import {MyUserService} from '../services';

type CustomResponse = {
  data: Users[] | Users;
  status: boolean;
  message: string;
};

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

export class UsersController {
  constructor(
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
  ) {}

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string; userProfile: any}> {
    const user = await this.userService.verifyCredentials(credentials);
    const userProfile = this.userService.convertToUserProfile(user);
    const token = await this.jwtService.generateToken(userProfile);
    return {token, userProfile};
  }

  @post('/users/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': Users,
            },
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'NewUsers',
          }),
        },
      },
    })
    users: Omit<Users, '_id'>,
  ): Promise<CustomResponse> {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const findUser = await this.usersRepository.find({
      where: {email: users.email},
    });
    try {
      if (!users.firstName) throw new Error('First name is required');
      if (!users.lastName) throw new Error('Last name is required');
      if (!users.email) throw new Error('Email is required');
      if (!emailPattern.test(users.email)) throw new Error('Email is invalid');
      if (findUser.length > 0) throw new Error('Email is already registered');
      if (!users.account_status) throw new Error('Status is required');
      if (!users.account_role) throw new Error('Role is required');
      if (!users.password) throw new Error('Password is required');

      const password = await hash(users.password, await genSalt());
      const savedUser = await this.usersRepository.create(
        _.omit(users, 'password'),
      );

      await this.usersRepository
        .userCredential(savedUser._id)
        .create({password});

      return {
        data: savedUser,
        status: true,
        message: 'Successfully Registered',
      };
    } catch (err) {
      return {data: [], status: false, message: err.message};
    }
  }

  @get('/users')
  @response(200, {
    description: 'Array of Users model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Users, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Users) filter?: Filter<Users>): Promise<Users[]> {
    return this.usersRepository.find(filter);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'Users model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Users, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Users, {exclude: 'where'})
    filter?: FilterExcludingWhere<Users>,
  ): Promise<Users> {
    return this.usersRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'Users PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Users,
  ): Promise<CustomResponse> {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    try {
      if (!users.firstName) throw new Error('First name is required');
      if (!users.lastName) throw new Error('Last name is required');
      if (!users.email) throw new Error('Email is required');
      if (!emailPattern.test(users.email)) throw new Error('Email is invalid');

      await this.usersRepository.updateById(id, users);

      return {
        data: [],
        status: true,
        message: 'User is edited',
      };
    } catch (err) {
      return {data: [], status: false, message: err.message};
    }
  }

  @del('/users/{id}')
  @response(204, {
    description: 'Users DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usersRepository.deleteById(id);
  }
}
