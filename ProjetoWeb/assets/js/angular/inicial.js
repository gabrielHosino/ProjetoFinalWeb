var myApp = angular.module('inicial', ['ngRoute']);

myApp.config(function ($routeProvider) {
    // $locationProvider.html5mode(true);

    $routeProvider.when('/', {
      templateUrl: '/templates/home.html',
      controller: 'home'
    }).when('/home', {
      templateUrl: '/templates/home.html',
      controller: 'home'
    }).when('/profile', {
      name: 'profile',
      templateUrl: '/templates/profile.html',
      controller: 'profile'
    }).when('/friends', {
      templateUrl: '/templates/friends.html',
      //controller: 'friends'
    }).when('/groups', {
      templateUrl: '/templates/groups.html',
      //controller: 'groups'
    }).when('/about', {
      templateUrl: '/templates/about.html',
      // controller: 'about'
    }).when('/contacts', {
      templateUrl: '/templates/contacts.html',
      // controller: 'contact'
    }).when('/search', {
      templateUrl: '/templates/search.html',
      //controller: 'search'
    }).when('/seeg', {
      templateUrl: '/templates/seeg.html',
    }).when('/seeu', {
      templateUrl: '/templates/seeu.html',
    }).otherwise({
      redirectTo: '/'

    })
  }
);

myApp.factory('inicialService', function ($http) {
  var user;
  var myPosts = [];

  return {
    'searchByFN': function (search) {
      return $http.get('/Inicial/searchByFN', { params: { search: search } });
    },
    'searchByLN': function (search) {
      return $http.get('/Inicial/searchByLN', { params: { search: search } });
    },
    'searchByGroup': function (search) {
      return $http.get('/Inicial/searchByGroup', { params: { search: search } });
    },
    'searchByNick': function (search) {
      return $http.get('/Inicial/searchByNick', { params: { search: search } });
    },
    'setUser': function (newuser) {
      user = newuser;
    },
    'getUser': function (relativeid) {
      return user;
    },
    'getGroupSee': function (id) {
      return $http.get('/Inicial/getGroupSee', { params: { relativeid: id } });
    },
    'deletePost' : function(id){
        return $http.post('/Inicial/delPost', id);
     },
    'saveMyPost': function (data) {
      myPosts = data;
    },
    'readMyPost': function () {
      return myPosts;
    },
    'save': function (newClient) {
      return $http.post('/Inicial/save', newClient);
    },
    'login': function (loginvar) {
      return $http.get('/Inicial/login', { params: { email: loginvar.email, senha: loginvar.senha } });
    },
    'user': function (userid) {
      return $http.get('/Inicial/user', { params: { id: userid } });
    },
    'updateBio': function (userbio) {
      return $http.post('/Inicial/updateBio', { id: userbio.id, newbio: userbio.newbio });
    },
    'updateFirstname': function (userfn) {
      return $http.post('/Inicial/updateFirstname', { id: userfn.id, newfn: userfn.newfn });
    },
    'follow': function (foll) {
      return $http.post('/Inicial/follow', { person: foll.person, follows: foll.follows});
    },
    'unfollow': function (foll) {
      return $http.post('/Inicial/unfollow', { person: foll.person, follows: foll.follows});
    },
    'updateLastname': function (userln) {
      return $http.post('/Inicial/updateLastname', { id: userln.id, newln: userln.newln });
    },
    'updateBirth': function (userbirth) {
      return $http.post('/Inicial/updateBirth', { id: userbirth.id, newbirth: userbirth.newbirth });
    },
    'createGroup': function (newgroup) {
      return $http.post('Inicial/createGroup', newgroup);
    },
    'addParticipant': function (add) {
      return $http.post('Inicial/addParticipant', {id: add.id, relativeid: add.relativeid });
    },
    'quitGroup': function (add) {
      return $http.post('Inicial/quitGroup', {id: add.id, relativeid: add.relativeid });
    },
    'getGroup': function (group) {
      return $http.get('/Inicial/getGroup', { params: { id: group.id, name: group.nome } });
    },
    'getGroups': function () {
      return $http.get('/Inicial/getGroups');
    },
    'newPost': function (newPost) {
      return $http.post('/Inicial/newpost', newPost);
    },
    'getYourPosts': function (userid) {
      return $http.get('/Inicial/yourposts', { params: { id: userid } });
    },
    'getFollows': function(userid) {
      return $http.get('/Inicial/getFollows', { params: { id: userid } });
    },
    'getAllPosts': function(id){
      return $http.get('/Inicial/getAllPosts', { params: { id: id } });
    }
  }
});

myApp.controller('app', function ($scope, $location) {
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };

  $scope.search = function(){
    var looking = document.getElementById("search").value;
    localStorage.search = looking;

    location.href = 'http://localhost:1337/#/search';
  };
});

myApp.controller('btns', ['$scope', 'inicialService', function ($scope, inicialService) {
  $scope.newClient;
  $scope.nome;
  $scope.sobrenome;
  $scope.apelido;
  $scope.email;
  $scope.senha;
  $scope.born;
  $scope.loginvar;


  $scope.login = function () {
    $scope.email = document.getElementById("email1").value;
    $scope.senha = document.getElementById("senha1").value;

    loginvar = { email: $scope.email, senha: $scope.senha };
    console.log("email:")
    console.log($scope.email);
    inicialService.login(loginvar).then(
      //success
      function (response) {
        if (response.data == '') {
          console.log('ERRO: Email ou senha errados.');
          document.getElementById("senha1").value = '';
          document.getElementById("email1").value = '';
          document.getElementById("error").className = 'alert alert-danger';
          document.getElementById("error").innerHTML = "E-mail ou senha errados.Tente novamente.";
          
        }
        else {
          console.log(response.data[0]);
          inicialService.setUser(response.data[0]);
          localStorage.id = response.data[0].id;
          location.href = 'http://localhost:1337/#/home';
        }
      },
      //Error
      function (response) {
        console.log('Erro: Problema no acesso ao banco de dados.');
      });

  };

  $scope.signin = function () {
    $scope.nome = document.getElementById("nome").value;
    $scope.sobrenome = document.getElementById("sobrenome").value;
    $scope.apelido = document.getElementById("apelido").value;
    $scope.email = document.getElementById("email2").value;
    $scope.senha = document.getElementById("senha2").value;
    $scope.bio = document.getElementById("bio").value;
    $scope.born = document.getElementById("date").value;
    newClient = {
      firstname: $scope.nome, lastname: $scope.sobrenome,
      nickname: $scope.apelido, email: $scope.email, password: $scope.senha,
      birth: $scope.born, bio: $scope.bio
    };
    console.log(newClient);
    if ($scope.nome == '' || $scope.sobrenome == '' || $scope.apelido == '' ||
      $scope.email == '' || $scope.senha == '') {
      document.getElementById("error").className = 'alert alert-danger';
      document.getElementById("error").innerHTML = "Erro ao cadastrar novo cliente. Não deixe nenhum espaço em branco!";
    } else {
      inicialService.save(newClient).then(
        //success
        function (response) {
          console.log('Cliente Cadastrado.');
          //colocar cliente cadastrado na proxima pagina
        },
        //Error
        function (response) {
          console.log('ERRO: Cliente não pode ser cadastrado.');
        });
    }


    document.getElementById("nome").value = '';
    document.getElementById("sobrenome").value = '';
    document.getElementById("apelido").value = '';
    document.getElementById("email2").value = '';
    document.getElementById("senha2").value = '';
    document.getElementById("date").value = '';
    document.getElementById("bio").value = '';
  };

}]);




