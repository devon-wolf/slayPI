import * as cheerio from 'cheerio';
import * as request from 'superagent';

const buffyURL = 'https://buffy.fandom.com';

const splitList = (list : string) => {

}

const scrapeCharacterLinks = async (categoryPath : string) => {
	const { text } = await request.get(`${buffyURL}/wiki/${categoryPath}`);

	const $ = cheerio.load(text);

	const characterLinks : string[] = [];
	
	$('.category-page__member-link').each(
		(i, el) => {
			if (i > 24) return;
			const href = $(el).attr('href');
			if (href) characterLinks.push(href);
	});

	return characterLinks;
}

const scrapeCharacterData = async (href : string) => {
	const { text } = await request.get(`${buffyURL}${href}`);

	const $ = (targetProperty : string) =>
		cheerio.load(text)('.portable-infobox').find(targetProperty);

	return {
		image: $('figure[data-source="Image"] > a').attr('href') || 'n/a',
		name: $('div[data-source="Name"] > div').text(),
		aliases: [$('div[data-source="Aliases"] > div').text()],
		born: $('div[data-source="Born"] > div').text() || 'n/a',
		died: $('div[data-source="Died"] > div').text() || 'n/a',
		status: $('div[data-source="Status"] > div').text(),
		classification: [$('div[data-source="Classification"] > div').text()],
		affiliation: [$('div[data-source="Affiliation"] > div').text()] || ['n/a'],
		knownRelatives: [$('div[data-source="Known relatives"] > div').text()] || ['n/a'],
		firstAppearance: $('div[data-source="First"] > div').text(),
		lastAppearance: $('div[data-source="Last"] > div').text(),
		actor: $('div[data-source="Actor"] > div').text() || 'n/a'
	}
}

const scrapeAllCharactersInCategory = async (categoryPath : string) => {
	const characterLinks = await scrapeCharacterLinks(categoryPath);

	const characterArray = await Promise.all(characterLinks.map(async link => {
		const characterData = await scrapeCharacterData(link);
		return characterData;
	}));

	return characterArray;
}

module.exports = {
	scrapeAllCharactersInCategory
};