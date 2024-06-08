// // init Isotope
// var $grid = $('.collection-list').isotope({
//   // options
// });
// // filter items on button click
// $('.filter-button-group').on( 'click', 'button', function() {
//   var filterValue = $(this).attr('data-filter');
//   resetFilterBtns();
//   $(this).addClass('active-filter-btn');
//   $grid.isotope({ filter: filterValue });
// });

// var filterBtns = $('.filter-button-group').find('button');
// function resetFilterBtns(){
//   filterBtns.each(function(){
//     $(this).removeClass('active-filter-btn');
//   });
// }

// /* global bootstrap: false */
// (() => {
// 'use strict'
// const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
// tooltipTriggerList.forEach(tooltipTriggerEl => {
//   new bootstrap.Tooltip(tooltipTriggerEl)
// })
// })()


/*1 trang */
var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function ($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'views/exe/home.html'
  }).when('/collection', {
    templateUrl: 'views/exe/collection.html'
  }).when('/special', {
    templateUrl: 'views/exe/special.html'
  }).when('/blogs', {
    templateUrl: 'views/exe/blogs.html'
  }).when('/about', {
    templateUrl: 'views/exe/about.html'
  }).when('/cart', {
    templateUrl: 'views/exe/cart.html'
  }).otherwise({
    redirectTo: '/home'
  });
});

myApp.controller("shoppingCTR", function ($scope, $http) {
  $scope.carts = [];
  $scope.products = [];
  $scope.products2 = [];
  $scope.allsoluong = function () {
    var tls = 0;
    for (i = 0; i < $scope.carts.length; i++) {
      if ($scope.carts[i].buy) {
        tls += $scope.carts[i].soluong
      }

    }
    return tls;
  }
  $scope.tongtien = function () {
    var rr = 0;
    for (i = 0; i < $scope.carts.length; i++) {
      if ($scope.carts[i].buy) {
        rr += $scope.carts[i].soluong * $scope.carts[i].p_price;
      }

    }
    return rr;
  }




  $scope.add_cart = function (product) {
    var index = $scope.carts.findIndex(p => p.p_id == product.p_id)
    if (index >= 0) {
      $scope.carts[index].soluong++;
      
    } else {
      var spIncart = { p_id: product.p_id, p_name: product.p_name, p_price: product.p_price, p_image: product.p_image, soluong: 1 }
      $scope.carts.push(spIncart)
      alert("thêm thành công");

    }

    console.log($scope.carts);
  }


  // $scope.setTotals = function(cart){
  //     if(cart){
  //         $scope.total += cart.p_price;
  //     }
  // }

  $scope.remove_cart = function (cart) {
    if (cart) {
      $scope.carts.splice($scope.carts.indexOf(cart), 1);
      $scope.total -= cart.p_price;
    }
  }



  $http.get('json.json').then(function (response) {
    $scope.products = response.data;
    $scope.pageCount = Math.ceil($scope.products.length / $scope.pageSize);
  });

  $http.get('json2.json').then(function (response) {
    $scope.products2 = response.data;
    $scope.pageCount = Math.ceil($scope.products2.length / $scope.pageSize);
  });


  $scope.begin = 0;
  $scope.pageSize = 4;

  $scope.pageCount = Math.ceil($scope.products.length / $scope.pageSize);



  $scope.repaginate = function () {
    $scope.begin = 0;
    $scope.pageCount = Math.ceil($scope.products.length / $scope.pageSize);
  }
  $scope.sortBy = function (prop) {
    $scope.prop = prop;
  }

  $scope.first = function () {
    $scope.begin = 0;
  }
  $scope.previous = function () {
    if ($scope.begin > 0) {
      $scope.begin -= $scope.pageSize;
    }
  };
  $scope.next = function () {
    if ($scope.begin < ($scope.pageCount - 1) * $scope.pageSize) {
      $scope.begin += $scope.pageSize;
    }
  }
  $scope.last = function () {
    $scope.begin = ($scope.pageCount - 1) * $scope.pageSize;
  }

















});






myApp.run(function ($rootScope) {
  $rootScope.$on("$routeChangeStart", function () {
    $rootScope.loading = true;
  });
  $rootScope.$on("$routeChangeSuccess", function () {
    $rootScope.loading = false;

  }); 2
  $rootScope.$on("$routeChangeError", function () {
    $rootScope.loading = false;
    alert('Lỗi, Không tải được template');
  });
})
