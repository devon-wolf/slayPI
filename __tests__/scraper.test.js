// const { getCategoryLinks, getCharacterData, getAllCharacterData } = require('../src/lib/services/scoobyScraper');
const { scrapeAllCharactersInCategory } = require('../src/lib/services/characterScraper');

describe('Scraper functionality', () => {
  it('returns an array of character objects', () => {
    return scrapeAllCharactersInCategory('Category:Resurrected_individuals')
      .then(result => {
        console.log('LENGTH', result.length);
        console.log('FIRST ITEM', result[0]);
        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length > 0).toBeTruthy();
      });
  });
});
