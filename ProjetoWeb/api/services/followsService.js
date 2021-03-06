module.exports = {
	follow: function(follower, callback){
		var Obj = follower;
		Follow.create(Obj).exec(function(err, result){
			if(err){
				throw err;
			}
			console.log('segui');
			callback(result);
		});

	},

	unfollow: function(follower, callback){
		var Obj = follower;
		Follow.find({person: Obj.person , follows: Obj.follows}).exec(function(err, result){
			if(err){
				throw err;
			}
			console.log(result);
			Follow.destroy({id : result[0].id}).exec(function(err, result){
				if(err){
					throw err;
				}
				callback(result);
			});
		});		

	},

	getFollows: function(value, callback){
		Follow.find({person: value}).populate('follows').exec(function(err, f){
			if(err){
				throw err;
			}
			callback(f);
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