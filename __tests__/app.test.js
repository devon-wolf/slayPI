const pool = require('../dist/lib/utils/pool');
const setup = require('../dist/data/setup');
const request = require('supertest');
const app = require('../dist/lib/app');

const anya = {
  name: 'Anya Jenkins',
  image: 'https://static.wikia.nocookie.net/buffy/images/8/84/B6_Anya_02.jpg/revision/latest?cb=20170717214459',
  creature_type: 'human',
  special_role: 'vengeance demon (former)',
  group_affiliation: 'Scooby Gang'
};

const xander = {
  name: 'Alexander Harris',
  image: 'https://static.wikia.nocookie.net/buffy/images/6/6a/S6_058_Xander.jpg/revision/latest?cb=20190430164507',
  creature_type: 'human',
  special_role: 'butt monkey',
  group_affiliation: 'Scooby Gang'
};

describe('buffy-API routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(async () => {
    await request(app)
      .post('/api/v1/characters')
      .send(anya);

    await request(app)
      .post('/api/v1/characters')
      .send(xander);
  });

  it('adds a character', () => {
    const newChar = {
      name: 'Tara Maclay',
      image: 'https://static.wikia.nocookie.net/buffy/images/a/a3/Tara_Maclay9.jpg/revision/latest/scale-to-width-down/1000?cb=20190106065228',
      creature_type: 'human',
      special_role: 'witch',
      group_affiliation: 'Scooby Gang'
    };

    return request(app)
      .post('/api/v1/characters')
      .send(newChar)
      .then(response => expect(response.body).toEqual({
        id: '3',
        name: 'Tara Maclay',
        image: 'https://static.wikia.nocookie.net/buffy/images/a/a3/Tara_Maclay9.jpg/revision/latest/scale-to-width-down/1000?cb=20190106065228',
        creatureType: 'human',
        specialRole: 'witch',
        groupAffiliation: 'Scooby Gang'
      }));
  });

  it('gets all characters', () => {
    return request(app)
      .get('/api/v1/characters')
      .then(response => expect(response.body).toEqual([{
        id: '1',
        name: 'Anya Jenkins',
        image: 'https://static.wikia.nocookie.net/buffy/images/8/84/B6_Anya_02.jpg/revision/latest?cb=20170717214459',
        creatureType: 'human',
        specialRole: 'vengeance demon (former)',
        groupAffiliation: 'Scooby Gang'
      },
      {
        id: '2',
        name: 'Alexander Harris',
        image: 'https://static.wikia.nocookie.net/buffy/images/6/6a/S6_058_Xander.jpg/revision/latest?cb=20190430164507',
        creatureType: 'human',
        specialRole: 'butt monkey',
        groupAffiliation: 'Scooby Gang'
      }
      ]));
  });

  it('gets a character by id', () => {
    return request(app)
      .get('/api/v1/characters/1')
      .then(response => expect(response.body).toEqual({
        id: '1',
        name: 'Anya Jenkins',
        image: 'https://static.wikia.nocookie.net/buffy/images/8/84/B6_Anya_02.jpg/revision/latest?cb=20170717214459',
        creatureType: 'human',
        specialRole: 'vengeance demon (former)',
        groupAffiliation: 'Scooby Gang'
      }));
  });

  it('edits a character', () => {
    return request(app)
      .put('/api/v1/characters/2')
      .send({
        name: 'Alexander Harris',
        image: 'https://static.wikia.nocookie.net/buffy/images/6/6a/S6_058_Xander.jpg/revision/latest?cb=20190430164507',
        creature_type: 'human',
        special_role: 'Watcher',
        group_affiliation: 'Scooby Gang'
      })
      .then(response => expect(response.body).toEqual({
        id: '2',
        name: 'Alexander Harris',
        image: 'https://static.wikia.nocookie.net/buffy/images/6/6a/S6_058_Xander.jpg/revision/latest?cb=20190430164507',
        creatureType: 'human',
        specialRole: 'Watcher',
        groupAffiliation: 'Scooby Gang'
      }));
  });
});
