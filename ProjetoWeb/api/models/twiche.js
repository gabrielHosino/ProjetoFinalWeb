module.exports = {

  attributes: {   
	id: {
		type: 'integer',
		primaryKey: true,
		autoIncrement: true
	},
    text: {
    	type: 'string',
    	notNull: true
    },
    timestamp: {
    	type: 'timestamp',
    	notNull: true
    },
    client: {
        model: 'Clients',
        notNull: true
    }	
  }
};