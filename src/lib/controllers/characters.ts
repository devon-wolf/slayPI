import { CharClass } from "../../types";

const { Router } = require('express');
const Character = require('../models/Character');

module.exports = Router ()
	.post('/', (req : any, res : any, next: any) => {
		Character
			.create(req.body)
			.then((character : CharClass) => res.send(character))
			.catch(next);
	})