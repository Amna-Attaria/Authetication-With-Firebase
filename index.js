// Import Firebase methods
import { 
    auth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    sendEmailVerification, 
    signOut, 
    signInWithPopup, 
    GoogleAuthProvider 
} from "./firebase.js";

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();

// Function to validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return emailRegex.test(email);
};

// Function to validate password strength
const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g; // Minimum 6 characters, at least one letter and one number
    return passwordRegex.test(password);
};

let signUp = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Validate email and password
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!isValidPassword(password)) {
        alert("Password must be at least 6 characters long and include at least one letter and one number.");
        return;
    }

    // Proceed to create user if validation passes
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User created:", user);
            window.location.href = "signin.html"; // Redirect to sign-in page after successful sign-up
        })
        .catch((error) => {
            console.log("Error:", error.message);
            alert("Error: " + error.message); // Display error to the user
        });
};

// Add event listener for Sign Up button
let sign_Up = document.getElementById("sign_Up");
if (sign_Up) {
    sign_Up.addEventListener("click", signUp);
}

// Sign In function
let sign_In = (event) => {
    event.preventDefault(); // Prevent form submission (for form elements)

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Signed in successfully");
            window.location.href = "main.html";
        })
        .catch((error) => {
            alert("Error:", error.message);
        });
};

// Add event listener to Sign In button
let signInButton = document.getElementById("signIn");
if (signInButton) {
    signInButton.addEventListener("click", sign_In);
}

// Monitor authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in:", user);
    } else {
        console.log("No user is signed in");
    }
});

// Function to send email verification
let sendMail = () => {
    sendEmailVerification(auth.currentUser)
        .then(() => {
            alert("Email verification sent");
        })
        .catch((error) => {
            console.log("Error sending verification email:", error.message);
        });
};

// Add event listener to Email Verification button
let verification = document.getElementById("verify");
if (verification) {
    verification.addEventListener("click", sendMail);
}

// Sign Out function
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

// Google Sign-In function
const googleSignin = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            alert("User signed in successfully");
            window.location.href = "main.html"; // Redirect to your main page
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error("Error during Google sign-in:", error);
            alert(`You are not Registered ${errorMessage}`);
        });
};

// Add event listener for Google Sign-In button
const googleBtn = document.getElementById("google");
if (googleBtn) {
    googleBtn.addEventListener("click", googleSignin);
}
