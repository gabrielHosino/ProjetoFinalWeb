module.exports = {
	save: function(newpost, callback){
		//var Obj = {value: tasks};
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
		twiche.find({user: value}).populate('user').exec(function(err, posts){
			if (err){
				throw err;
			}
			callback(posts);
		});
	}
}