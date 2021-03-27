// Firebase App (the core Firebase SDK) is always required and must be listed first
// import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use

// import "firebase/firestore";
const firebaseConfig = {
  
        apiKey: "AIzaSyAFUlXj-4BjAXhJ8Ij6evYecMkfprIOzik",
        authDomain: "login-form-19da0.firebaseapp.com",
        projectId: "login-form-19da0",
        storageBucket: "login-form-19da0.appspot.com",
        messagingSenderId: "508539172201",
        appId: "1:508539172201:web:1d231cd669848e5079b9f8",
        measurementId: "G-P2Q16BW0L7"
    // ...
  };
  
  // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);
    // firebase.analytics();
  firebase.initializeApp(firebaseConfig);
  const emailtext=document.getElementById('exampleFormControlInput1')
  const passwordtext=document.getElementById('inputPassword')
  const btnlogin=document.getElementById('login')
  const btnsign=document.getElementById('btnsignup')
  btnsign.addEventListener("click",function(e){
    const emails=emailtext.value;
    const pass=passwordtext.value;
    const authe=firebase.auth();
   const promise= authe.createUserWithEmailAndPassword(emails,pass);
   
    promise.
    catch(console.log('error'));
  promise.then(user=>console.log('user'));
    
       
    
})
  btnlogin.addEventListener("click",function(e){
      const emails=emailtext.value;
      const pass=passwordtext.value;
      const authe=firebase.auth();
     const promise= authe.signInWithEmailAndPassword(emails,pass);
    //  console.log(firebaseUser)
    //  promise.catch(console.log('error'));
      // promise.then(console.log('user'+user));
      if(promise!=true)
      {
        console.log('success')
      }
      else{
        console.log('failed');
      }
  })


// firebase.auth().onAuthStateChanged(firebaseUser=>{
//   if(firebaseUser)
//   {
//     console.log(firebaseUser);
  
//   }
//   else{
//     console.log('not logged in');
//   }
//   });