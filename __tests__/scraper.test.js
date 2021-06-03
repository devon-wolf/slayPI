const { scrapeAllCharactersInCategory, scrapeCharacterLinks, scrapeCharacterData } = require('../src/lib/services/characterScraper');

jest.setTimeout(120000);

describe('Scraper functionality', () => {
  it.skip('returns an array of character paths', () => {
    return scrapeCharacterLinks('Category:Resurrected_individuals')
      .then(results => {
        console.log(results);
        expect(results.length).toEqual(5);
        expect(results.every(result => typeof result === 'string')).toBeTruthy();
      });

  });

  it.skip('returns a character object', () => {
    return scrapeCharacterData('/wiki/Winifred_Burkle')
      .then(results => {
        console.log(results);
        expect(results.name).toBeTruthy();
      });
  });

  it.skip('returns a character object when fed the result of the link scrape', async () => {

    const links = await scrapeCharacterLinks('Category:Resurrected_individuals');
    console.log(links);

    return scrapeCharacterData(links[0])
      .then(results => {
        console.log(results);
        expect(results.name).toBeTruthy();
      });
  });

  it('returns an array of character objects', () => {
    return scrapeAllCharactersInCategory('Category:Resurrected_individuals')
      .then(results => {
        expect(Array.isArray(results)).toBeTruthy();
        expect(results.length).toBeLessThanOrEqual(25);
      });
  });
});
