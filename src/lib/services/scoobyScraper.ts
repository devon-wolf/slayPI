import * as cheerio from 'cheerio';
import * as request from 'superagent';
import { CharInfoBox } from '../../types';

const buffyURL = 'https://buffy.fandom.com';

const categoryHTML = (categoryPath : string) => {
	return request.get(`${buffyURL}/wiki/${categoryPath}`)
		.then(response => response.text)
		.catch(console.error);
}

const getCategoryLinks = async (categoryPath : string) => {
	const categoryPage = await categoryHTML(categoryPath);
	if (categoryPage) {
		const $ = cheerio.load(categoryPage);
		const categoryLinkArray : string[] = [];
		$('.category-page__member-link').each((i, el) => {
			const href = $(el).attr('href');
			if (href) categoryLinkArray.push(href);
		});
		return categoryLinkArray;
	}
}

const characterHTML = (href : string) => {
	return request.get(`${buffyURL}${href}`)
		.then(response => response.text)
		.catch(console.error);
}

const getCharacterData = async (href : string) => {
	const characterPage = await characterHTML(href);
	if (characterPage) {
		const $ = cheerio.load(characterPage);
		const infoBox = $('.portable-infobox')
		
		return infoBox;
	}
}

const parseCharacterData = (infobox : cheerio.Cheerio ) => {
	const infoBoxHTML = infobox.html();
	if (infoBoxHTML) {
		const $ = cheerio.load(infoBoxHTML);
		const characterObj : CharInfoBox = {
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
		return characterObj;
	}
}

const getAllCharacterData = async (categoryPath : string) => {
	const allCharacterData : CharInfoBox[] = [];
	const categoryLinkArray = await getCategoryLinks(categoryPath);
	if (categoryLinkArray && categoryLinkArray.length) {
		categoryLinkArray.forEach(async href => {
			const infoBox = await getCharacterData(href);
			if (infoBox) {
				const characterData = parseCharacterData(infoBox);
				if (characterData) allCharacterData.push(characterData);
			}
		});
		return allCharacterData;
	}
}

module.exports = { getCategoryLinks, getCharacterData, getAllCharacterData };