var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate() {
    var email = document.getElementById("#mail").value;
    var password = document.getElementById("#password").value;
    $('#sumbit').on("click", function(){
    if (email == "horus@horus.com" && password == "horus"  || email == "jacobv2410@gmail.com" && password == "jacob") {
        // database.db()
        console.log("hello")
        // alert("Login successful");
        window.location = "index"; // Redirecting to other page.
        return false;
    }
    else {
        alert('Invalid email or password. Please try again.')
    }
    })
}