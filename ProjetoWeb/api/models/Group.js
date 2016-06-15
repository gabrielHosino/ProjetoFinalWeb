module.exports = {
	attributes:{
		id: {
			type: 'integer',
			notNull: true,
			autoIncrement: false
		},
		name: {
			type: 'string',
			notNull: true
		},
		relativeid: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true
		},
		participants: {
			collection: 'Clients',
			via: 'groups'
		}
	}
};