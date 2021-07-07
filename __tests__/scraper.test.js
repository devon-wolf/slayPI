const { scrapeAllCharactersInCategory } = require('../src/lib/services/characterScraper');

jest.setTimeout(120000);

describe.skip('Scraper functionality', () => {
  it('returns an array of character objects', () => {
    return scrapeAllCharactersInCategory('Category:Resurrected_individuals')
      .then(results => {
        expect(Array.isArray(results)).toBeTruthy();
        expect(results.length).toBeLessThanOrEqual(25);
      });
  });
});
