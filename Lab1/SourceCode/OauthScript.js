var loginApp= angular.module('loginApp',[]);

loginApp.controller('loginAppcontroller',['$scope' ,function($scope){
    $scope.gmail={
        username:"",
        email:""
    };
    $scope.onGoogleLogin=function () {
        var params= {
                clientid:'825316471413-islflqo04lk4h5j7l3c7ju98f0o7nsfj.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                callback :function (result){
                    if(result['status']['signed_in']) {
                        var request=gapi.client.plus.people.get(
                            {
                                userId : "me"
                            }
                        );
                        request.execute(function (resp){
                            $scope.$apply(function(){
                                $scope.gmail.username= resp.displayName;
                                $scope.gmail.email =resp.emails[0].value;
                                $scope.g_image=resp.image.url;
                                window.location = "HomePage.html?"+$scope.gmail.username;
                            });

                        });
                    }

                },
                approvalprompt:'force',
                scope:'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
            };
        gapi.auth.signIn(params);
        $scope.name=$scope.gmail.username;
    }
}]);