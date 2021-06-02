const { getCategoryLinks, getCharacterData } = require('../src/lib/services/scoobyScraper');

describe('Scraper functionality', () => {
  it('populates an array with links', () => {
    return getCategoryLinks('Category:Scooby_Gang')
      .then(results => {
        expect(Array.isArray(results)).toBeTruthy();
        expect(results.length > 0).toBeTruthy();
      });
  });

  it('returns an infobox?', () => {
    return getCharacterData('/wiki/Buffybot_(II)')
      .then(results => {
        expect(results).toBeTruthy();
      });
  });
});
