// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

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

.controller('searchctrl', function($scope, $http) {
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
      $scope.toprecipes="Top Recipies of"+$scope.searchitem;
      $http.get('https://www.food2fork.com/api/search?key=7881b1b04971e10d08f6ceb13aba53e3&q='+$scope.searchitem+'&sort=r').success(function (data) {
              var dishes=[];
              for(var i=0;i<7;i++) {
                  dishes.push(new Array(data.recipes[i].title));
              }
              console.log(dishes.length);
              $scope.foodDishes =[];
              for(var x=0;x<dishes.length;x++) {
                  var val= dishes[x];
                  readVal=readVal+" "+dishes[x];
                  $scope.foodDishes.push(val.toString());
              }
          console.log("Inside "+readVal);
          })
    

  }
})

// .controller('browsectrl', function($scope, $http) {
//     $scope.getNutrition = function () {
//       if ($scope.food) {
//           var readVal="";
//           $scope.toprecipes="Top Recipies";
//           $http.get('https://www.food2fork.com/api/search?key=7881b1b04971e10d08f6ceb13aba53e3&q='+$scope.food+'&sort=r').success(function (data) {
//                   var dishes=[];
//                   for(var i=0;i<7;i++) {
//                       dishes.push(new Array(data.recipes[i].title));
//                   }
//                   console.log(dishes.length);
//                   $scope.foodDishes =[];
//                   for(var x=0;x<dishes.length;x++) {
//                       var val= dishes[x];
//                       readVal=readVal+" "+dishes[x];
//                       $scope.foodDishes.push(val.toString());
//                   }
//               console.log("Inside "+readVal);
//               })
//         }
//     }
// })


.controller('loginctrl', function($scope, $http,$window) {
  $scope.Login = function() {
    $window.location.href = 'homePage.html';
  }
  $scope.Register= function()
  {
    $window.location.href = 'Register.html';
  }
})



app.controller('ImagePickerController', function($scope, $cordovaImagePicker, $ionicPlatform, $cordovaContacts) {
 
  $scope.collection = {
      selectedImage : ''
  };

  $ionicPlatform.ready(function() {

      $scope.getImageSaveContact = function() {       
          // Image picker will load images according to these settings
          var options = {
              maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
              width: 800,
              height: 800,
              quality: 80            // Higher is better
          };

          $cordovaImagePicker.getPictures(options).then(function (results) {
              // Loop through acquired images
              for (var i = 0; i < results.length; i++) {
                  $scope.collection.selectedImage = results[i];   // We loading only one image so we can use it like this

                  window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){  // Encode URI to Base64 needed for contacts plugin
                      $scope.collection.selectedImage = base64;
                      $scope.addContact();    // Save contact
                  });
              }
          }, function(error) {
              console.log('Error: ' + JSON.stringify(error));    // In case of error
          });
      }
    
    });
  } )