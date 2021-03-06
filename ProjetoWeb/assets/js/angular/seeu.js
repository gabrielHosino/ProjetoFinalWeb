var myApp = angular.module('inicial');

//Service
myApp.controller('seeu', ['$scope', 'inicialService', function($scope, inicialService) {
	$scope.id = localStorage.id;
	$scope.seeu = localStorage.seeProf;
	var user;
	$scope.isFollowing;
	$scope.myPosts = [];

	inicialService.user($scope.seeu).then(
		function(response){
			inicialService.setUser(response.data[0]);
			user = inicialService.getUser();
			console.log(user);
			document.getElementsByTagName("uname")[0].innerHTML = user.firstname + " " + user.lastname;
			console.log("BIRTH " + user.birth);
			console.log("BIO " + user.bio);
			var date;
			if(user.birth != undefined){
				date = user.birth.split("T");
				document.getElementsByTagName("ubirth2")[0].innerHTML = date[0];
			}
			document.getElementsByTagName("udesc")[0].innerHTML = user.bio;
		},
		//Error
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
	});

	inicialService.getYourPosts($scope.seeu).then(
		function(response){
			console.log('Retornei os posts!');
			inicialService.saveMyPost(response.data);
			$scope.myPosts = inicialService.readMyPost();
			console.log($scope.myPosts[0]);
		},
		//Error
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
	});

	inicialService.getFollows($scope.id).then(
		function(response){
			for(i =0; i < response.data.length; i++){
				if(response.data[i].follows.id == $scope.seeu){
					$scope.isFollowing = true;
					break;
				}else{
					$scope.isFollowing = false;
				}
			}
			
		},
		//Error
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
	});

	$scope.follow = function(){
		var foll = {follows: $scope.seeu, person: $scope.id};
		inicialService.follow(foll).then(
		function(response){
			$scope.isFollowing = true;
		},
		//Error
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
		});
	},

	$scope.unfollow = function(){
		var foll = {follows: $scope.seeu, person: $scope.id};
		inicialService.unfollow(foll).then(
		function(response){
			$scope.isFollowing = false;
		},
		//Error
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
		});
	}
	
}]);
