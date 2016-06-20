/**
 * InicialController
 *
 * @description :: Server-side logic for managing inicials
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	searchByFN: function(req, res){
		var search = {search: req.param("search")};
		loginsigninService.searchByFN(search, function(result){
			return res.json(result);
		});
	},
	searchByLN: function(req, res){
		var search = {search: req.param("search")};

		loginsigninService.searchByLN(search, function(result){
			return res.json(result);
		});
	},
	searchByGroup: function(req, res){
		var search = {search: req.param("search")};

		loginsigninService.searchByGroup(search, function(result){
			return res.json(result);
		});
	},
	searchByNick: function(req, res){
		var search = {search: req.param("search")};	

		loginsigninService.searchByNick(search, function(result){
			return res.json(result);
		});
	},
	save: function(req,res){
		//var value = req.param('Teste');
		var value = req.body;
		console.log(value);
		loginsigninService.save(value, function(result){
			return res.json(result);
		});
	},
	login: function(req,res){
		var value = {email: req.param('email'), senha: req.param('senha')};
		console.log("login");
		console.log(value);
		loginsigninService.read(value, function(client){
			return res.json(client);
		});
	},
	user: function(req,res){
		var value = req.param('id');
		console.log("user");
		console.log(value);
		loginsigninService.readUser(value, function(client){
			return res.json(client);
		});
	},
	getGroupSee: function(req,res){
		var value = req.param('relativeid');
		loginsigninService.readGroup(value, function(group){
			return res.json(group);
		});
	},
	updateBio: function(req, res){
		var value = {id: req.param('id'), newbio: req.param('newbio')};
		loginsigninService.updateBio(value, function(result){
			return res.json(result);
		});
	},
	updateFirstname: function(req, res){
		var value = {id: req.param('id'), newfn: req.param('newfn')};
		loginsigninService.updateFirstname(value, function(result){
			return res.json(result);
		});
	},
	updateLastname: function(req, res){
		var value = {id: req.param('id'), newln: req.param('newln')};
		loginsigninService.updateLastname(value, function(result){
			return res.json(result);
		});
	},
	updateBirth: function(req, res){
		var value = {id: req.param('id'), newbirth: req.param('newbirth')};
		console.log("SERVICE");
		console.log(value);
		loginsigninService.updateBirth(value, function(result){
			return res.json(result);
		});
	},
	createGroup: function(req, res){
		var value = req.body;
		groupsService.create(value, function(result){
			return res.json(result);
		});
	},
	addParticipant: function(req, res){
		var value = req.body;
		groupsService.addParticipant(value, function(result){
			return res.json(result);
		});
	},
	getGroup: function(req, res){
		var value = {id: req.param('id'), nome: req.param('nome')};
		groupsService.getGroup(value, function(result){
			return res.json(result);
		});
	},
	getGroups: function(req, res){
		var value;
		groupsService.getGroups(value, function(result){
			return res.json(result);
		});
	},
	newpost: function(req,res){
		//var value = req.param('Teste');
		var value = req.body;
		console.log(value);
		postsService.save(value, function(result){
			return res.json(result);
		});
	},
	delPost: function(req,res){
		//var value = req.param('Teste');
		var value = req.body;
		postsService.delpost(value, function(result){
			return res.json(result);
		});
	},
	yourposts: function(req,res){
		var value = req.param('id');
		postsService.getyourposts(value, function(posts){
			return res.json(posts);
		});
	}
};