var myApp = angular.module('inicial');

//Service
myApp.controller('seeg', ['$scope', 'inicialService', function($scope, inicialService) {
	$scope.id = localStorage.id;
	$scope.group = localStorage.group;
	$scope.people;
	var user;
	$scope.isOnGroup;
	$scope.myPosts = [];
	
	inicialService.getGroupSee($scope.group).then(
		function(response){
			document.getElementsByTagName("uname")[0].innerHTML = response.data[0].name;
			$scope.people = response.data[0].participants;
			for(i = 0; i < $scope.people.length; i++){
				if($scope.people[i].id == $scope.id){
					$scope.isOnGroup = true;
					break;
				}else{
					$scope.isOnGroup = false;
				}
			}

		},
		//Error
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
		}
	);

	$scope.quitGroup = function(){
		var obj = {id: $scope.id , relativeid: $scope.group};
		inicialService.quitGroup(obj).then(
			function(response){
				$scope.people = response.data[0].participants;
				$scope.isOnGroup = false;
			},
			//Error
			function(response){
				console.log('Erro: Problema no acesso ao banco de dados.');
			}
		);
	};

	$scope.participate = function(){
		var obj = {id: $scope.id , relativeid: $scope.group};
		inicialService.addParticipant(obj).then(
			function(response){
				$scope.people = response.data[0].participants;
				$scope.isOnGroup = true;
			},
			//Error
			function(response){
				console.log('Erro: Problema no acesso ao banco de dados.');
			}
		);
	};
}]);
