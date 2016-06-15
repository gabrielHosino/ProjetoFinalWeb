var myApp = angular.module('inicial');

myApp.controller('search', ['$scope', 'inicialService', function($scope, inicialService) {
	var id = localStorage.id;
	var search;

	search = localStorage.search;
	
	$scope.perUserName;
	$scope.perUserLastName;
	$scope.perUserNick;
	$scope.perGroups;

	$scope.clickSearchGroup = function(id){
		localStorage.group = id;
		location.href = 'http://localhost:1337/#/seeg';
	};


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

	
	inicialService.searchByFN(search).then(
			function(response){
				$scope.perUserName = response.data;
				console.log($scope.perUserName);				
			},
			function(response){
				console.log('Erro: Problema no acesso ao banco de dados.');
			}
		);

	inicialService.searchByGroup(search).then(
			function(response){
				$scope.perGroup = response.data;
				console.log($scope.perGroup);				
			},
			function(response){
				console.log('Erro: Problema no acesso ao banco de dados.');
			}
		);
	

	inicialService.searchByLN(search).then(
		function(response){
			$scope.perUserLastName = response.data;
			console.log($scope.perUserLastName);		
		},
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
		}
	);
	
	
	inicialService.searchByNick(search).then(
		function(response){
			$scope.perUserNick = response.data;
			console.log($scope.perUserNick);
		},
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
		}
	);

	console.log(search);
}]);
