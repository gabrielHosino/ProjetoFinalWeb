/**
 * Inicial.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {   
	id: {
		type: 'integer',
		primaryKey: true,
		autoIncrement: true
	},
	firstname: {
    	type: 'string',
    	notNull: true
    },
    lastname: {
    	type: 'string',
    	notNull: true
    },
    birth:{
    	type: 'date',
    	notNull: true
    },
    nickname: {
    	type: 'string',
    	notNull: true,
    	unique: true
    },
    password: {
    	type: 'string',
    	notNull: true
    },
    bio: {
    	type: 'string'
    },
    email: {
    	type: 'string',
    	notNull: true
    },
    twiches: {
        collection: 'twiche',
        via: 'user'
    },
    groups: {
        collection: 'Group',
        via: 'participants'
    }
	
  }
};

