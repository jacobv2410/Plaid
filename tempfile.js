function validate() {
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    if (email == "horus@horus.com" && password == "horus"  || email == "jacobv2410@gmail.com" && password == "jacob") { 
        alert("Login successful");
         // Redirecting to other page.
         window.location.href = "/index";
        return false;
    }
    else {
        alert('Invalid email or password. Please try again.')
    }
    
}