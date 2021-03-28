$(document).ready(() => {
  $("#error-message").hide();
  $("#sign-up-form").hide();
});

// firebase auth
const fbAuth = firebase.auth();

// firebase database
const fbDatabase = firebase.database();

const addUsertoDatabase = (user) => {
  const key = fbDatabase.ref("users").push().key;
  user.key = key;
  fbDatabase.ref("users").child(key).set(user);
};

// error functions
const getErrorMessage = (error) => {
  const errorObj = {
    message: "",
    class: "",
  };

  if (error === "password not matched") {
    errorObj.message = "Password not matched!";
    errorObj.class = "alert-danger";
  } else if (error === "auth/email-already-in-use") {
    errorObj.message =
      "The email address is already in use by another account.";
    errorObj.class = "alert-warning";
  } else if (error === "auth/weak-password") {
    errorObj.message =
      "Your password is too weak, Password should be at least 6 characters";
    errorObj.class = "alert-dark";
  }

  return errorObj;
};

// show alert message
const showAlert = (message, className) => {
  $("#message").text(message);
  $("#error-message").addClass(className);
  $("#error-message").show("slow");
};

// signup function
const signUpUser = (e) => {
  e.preventDefault();
  const firstName = $("#first-name").val();
  const lastName = $("#last-name").val();
  const email = $("#email").val();
  const password = $("#password").val();
  const reTypePassword = $("#retype-password").val();

  // checking if both password matches or not!
  if (password !== reTypePassword) {
    console.log("error!");
    errorMessage = getErrorMessage("password not matched");
    showAlert(errorMessage.message, errorMessage.class);
    return false;
  }

  // user data object which is used to store data in database!
  const userData = {
    username: `${firstName} ${lastName}`,
    email,
    password,
  };

  // create an account with email and pass
  fbAuth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      console.log("User added");
      const currentUser = fbAuth.currentUser;
      currentUser
        .updateProfile({
          displayName: `${firstName} ${lastName}`,
        })
        .then((response) => {
          // show modal
          $("#exampleModalLong").modal("show");

          // clear the text fields
          $("#first-name").val("");
          $("#last-name").val("");
          $("#email").val("");
          $("#password").val("");
          $("#retype-password").val("");
        })
        .catch((error) => console.log(error.message));
    })
    .catch((error) => {
      const errorMessage = getErrorMessage(error.code);
      showAlert(errorMessage.message, errorMessage.class);
      return false;
    });

  // store data to the database
  addUsertoDatabase(userData);
};

// hide alert when user start typing in the fields
$("#sign-up-form .form-control").on("keypress", () => {
  $("#error-message").hide();
  console.log("fahad");
});

// login function
const loginUser = (e) => {
  e.preventDefault();
  const loginEmail = $("#login-email").val();
  const loginPassword = $("#login-password").val();

  firebase
    .auth()
    .signInWithEmailAndPassword(loginEmail, loginPassword)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
      window.location = "dashboard.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
};

// this function triggered when user sign in or logout
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log("User Signed In");
  } else {
    console.log("Error!");
  }
});

// form toggle function
const formToggle = (e) => {
  e.preventDefault();
  $("#sign-up-form").toggle();
  $("#login-form").toggle();
  $("#login-form").addClass("magictime boingInUp");
  $("#sign-up-form").addClass("magictime boingInUp");
};


// function that will take input the email and send the mail at the users email
const sendResetEmail = (e)=>{
  e.preventDefault()
  const resetEmail = $("#reset-email").val();

  if(resetEmail.length===0)
  {
    alert("Please Enter Your Email!");
    return false
  }
  $("#reset-message").text(`We have sent you the password reset link at ${resetEmail}. Check your Email to reset your Security App Password!`);

fbAuth.sendPasswordResetEmail(resetEmail).then(function() {
  // Email sent.
  $("#sent-mail-modal").modal("show");

}).catch(function(error) {
  // An error happened.
  console.log(error)
  $("#reset-message").text(error.message);
  $("#sent-mail-modal").modal("show");

});
}




// add event on the signup or login button on the forms pages
$(".change-form-link").on("click", formToggle);
// event of login form
$("#login-form").on("submit", loginUser);
// select signup form
$("#sign-up-form").on("submit", signUpUser);

// reset form
$("#reset-password-form").on("submit", sendResetEmail)


const goToLoginForm = (e)=>{
  e.preventDefault();
  // hide signup form
  $("#sign-up-form").toggle();

  const btnId= e.target.id;
  if(btnId==="modal-login-btn")
  {
  $("#exampleModalLong").modal("hide");
  }
  else if(btnId==="reset-modal-login-btn")
  {
    
    $("#sent-mail-modal").modal("hide");
    window.location="signup.html"
  }
}




$(".modal-btn").on("click",goToLoginForm)
$("#reset-form-close-btn").on("click", e=>{
  e.preventDefault();
  window.location = "signup.html"
  console.log("fahad")
})