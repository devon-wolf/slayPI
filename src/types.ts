export type CharRequest = {
	name: string,
	image: string,
	creature_type?: string,
	special_role?: string,
	group_affiliation?: string
}

export type CharRow = CharRequest & {
	id: string
}

export type CharClass = {
	id : string,
	name : string,
	image : string,
	creatureType : string | undefined,
	specialRole : string | undefined,
	groupAffiliation : string | undefined
}

export type CharInfoBox = {
	image : string,
	name : string,
	aliases : string[],
	born : string,
	died : string,
	status : string, // maybe more specific
	classification : string[], // maybe more specific
	affiliation : string[], // maybe more specific
	knownRelatives : string[],
	firstAppearance : string,
	lastAppearance : string,
	actor : string
}

export type ScrapedCharacter = Promise<{
    image: string;
    name: string;
    aliases: string[];
    born: string;
    died: string;
    status: string;
    classification: string[];
    affiliation: string[];
    knownRelatives: string[];
    firstAppearance: string;
    lastAppearance: string;
    actor: string;
}>