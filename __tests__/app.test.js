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
      image: 'https://static.wikia.nocookie.net/buffy/images/a/a3/Tara_Maclay9.jpg/revision/latest/scale-to-width-down/1000?cb=20190106065228',
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
        image: 'https://static.wikia.nocookie.net/buffy/images/a/a3/Tara_Maclay9.jpg/revision/latest/scale-to-width-down/1000?cb=20190106065228',
        creatureType: 'human',
        specialRole: 'witch',
        groupAffiliation: 'Scooby Gang'
      }));
  });
});
