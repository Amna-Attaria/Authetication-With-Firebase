// Import Firebase methods
import { 
    auth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    sendEmailVerification, 
    signOut, 
    signInWithPopup, 
    GoogleAuthProvider,
    db,  
    addDoc, 
    collection,getDocs , doc, setDoc,updateDoc,serverTimestamp,
    arrayUnion, arrayRemove, deleteDoc
} from "./firebase.js";

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();

// Function to validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Function to validate password strength
const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
};

let signUp = async () => {
    let name = document.getElementById("name").value;
    let number = document.getElementById("number").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let userData = { name, number, email, password };
    console.log(userData);

    // Validate email and password
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!isValidPassword(password)) {
        alert("Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one number.");
        return;
    }

    // try {
    //     // Create user in Firebase Auth
    //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //     const user = userCredential.user;

    //     // Add user data to Firestore
    //     const docRef = await addDoc(collection(db, "users"), {
    //         ...userData,
    //         uId: user.uid  // Fixed from `user.uId` to `user.uid`
    //     });

    //     console.log("Document written with ID:", docRef.id);
    //     alert("Signup Successful");
    //     // window.location.href = "signin.html"; // Redirect to sign-in page after successful sign-up
    // } catch (error) {
    //     console.error("Error:", error.message);
    //     alert("Error: " + error.message);
    // }

//  -----------------set doc---------
try {
    // Sign up the user and get the user object
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const docRef = doc(db, "userdata", user.uid); // Now `user` is defined
    await setDoc(docRef, {
        ...userData,
        uId: user.uid
    });

    console.log("Document written with ID:", docRef.id);
    alert("Signup Successful");
    window.location.href = "signin.html"; 
} catch (error) {
    console.error("Error:", error.message);
    alert("Error: " + error.message);
}



};

// Add event listener for Sign Up button
let sign_Up = document.getElementById("sign_Up");
if (sign_Up) {
    sign_Up.addEventListener("click", signUp);
}

// Sign In function
let sign_In = (event) => {
    event.preventDefault(); // Prevent form submission if using form elements

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Signed in successfully");
            window.location.href = "main.html";
        })
        .catch((error) => {
            console.error("Error:", error.message);
            alert("Error: " + error.message);
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
    if (auth.currentUser) {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert("Email verification sent");
            })
            .catch((error) => {
                console.error("Error sending verification email:", error.message);
            });
    } else {
        alert("No user is currently signed in.");
    }
};

// Add event listener to Email Verification button
let verification = document.getElementById("verify");
if (verification) {
    verification.addEventListener("click", sendMail);
}

// Sign Out function
let signout = () => {
    signOut(auth)
        .then(() => {
            console.log("Sign-out successful.");
            window.location.href = "signin.html"; // Redirect to sign-in page after successful sign-out
        })
        .catch((error) => {
            console.error("Error during sign-out:", error.message);
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
let getData = async()=>
{
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
}
getData()
const Update = document.getElementById("update");
if (googleBtn) {
    Update.addEventListener("click", UpdateProfile);
}
let UpdateProfile = async () => {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;

    if (auth.currentUser) {
        let id = auth.currentUser.uid;

        try {
            const washingtonRef = doc(db, "userdata", id);
            await updateDoc(washingtonRef, { name,
                 phone, 
                 password,
                 timestamp: serverTimestamp(),
                //  subject:["Eng" , "Urdu"],
                //  subject:arrayUnion("Math"),
                //  subject:arrayRemove("Eng")
                }
                );
            alert("Updated");
        } catch (e) {
            console.error("Error updating document:", e);
        }
    } else {
        alert("You must be signed in to update your profile.");
    }
};
// Attach event listener for update button
let update = document.getElementById("update");
if (update) {
    update.addEventListener("click", UpdateProfile); // Attach event listener once
}

let deleteAccount=async()=>
{
  let id = auth.currentUser.uid
  console.log(id);
  await deleteDoc(doc(db, "userdata", id));
  alert("Delete Successfully")
}

let deleteButton = document.getElementById("delete");
if (deleteButton) {
    deleteButton.addEventListener("click", deleteAccount);
}
