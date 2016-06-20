module.exports = {
	save: function(newpost, callback){
		var Obj = newpost;
		twiche.create(Obj).exec(function(err,result){
			if(err){
				throw err;
			}
			callback(result);
		});
	},

	delpost: function(delpost, callback){
		var Obj = delpost;
		twiche.destroy({id : Obj.id}).exec(function (err,result){
		  if (err) {
    		throw err;
  		}
  			callback(result);
		});
	},

	getyourposts: function(value,callback){
		twiche.find({client: value}).populate('client').exec(function(err, posts){
			if (err){
				throw err;
			}
			callback(posts);
		});
	},

	getAllPosts: function(value,callback){
		var users = [];
		Follow.find({person: value}).populate('follows').exec(function(err, people){
			if (err){
				throw err;
			}
			console.log(people);
			for(i = 0; i < people.length; i++){
				users.push(people[i].follows.id);
			}
			console.log(users);
			twiche.find({client: users}).populate('client').sort('createdAt DESC').exec(function(err, msg){
				if (err){
					throw err;
				}
				
				callback(msg);
			});
		});


		

	}
}