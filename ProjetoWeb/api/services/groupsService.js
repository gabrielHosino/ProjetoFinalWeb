module.exports = {
	create: function(newgroup, callback){
		var Obj = newgroup;
		console.log("DATABASE");
		console.log(Obj);
		Group.create(Obj).exec(function(err, result){
			if(err){
				throw err;
			}
			callback(result);
		});
	},

	getGroup: function(value, callback){
		console.log("DATABASE");
		console.log(value);
		Group.find({id: value.id, nome: value.nome}).exec(function(err, groups){
			if(err){
				throw err;
			}
			callback(groups);
		});
	},	

	getGroups: function(value, callback){
		console.log("DATABASE");
		console.log(value);
		Group.find({id: value.id}).exec(function(err, groups){
			if(err){
				throw err;
			}
			console.log(groups);
			callback(groups);
		});
	}
}