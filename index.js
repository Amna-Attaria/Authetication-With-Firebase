// Import Firebase methods
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,onAuthStateChanged , sendEmailVerification , signOut} from "./firebase.js";

// Sign Up function
let signUp = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User created:", user);
            window.location.href = "signin.html";
        })
        .catch((error) => {
            console.log("Error:", error.message);
        });
};

// Add event listener for Sign Up button
let sign_Up = document.getElementById("sign_Up");
if (sign_Up) {
    sign_Up.addEventListener("click", signUp);
}

// Sign In function
let sign_In = (event) => {
    event.preventDefault(); // Prevent the form from submitting

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Signed in successfully:", user);
            window.location.href = "main.html"; // Redirect after successful sign-in
        })
        .catch((error) => {
            console.log("Error:", error.message);
        });
};


// Assign event listener to Sign In button
let signInButton = document.getElementById("signIn");
if (signInButton) {
    signInButton.addEventListener("click", sign_In);
}

onAuthStateChanged(auth, (user) => {
    if (user) {
   console(user);
      const uid = user.uid;
      // ...
    } else {
   console("error");
     
    }
  });
  
  let sendMail = () => {
    
sendEmailVerification(auth.currentUser)
  .then(() => {
   console.log("email verification snd");
   
  });
  }

  let verification = document.getElementById("vaerify");
  verification.addEventListener("click" , sendMail);


  let signout = () => {
    signOut(auth).then(() => {
        console.log("Sign-out successful.");
        window.location.href = "signin.html"; // Redirect to sign-in page after successful sign-out
    }).catch((error) => {
        console.log("Error during sign-out:", error.message);
    });
};

// Add event listener to Sign Out button
let sign_out = document.getElementById("logout");
if (sign_out) {
    sign_out.addEventListener("click", signout);
}