import * as cheerio from 'cheerio';
import * as request from 'superagent';

const buffyURL = 'https://buffy.fandom.com';

const scoobyHTML = () => {
	return request.get(`${buffyURL}/wiki/Category:Scooby_Gang`)
		.then(response => response.text)
		.catch(console.error);
}

const getScoobyLinks = async () => {
	const categoryPage = await scoobyHTML();
	if (categoryPage) {
		const $ = cheerio.load(categoryPage);
		const scoobyLinkArray : string[] = [];
		$('.category-page__member-link').each((i, el) => {
			const href = $(el).attr('href');
			if (href) scoobyLinkArray.push(href);
		});
		return scoobyLinkArray;
	}
}

const characterHTML = (href : string) => {
	return request.get(`${buffyURL}${href}`)
		.then(response => response.text)
		.catch(console.error);
}

const getScoobyData = async (href : string) => {
	const characterPage = await characterHTML(href);
	if (characterPage) {
		const $ = cheerio.load(characterPage);
		const infoBox = $('.portable-infobox')
		return infoBox;
	}
}

const getAllScoobyData = async () => {
	const allInfoBoxes : cheerio.Cheerio[] = [];
	const scoobyLinkArray = await getScoobyLinks();
	if (scoobyLinkArray && scoobyLinkArray.length) {
		scoobyLinkArray.forEach(async link => {
			const infoBox = await getScoobyData(link);
			if (infoBox) allInfoBoxes.push(infoBox);
		});
		return allInfoBoxes;
	}
}

module.exports = { getScoobyLinks, getScoobyData, getAllScoobyData }