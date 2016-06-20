module.exports = {
	create: function(newgroup, callback){
		var Obj = newgroup;
		Groups.create(Obj).exec(function(err, result){
			if(err){
				throw err;
			}
			Groups.find({relativeid: result.relativeid}).populate('participants').exec(function(e,r){
				r[0].participants.add(Obj.id);
				r[0].save(function(err,res){
					callback(res);
				})	
			})
		});

	},

	addParticipant: function(newgroup, callback){
		var Obj = newgroup;
		console.log(Obj);
		Groups.find({relativeid: Obj.relativeid}).populate('participants').exec(function(e,r){
			r[0].participants.add(Obj.id);
			r[0].save(function(err,res){
				Groups.find({relativeid: Obj.relativeid}).populate('participants').exec(function(err,result){
					callback(result);
				});
			})	
		});

		
	},

	quitGroup: function(drop, callback){
		var Obj = drop;
		Groups.find({relativeid: Obj.relativeid}).populate('participants').exec(function(e,r){
			r[0].participants.remove(Obj.id);
			r[0].save(function(err,res){
				Groups.find({relativeid: Obj.relativeid}).populate('participants').exec(function(err,result){
					callback(result);
				});
			})	
		});

		
	},

	getGroup: function(value, callback){
		console.log("DATABASE");
		console.log(value);
		Groups.find({id: value.id, nome: value.nome}).exec(function(err, groups){
			if(err){
				throw err;
			}
			callback(groups);
		});
	},	

	getGroups: function(value, callback){
		Groups.find().populate('participants').exec(function(err, groups){
			if(err){
				throw err;
			}
			console.log(groups);
			callback(groups);
		});
	}
}