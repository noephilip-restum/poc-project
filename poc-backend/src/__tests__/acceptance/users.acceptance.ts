import {Client, expect} from '@loopback/testlab';
import {PocBackendApplication} from '../..';
import {UsersRepository} from '../../repositories';
import {isNotEmpty, isValidName, validateEmail} from '../../utils';
import {
  givenRunningApplicationWithCustomConfiguration,
  givenUserRepositories,
} from '../helpers';

describe('User Controller', () => {
  let app: PocBackendApplication;
  let client: Client;
  let userRepo: UsersRepository;

  before(async () => {
    app = await givenRunningApplicationWithCustomConfiguration();
  });
  after(() => app.stop());

  before(async () => {
    ({userRepo} = await givenUserRepositories(app));
  });

  beforeEach(async () => {
    await userRepo.deleteAll();
  });

  it('validateEmail() fails with invalid email', () => {
    const expectedError = 'Invalid email format.';
    const email = 'domdomdom';
    expect(() => validateEmail(email)).to.throw(expectedError);
  });

  it('isValidName() fails with empty first name', () => {
    const expectedError = 'Field firstName name is required.';
    const fName = '';
    expect(() => isValidName(fName, 'firstName')).to.throw(expectedError);
  });

  it('isValidName() fails with invalid last name', () => {
    const expectedError = 'Invalid name in field lastName';
    const lName = '123';
    expect(() => isValidName(lName, 'lastName')).to.throw(expectedError);
  });

  it('isNotEmpty() fails with empty password', () => {
    const expectedError = 'Field password is required.';
    const password = '';
    expect(() => isNotEmpty(password, 'password')).to.throw(expectedError);
  });
});
