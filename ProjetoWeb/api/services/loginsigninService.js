module.exports = {
	save: function(newClient, callback){
		//var Obj = {value: tasks};
		var Obj = newClient;
		Clients.create(Obj).exec(function(err,result){
			if(err){
				console.log('Erro ao Cadastrar');
			}
			callback(result);
		});
	},
	
	read: function(value,callback){
		Clients.find({email: value.email, password: value.senha}).exec(function(err, client){
			if (err){
				throw err;
			}
			callback(client);
		});
	},

	searchByFN: function(value, callback){
		Clients.find({firstname: {'contains': value.search}}).exec(function(err, client){
			if(err){
				throw err;
			}
			callback(client);
		});
	},

	searchByGroup: function(value, callback){
		Group.find({name: {'contains':value.search}}).exec(function(err, group){
			if(err){
				throw err;
			}
			callback(group);
		});
	},

	searchByLN: function(value, callback){
		Clients.find({lastname: {'contains': value.search}}).exec(function(err, client){
			if(err){
				throw err;
			}
			callback(client);
		});
	},

	searchByNick: function(value, callback){
		Clients.find({nickname: {'contains': value.search}}).exec(function(err, client){
			if(err){
				throw err;
			}
			callback(client);
		});
	},

	updateBio: function(newbio, callback){
		Clients.update({id: newbio.id}, {bio: newbio.newbio}).exec(function(err, result){
			if(err){
				throw err;
			}
			callback(result);
		});
	},

	updateFirstname: function(newfn, callback){
		Clients.update({id: newfn.id}, {firstname: newfn.newfn}).exec(function(err, result){
			if(err){
				throw err;
			}
			callback(result);
		});
	},

	updateLastname: function(newln, callback){
		Clients.update({id: newln.id}, {lastname: newln.newln}).exec(function(err, result){
			if(err){
				throw err;
			}
			callback(result);
		});
	},

	updateBirth: function(newbirth, callback){
		Clients.update({id: newbirth.id}, {birth: newbirth.newbirth}).exec(function(err, result){
			if(err){
				throw err;
			}
			callback(result);
		});
	},

	readUser: function(value,callback){
		Clients.find({id: value}).exec(function(err, client){
			if (err){
				throw err;
			}
			callback(client);
		});
	},

	readGroup: function(value,callback){
		Group.find({relativeid: value}).populate('participants').exec(function(err, client){
			if (err){
				throw err;
			}
			callback(client);
		});
	}
}