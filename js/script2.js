var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function($routeProvider){
  $routeProvider.when('/login', {
      templateUrl: 'views2/exe/login.html'
  }).when('/singup',{
  templateUrl: 'views2/exe/singup.html'
}).otherwise({   
      redirectTo: '/login'
  });
});

myApp.controller("shoppingCTR", function($scope){
     $scope.list_acc = [];
     $scope.info = {};

     $scope.reg = function(){
       if($scope.list_acc.push(angular.copy($scope.info))){
               localStorage.setItem("list_accout", angular.toJson($scope.list_acc))
               alert("đăng ký thành công")
               window.location.href = "index3.html"

       }else{
        alert("đăng ký thất bại tài khoản đã tồn tại");
       } 
     }
     if(localStorage.getItem("list_accout")){
        $scope.list_acc = angular.fromJson(localStorage.getItem("list_accout"));
        

     }

     $scope.login = function(){
           var check = checkLogin($scope.info.us, $scope.info.pss);
           if(check != null){
            alert("đăng nhập thành công");
            window.location.href = "index2.html";
           }else{
            alert("tài khoản không tồn tại!");
           }
     }
     function checkLogin (user, pass){
      for(let index = 0; index < $scope.list_acc.length; index++){
        if($scope.list_acc[index].us == user && $scope.list_acc[index].pss == pass ){
          return $scope.list_acc[index];
        }
      }
     }
    
     console.log($scope.list_acc);
});


myApp.run(function($rootScope){
  $rootScope.$on("$routeChangeStart", function(){
      $rootScope.loading = true;
  });
  $rootScope.$on("$routeChangeSuccess", function(){
      $rootScope.loading = false;

  });2
  $rootScope.$on("$routeChangeError", function(){
      $rootScope.loading = false;
      alert('Lỗi, Không tải được template');
  });
})
