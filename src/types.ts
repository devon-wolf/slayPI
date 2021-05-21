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