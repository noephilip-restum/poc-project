import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {ActorController} from '../../controllers';
import {Actor} from '../../models';
import {ActorRepository} from '../../repositories';
import {givenActor} from '../helpers';

let controller: ActorController;
let anActor: Actor;
let anActorWithId: Actor;
let aChangedActor: Actor;
let aListOfActors: Actor[];

describe('ActorController', () => {
  let actorRepo: StubbedInstanceWithSinonAccessor<ActorRepository>;

  beforeEach(givenStubbedRepository);

  it('creates a Actor', async () => {
    const create = actorRepo.stubs.create;
    create.resolves(anActorWithId);
    const response = await controller.create(anActor);
    expect(response.message).to.eql('Actor is successfully added');
    sinon.assert.calledWith(create, anActor);
  });

  it('returns a actor details', async () => {
    const findById = actorRepo.stubs.findById;
    findById.resolves(anActorWithId);
    const response = await controller.findById('636b3d85727f914538785f19');
    expect(response).to.eql(anActorWithId);
    sinon.assert.calledWith(findById, anActorWithId.id);
  });

  it('returns multiple actors if they exist', async () => {
    const find = actorRepo.stubs.find;
    find.resolves(aListOfActors);
    const response = await controller.find();
    expect(response).to.eql(aListOfActors);
    sinon.assert.called(find);
  });

  it('successfully updates existing actor', async () => {
    const updateById = actorRepo.stubs.updateById;
    updateById.resolves();
    await controller.updateById('636b3d85727f914538785f19', aChangedActor);
    sinon.assert.calledWith(updateById, anActorWithId.id, aChangedActor);
  });

  it('successfully deletes existing actor', async () => {
    const deleteById = actorRepo.stubs.deleteById;
    deleteById.resolves();
    await controller.deleteById('636b3d85727f914538785f19');
  });

  function givenStubbedRepository() {
    actorRepo = createStubInstance(ActorRepository);

    anActor = givenActor();
    anActorWithId = givenActor({
      id: '636b3d85727f914538785f19',
    });
    aListOfActors = [
      anActorWithId,
      givenActor({
        id: '63662ad094775818b8157008',
        firstName: 'Test',
        lastName: 'Actor',
        gender: 'Male',
        age: 12,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/640px-Dwayne_Johnson_2014_%28cropped%29.jpg',
      }),
    ] as Actor[];
    aChangedActor = givenActor({
      id: anActorWithId.id,
      firstName: 'Test -edited',
    });
    controller = new ActorController(actorRepo);
  }
});
