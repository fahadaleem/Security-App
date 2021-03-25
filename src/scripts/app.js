// select signup form 
const signupBtn = document.querySelector("#sign-up-form");

// signup function
const signUpUser = (e)=>{
    e.preventDefault();
    const firstName = document.querySelector("#first-name").value;
    const lastname = document.querySelector("#last-name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const reTypePassword = document.querySelector("#retype-password").value;

    const userData = {
        firstName, lastname, email, password, reTypePassword
    }

    console.log(userData)
}

// add event to the signup form
signupBtn.addEventListener("submit", signUpUser)
