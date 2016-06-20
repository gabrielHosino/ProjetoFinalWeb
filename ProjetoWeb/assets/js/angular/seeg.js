var myApp = angular.module('inicial');

//Service
myApp.controller('seeg', ['$scope', 'inicialService', function($scope, inicialService) {
	$scope.id = localStorage.id;
	$scope.group = localStorage.group;
	$scope.people;
	var user;
	$scope.myPosts = [];
	console.log('LOCAL:');
	console.log($scope.group);
	inicialService.getGroupSee($scope.group).then(
		function(response){
			document.getElementsByTagName("uname")[0].innerHTML = response.data[0].name;
			$scope.people = response.data[0].participants;
			for(i = 0; i < $scope.people.length; i++){
				if($scope.people[i].id == $scope.id){
					document.getElementById("btnsee").className = "btn btn-danger";
					document.getElementById("btnsee").innerHTML = "Deixar Grupo :(";
					document.getElementById("btnsee").removeAttr('ng-click');
					document.getElementById("btnsee").attr('ng-click', "quitGroup()");	
				}
			}
		},
		//Error
		function(response){
			console.log('Erro: Problema no acesso ao banco de dados.');
		}
	);

	$scope.quitGroup = function(){
		console.log("sai");
	};

	$scope.participate = function(){
		var obj = {id: $scope.id , relativeid: $scope.group};
		inicialService.addParticipant(obj).then(
			function(response){
				$scope.people = response.data[0].participants;
				console.log($scope.people);
			},
			//Error
			function(response){
				console.log('Erro: Problema no acesso ao banco de dados.');
			}
		);
	};

	updateBio = function(){
		var newdesc = document.getElementById("newbio").value;
		var newfirstname = document.getElementById("newfirstname").value;
		var newlastname = document.getElementById("newlastname").value;
		var newdate = document.getElementById("newdate").value;
		var confirm = document.getElementById("confirmEdit");
		var newbio = document.getElementById("newbio");
		var newfn = document.getElementById("newfirstname");
		var newln = document.getElementById("newlastname");
		var newdt = document.getElementById("newdate");
		var bio = document.getElementsByTagName("udesc")[0];
		var name = document.getElementsByTagName("uname")[0];
		var date = document.getElementsByTagName("ubirth2")[0];

		if(newdate != ""){
			var dates = newdate.split("T");
			date.innerHTML = dates[0];
			inicialService.updateBirth({id: id, newbirth: dates[0]});
		}else{
			console.log("NULLDATE");
			date.removeChild(newdt);
		}

		if(newdesc != ""){
			bio.innerHTML = newdesc;
			inicialService.updateBio({id: id, newbio: newdesc});
		}
		else{
			console.log("NULLDESC");
			bio.removeChild(confirm);
			bio.removeChild(newbio);
		}

		if(newfirstname != ""){
			name.innerHTML = newfirstname + " " + newlastname;
			inicialService.updateFirstname({id: id, newfn: newfirstname});
			inicialService.updateLastname({id: id, newln: newlastname});
		}
		else{
			console.log("NULLNOME");
			name.removeChild(newfn);
			name.removeChild(newln);
		}

		name.removeChild(newfn);
		name.removeChild(newln);
		date.removeChild(newdt);
		bio.removeChild(confirm);
		bio.removeChild(newbio);
	};

	editProfile = function(){
		var names = document.getElementsByTagName("uname")[0];
		var date = document.getElementsByTagName("ubirth2")[0];
		var bio = document.getElementsByTagName("udesc")[0];
		var newbio = document.createElement("INPUT");
		var newfirstname = document.createElement("INPUT");
		var newlastname = document.createElement("INPUT");
		var newdate = document.createElement("INPUT");
		newdate.setAttribute("type", "date");
		var confirm = document.createElement("BUTTON");

		confirm.id = "confirmEdit";
		confirm.style.float = "right";
		confirm.appendChild(document.createTextNode("confirm"));
		confirm.addEventListener("click", updateBio);

		newbio.id = "newbio";

		newfirstname.id = "newfirstname";
		newlastname.id = "newlastname";

		newdate.id = "newdate";

		bio.appendChild(newbio);
		bio.appendChild(confirm);
		date.appendChild(newdate);
		names.appendChild(newfirstname);
		names.appendChild(newlastname);

	};

	showEdit = function(){
		if(document.getElementById("editButton") == null){
			var eprof = document.getElementsByTagName("divu")[0];
			var edit = document.createElement("BUTTON");

			edit.id = "editButton";
			edit.style.float = "right";
			edit.addEventListener("click", editProfile);
			edit.appendChild(document.createTextNode("edit"));

			eprof.appendChild(edit);
		}
	};

	unshowEdit = function(){
		var eprof = document.getElementsByTagName("divu")[0];
		var redit = document.getElementById("editButton");

		eprof.removeChild(redit);
	};

	unblurPPic = function(){
		document.getElementById("profPic").style.WebkitFilter = "blur(0)";
	};

	blurPPic = function(){
		document.getElementById("profPic").style.WebkitFilter = "blur(2px)";
	};
}]);
