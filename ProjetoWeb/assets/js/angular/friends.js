var myApp = angular.module('inicial');

//Service
myApp.controller('friends', ['$scope', 'inicialService', function($scope, inicialService) {

	var id = localStorage.id;
	var user;
	$scope.follows;

	$scope.seeProf = function(fol){
		localStorage.seeProf = fol;
		location.href = 'http://localhost:1337/#/seeu';
	},
	
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

	inicialService.getFollows(id).then(
		function(response){
			$scope.follows = response.data;
		},
		//Error
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
	});
}]);
