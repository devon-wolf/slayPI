DROP TABLE IF EXISTS characters;

CREATE TABLE characters (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name TEXT NOT NULL,
	image TEXT,
	creature_type TEXT,
	special_role TEXT,
	group_affiliation TEXT
);