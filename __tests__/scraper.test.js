const { getScoobyLinks, getScoobyData } = require('../src/lib/services/scoobyScraper');

describe('Scraper functionality', () => {
  it('populates an array with links', () => {
    return getScoobyLinks()
      .then(results => {
        expect(Array.isArray(results)).toBeTruthy();
        expect(results.length > 0).toBeTruthy();
      });
  });

  it('returns an infobox?', () => {
    return getScoobyData('/wiki/Buffybot_(II)')
      .then(results => {
        expect(results).toBeTruthy();
      });
  });
});
