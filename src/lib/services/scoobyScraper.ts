import * as cheerio from 'cheerio';
import * as request from 'superagent';

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

const getAllCharacterData = async (categoryPath : string) => {
	const allInfoBoxes : cheerio.Cheerio[] = [];
	const categoryLinkArray = await getCategoryLinks(categoryPath);
	if (categoryLinkArray && categoryLinkArray.length) {
		categoryLinkArray.forEach(async href => {
			const infoBox = await getCharacterData(href);
			if (infoBox) allInfoBoxes.push(infoBox);
		});
		return allInfoBoxes;
	}
}

module.exports = { getCategoryLinks, getCharacterData, getAllCharacterData };