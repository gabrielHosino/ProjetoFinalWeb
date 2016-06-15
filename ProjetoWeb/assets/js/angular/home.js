var myApp = angular.module('inicial');

myApp.controller('home', ['$scope', 'inicialService', function($scope, inicialService) {
	var id = localStorage.id;
	var user;  

	$scope.myNewPost = function(){
		var text = document.getElementById("posts").value;
		console.log(text);
		var myPost = {text : text, user : id};
		inicialService.newPost(myPost).then(
				//success
				function(response){
					console.log('Post Criado.');
					document.getElementById("posts").value = '';
				},
				//Error
				function(response){
					console.log('ERRO: Post não pode ser cadastrado.');
				});
	};


	inicialService.user(id).then(
		function(response){
			inicialService.setUser(response.data[0]);
			user = inicialService.getUser();
			document.getElementsByTagName("uname")[0].innerHTML = user.firstname + " " + user.lastname;
			$scope.myPosts = inicialService.readMyPost();
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
