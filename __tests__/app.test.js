const pool = require('../dist/lib/utils/pool');
const setup = require('../dist/data/setup');
const request = require('supertest');
const app = require('../dist/lib/app');

describe('buffy-API routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('adds a character', () => {
    const newChar = {
      name: 'Tara Maclay',
      image: 'fakeTara.jpg',
      creature_type: 'human',
      special_role: 'witch',
      group_affiliation: 'Scooby Gang'
    };

    return request(app)
      .post('/api/v1/characters')
      .send(newChar)
      .then(response => expect(response.body).toEqual({
        id: '1',
        name: 'Tara Maclay',
        image: 'fakeTara.jpg',
        creatureType: 'human',
        specialRole: 'witch',
        groupAffiliation: 'Scooby Gang'
      }));
  });
});
