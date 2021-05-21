import { CharRequest, CharRow } from "../../types";

const pool = require('../utils/pool');

module.exports = class Character {
	id : string;
	name : string;
	image : string;
	creatureType : string | undefined;
	specialRole : string | undefined;
	groupAffiliation : string | undefined;

	constructor(row : CharRow) {
		const {
			id,
			name,
			image,
			creature_type,
			special_role,
			group_affiliation
		} = row;

		this.id = id;
		this.name = name;
		this.image = image;
		this.creatureType = creature_type;
		this.specialRole = special_role;
		this.groupAffiliation = group_affiliation;
	}

	static async create({ name, image, creature_type, special_role, group_affiliation } : CharRequest) {
		const { rows } = await pool.query(
			`INSERT INTO characters
			(name, image, creature_type, special_role, group_affiliation)
			VALUES ($1, $2, $3, $4, $5)
			RETURNING *`,
			[
				name,
				image,
				creature_type,
				special_role,
				group_affiliation
			]
		);

		return new Character(rows[0]);
	}

	static async getAll() {
		const { rows } = await pool.query('SELECT * FROM characters');

		return rows.map((row : CharRow) => new Character(row));
	}

	static async getByID(id : string) {
		const { rows } = await pool.query('SELECT * FROM characters where id=$1', [id]);
		return new Character(rows[0]);
	}
}