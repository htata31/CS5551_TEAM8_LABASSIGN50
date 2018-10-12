// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'homePage.html',
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
})



.controller('searchctrl', function($scope, $http,$cordovaBarcodeScanner) {
        $scope.getSearchResult = function() {
          $scope.header="Details of the " +$scope.searchitem+ " in the walmart";
          $http.get("/search?query="+$scope.searchitem+"&format=json&apiKey=bgud2m46mbkgyapsg9wfywaw").then(function(data)
          {
            //alert("success triggered");
            try {
              console.log(data);
              $scope.searchname=data.data.items[0].name;
              $scope.name="Name: ";

              $scope.rating=data.data.items[0].customerRating;
              $scope.ratingheader="Rating: ";
              $scope.ratingimage=data.data.items[0].customerRatingImage;

              $scope.price=data.data.items[0].salePrice;
              $scope.priceheader="Price: ";

              $scope.stockavailable=data.data.items[0].stock;
              $scope.stockheader="Stock Available: ";

              $scope.searchDescription = data.data.items[0].shortDescription;
              $scope.descriptionheader = "Description: ";
              
              $scope.searchimage = data.data.items[0].thumbnailImage;
              document.getElementById("errormsg").innerHTML ="";

            }
            catch(err){
              // document.getElementById("errormsg").innerHTML = "Please Correct your search item";
            }
          })
        

    
    
          var readVal="";
          $scope.toprecipes="Top 7 Dishes of "+$scope.searchitem;
          $http.get('https://www.food2fork.com/api/search?key=7881b1b04971e10d08f6ceb13aba53e3&q='+$scope.searchitem+'&sort=r').success(function (data) 
            {
                  var dishes=[];
                  for(var i=0;i<7;i++) 
                  {
                      dishes.push(new Array(data.recipes[i].title));
                  }
                  console.log(dishes.length);
                  $scope.foodDishes =[];
                  for(var x=0;x<dishes.length;x++)
                  {
                      var val= dishes[x];
                      readVal=readVal+" "+dishes[x];
                      $scope.foodDishes.push(val.toString());
                  }
              // console.log("Inside "+readVal);
            });
          };
          $scope.scanBarcode = function() 
          {
            $cordovaBarcodeScanner.scan().then(function(imageData) 
            {
                alert(imageData.text);
                console.log("Barcode Format -> " + imageData.format);
                console.log("Cancelled -> " + imageData.cancelled);
            }, function(error)
            {
                console.log("An error happened -> " + error);
            });
          };
})


.controller('loginctrl', function($scope, $http,$window) {
  $scope.Login = function() 
  {
    var uname=$scope.login_username;
    var pwd=$scope.login_password;
    var val= pwd==localStorage.getItem(uname)?true:false;
    // alert($scope.login_password);
    if(val)
    {
      $window.location.href = 'homepage.html';
    }
  };
    $scope.Register= function()
    {
      $window.location.href = 'register.html';
    };
})

.controller('registerctrl', function($scope, $http, $window) {
  // console.log("entered");
  $scope.SignUp = function() 
  {
    // console.log("entered1");
    var username = $scope.register_uname;
    var password = $scope.register_pwd;
    var confirmpwd = $scope.register_cpwd;
    // alert($scope.register_uname);
    var pwdval= password == confirmpwd ? true : false;
      
            if ( pwdval  )
            {
                localStorage.setItem(username, password);
                $window.location.href = 'index.html';
                alert("Succefully signed up") ;               
            }
            else
            {
                if(!pwdval)
                {
                  alert("Both Passwords are not matching");
                }
            }
    $scope.testfunction =function(uname,pwd)
    {
      $scope.result = "";
      $scope.username = uname;
      $scope.password = pwd;
      var username=uname;
      var reg=new RegExp('[0-9]');

      if($scope.username == '' && $scope.password == '' )
      {
        $scope.result = "username and password can not be empty";
      }
      if($scope.username == 'harish' && $scope.password == '' )
      {
        $scope.result = "password can not be empty";
      }
      if(reg.test(username[0]) )
      {
        $scope.result = "username cannot start with number";
      }
      $scope.result= true;
    }
  }
  
});



function signOut() {
  window.location.href="index.html";
};


  