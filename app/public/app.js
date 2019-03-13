$(document).ready(function(){
    console.log("app.js loaded");
// ==================================================================================
// Handle the Submit from the survey.html and post new user + survey score
//   IMPORTED A JQUERY PACKAGE BUT DO NOT THINK THIS IS THE CORRECT WAY TO GO ABOUT IT
//  ANOTHER FRONT END JS FILE WITH JQUERY IS NEEDED FOR THE BELOW CODE?
// ==================================================================================
    $(".submit").on("click", function(event) {
        event.preventDefault();

        // Here we grab the form elements
        var newFriend = {
            name: $("#name").val().trim(),
            photo: $("#photo").val().trim(),
            q1: $("#q1").val().trim(),
            q2: $("#q2").val().trim(),
            q3: $("#q3").val().trim(),
            q4: $("#q4").val().trim(),
            q5: $("#q5").val().trim(),
            q6: $("#q6").val().trim(),
            q7: $("#q7").val().trim(),
            q8: $("#q8").val().trim(),
            q9: $("#q9").val().trim(),
            q10: $("#q10").val().trim()
        };
        console.log(newFriend);

        $.post("/api/friends", newFriend, function(data){
            console.log(data);
            
        });

    });


});