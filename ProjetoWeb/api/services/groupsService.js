module.exports = {
	create: function(newgroup, callback){
		var Obj = newgroup;
		Group.create(Obj).exec(function(err, result){
			if(err){
				throw err;
			}
			Group.find({relativeid: result.relativeid}).populate('participants').exec(function(e,r){
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
		Group.find({relativeid: Obj.relativeid}).populate('participants').exec(function(e,r){
			r[0].participants.add(Obj.id);
			r[0].save(function(err,res){
			})	
		});

		Group.find({relativeid: Obj.relativeid}).populate('participants').exec(function(err,r){
		
		callback(r);
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
		Group.find({participants: value.participants}).exec(function(err, groups){
			if(err){
				throw err;
			}
			console.log(groups);
			callback(groups);
		});
	}
}