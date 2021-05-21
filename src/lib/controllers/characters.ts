import { NextFunction, Request, Response } from "express";
import { CharClass } from "../../types";

const { Router } = require('express');
const Character = require('../models/Character');

module.exports = Router ()
	.post('/', (req : Request, res : Response, next: NextFunction) => {
		Character
			.create(req.body)
			.then((character : CharClass) => res.send(character))
			.catch(next);
	})

	.get('/', (req : Request , res : Response, next : NextFunction) => {
		Character
			.getAll()
			.then((characters : [CharClass]) => res.send(characters))
			.catch(next);
	})