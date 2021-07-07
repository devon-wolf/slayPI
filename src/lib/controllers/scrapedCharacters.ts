import { NextFunction, Request, Response } from 'express';
import { ScrapedCharacter } from '../../types';

const { scrapeAllCharactersInCategory } = require('../services/characterScraper');
const { Router } = require('express');

module.exports = Router ()
	.get('/:category', (req : Request, res : Response, next : NextFunction) => {
		scrapeAllCharactersInCategory(req.params.category)
			.then((results : ScrapedCharacter) => res.send(results))
			.catch((error : Error) => res.send(error));
	});