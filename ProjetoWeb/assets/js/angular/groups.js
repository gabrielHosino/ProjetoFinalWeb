var myApp = angular.module('inicial');

myApp.controller('groups', ['$scope', 'inicialService', function($scope, inicialService) {

	var id = localStorage.id;
	$scope.groups;
	$scope.print = [];
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

	inicialService.getGroups().then(
		function(response){
			console.log(response.data);
			$scope.groups = response.data;
			for(i = 0; i < $scope.groups.length; i++){
				for(j = 0; j <$scope.groups[i].participants.length; j++){
					if($scope.groups[i].participants[j].id == id){
						$scope.print.push($scope.groups[i]);
						break;
					}
				}
			}
		},
		//Error
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
	});

	addtoBd = function(){
		var newgroup = document.getElementsByTagName("divng")[0];
		var namegroup = document.getElementById("groupname")
		var confirm = document.getElementById("confirm");

		if(namegroup.value != ""){
			console.log(id + " " + namegroup.value);
			inicialService.createGroup({id: id, name: namegroup.value});
		}

		newgroup.removeChild(namegroup);
		newgroup.removeChild(confirm);
	};

	createGroup = function(){
		var newgroup = document.getElementsByTagName("divng")[0];
		var namegroup = document.createElement("INPUT");
		var confirm = document.createElement("BUTTON");

		namegroup.id = "groupname";
		confirm.id = "confirm";
		confirm.appendChild(document.createTextNode("create"));
		confirm.addEventListener("click", addtoBd);

		newgroup.appendChild(namegroup);
		newgroup.appendChild(confirm);
	};

	$scope.clickGroup = function(gid){
		localStorage.group = gid;
		location.href = 'http://localhost:1337/#/seeg';
	};

}]);
