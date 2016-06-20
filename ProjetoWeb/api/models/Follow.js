module.exports = {

  attributes: {   
	id: {
		type: 'integer',
		primaryKey: true,
		autoIncrement: true
	},
    person: {
    	type: 'integer',
        notNull: true
    },
    follows: {
    	model: 'Clients',
        notNull: true
    }
  }
};