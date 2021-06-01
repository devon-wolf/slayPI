import { response } from "express";

const cheerio = require('cheerio');
const request = require('superagent');

const buffyURL : string = 'https://buffy.fandom.com';

const scoobyHTML = () => {
	return request.get(`${buffyURL}/wiki/Category:Scooby_Gang`)
		.then((response : Response) => response.text)
		.catch(console.error);
}

const getScoobyLinks = async () => {
	const categoryPage = await scoobyHTML();
	const $ = cheerio.load(categoryPage);

	const scoobyLinkArray : [string?] = [];

	$('.category-page__member-link').each((i : number, el : HTMLAnchorElement) => scoobyLinkArray.push($(el).attr('href')));

	return scoobyLinkArray;
}

const characterHTML = (href : string) => {
	return request.get(`${buffyURL}${href}`)
		.then((response : Response) => response.text)
		.catch(console.error);
}

const getScoobyData = async (href : string) => {
	const characterPage = await characterHTML(href);
	const $ = cheerio.load(characterPage);
	
	// const character = {};

	const infoBox = $('.portable-infobox')
	return infoBox;
	
}

module.exports = { getScoobyLinks, getScoobyData }