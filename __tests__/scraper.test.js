const { getScoobyLinks } = require('../src/lib/services/scoobyScraper');

describe('Scraper functionality', () => {
  it('populates an array with links', () => {
    return getScoobyLinks()
      .then(results => expect(Array.isArray(results)).toBeTruthy());
  });
});
