var myApp = angular.module('inicial');

//Service
myApp.controller('friends', ['$scope', 'inicialService', function($scope, inicialService) {
	Search = function(){
		var looking = document.getElementById("search").value;

		location.href = "http://localhost:1337/search:id=" + id + ":search=" + looking;
	};

	var id = localStorage.id;
	var user;
	inicialService.user(id).then(
		function(response){
			inicialService.setUser(response.data[0]);
			user = inicialService.getUser();
			document.getElementsByTagName("uname")[0].innerHTML = user.firstname + " " + user.lastname;
		},
		//Error
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
	});

	// document.getElementById("home").href = document.getElementById("home").href + "?id=" + id;
	// document.getElementById("profile").href = document.getElementById("profile").href + "?id=" + id;
	// document.getElementById("friends").href = document.getElementById("friends").href + "?id=" + id;
	// document.getElementById("groups").href = document.getElementById("groups").href + "?id=" + id;
	// document.getElementById("about").href = document.getElementById("about").href + "?id=" + id;
	// document.getElementById("contact").href = document.getElementById("contact").href + "?id=" + id;
}]);
