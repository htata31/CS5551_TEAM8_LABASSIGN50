

function signOut()
{
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function ()
    {
        alert("You have been logged out succesfully");
        $(".g-signin2").css("display","block");
        $(".data").css("display","block");

    });
}

function onSignIn(googleUser)
{
    // alert("The paragraph was clicked.");
    // var profile = googleUser.getBasicProfile();
    // $(".g-signin2").css("display","none");
    // $(".data").css("display","block");
    // $("#pic").attr('src',profile.getImageUrl());
    // $("#email").text(profile.getEmail());
}
