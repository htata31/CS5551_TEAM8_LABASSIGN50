angular.module('homepage',[])
    .controller('homectrl', function($scope, $http) {
        console.log("hi");
        var sampletext="";
        $scope.getSearchResult = function() {
            $http.get("https://kgsearch.googleapis.com/v1/entities:search?query="+$scope.searchitem+"&key=AIzaSyBp-OLwk2O5GYag5GMUmLVi6AqXa1UI8Go&limit=1&indent=True").success(function(data)
            {
                try {
                    console.log(data);

                    $scope.searchDescription = data.itemListElement[0].result.detailedDescription.articleBody;
                    $scope.description = "Description:";
                    $scope.wiki = data.itemListElement[0].result.detailedDescription.url;
                    $scope.wikiheading = "Explore " + $scope.searchitem + " wiki in the following link";
                    $scope.searchimage = data.itemListElement[0].result.image.contentUrl;
                    document.getElementById("errormsg").innerHTML ="";

                    // localStorage.setItem("Description",$scope.searchDescription);
                    // localStorage.setItem("wikilink",$scope.wiki);
                    // localStorage.setItem("wikihead",$scope.wikiheading);
                    // localStorage.setItem("img",$scope.searchimage);
                }
                catch(err){
                    document.getElementById("errormsg").innerHTML = "Please Correct your search item";
                }
            })
        }
        // $scope.searchDescription=localStorage.getItem("Description");
        // $scope.description = "Description:";
        // $scope.wiki = localStorage.getItem("wikilink");
        // $scope.wikiheading = localStorage.getItem("wikihead");
        // $scope.searchimage = localStorage.getItem("img");
        // console.log($scope.searchDescription);
    });
