var myApp = angular.module('inicial');

//Service
myApp.controller('profile', ['$scope', 'inicialService', function($scope, inicialService) {
	$scope.id = localStorage.id;
	var user;
	$scope.myPosts = [];

	inicialService.user($scope.id).then(
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

	inicialService.getYourPosts($scope.id).then(
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

  	$scope.deletePost = function(id) {
    	var obj = {id : id}
    	inicialService.deletePost(obj).then(
			function(response){
				console.log('Deletei o post Irmão!');
			},
			//Error
			function(response){
				console.log('Erro: Problema no acesso ao banco de dados.');
		});

		inicialService.getYourPosts($scope.id).then(
			function(response){
				console.log('Retornei os posts! Depois de deletar');
				console.log(response.data[0]);
				inicialService.saveMyPost(response.data);
				$scope.myPosts = inicialService.readMyPost();	
			},
			//Error
			function(response){
				console.log('Erro: Problema no acesso ao banco de dados.');
		});
		
  	}

	editProfilePic = function(){
		console.log("Editado");
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
			inicialService.updateBirth({id: $scope.id, newbirth: newdate});
		}else{
			console.log("NULLDATE");
			date.removeChild(newdt);
		}

		if(newdesc != ""){
			bio.innerHTML = newdesc;
			inicialService.updateBio({id: $scope.id, newbio: newdesc});
		}
		else{
			console.log("NULLDESC");
			bio.removeChild(confirm);
			bio.removeChild(newbio);
		}

		if(newfirstname != ""){
			name.innerHTML = newfirstname + " " + newlastname;
			inicialService.updateFirstname({id: $scope.id, newfn: newfirstname});
			inicialService.updateLastname({id: $scope.id, newln: newlastname});
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
		newdate.placeholder = "yyyy-MM-dd";
		var confirm = document.createElement("BUTTON");

		newbio.placeholder = "New description";
		newfirstname.placeholder = "New name";
		newlastname.placeholder = "New lastname";

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
