$(document).ready(() => {
  $("#error-message").hide();
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
      return false
    });

    // store data to the database
     addUsertoDatabase(userData);

};

// select signup form
$("#sign-up-form").on("submit", signUpUser);

// hide alert when user start typing in the fields
$("#sign-up-form .form-control").on("keypress", () => {
  $("#error-message").hide();
  console.log("fahad");
});

// this function triggered when user sign in or logout
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log("User Signed In");
  } else {
    console.log("Error!");
  }
});
