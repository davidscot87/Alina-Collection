import { auth } from './firebase-config.js';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const googleProvider = new GoogleAuthProvider();

// Bridge for script.js legacy logout - Returns promise for proper async handling
window.firebaseSignOut = () => signOut(auth);

// Initialize UI handlers for login page
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const googleLoginBtn = document.getElementById('google-signin-btn');
    const googleSignupBtn = document.getElementById('google-signup-btn');

    const handleGoogleAuth = async (e) => {
        if (e) e.preventDefault();
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const isAdmin = user.email === "imserv67@gmail.com";
            const userData = {
                name: user.displayName || user.email.split('@')[0],
                email: user.email,
                role: isAdmin ? "admin" : "user",
                registeredDate: new Date().toISOString(),
                profilePic: user.photoURL || null
            };

            // Save to currentUser
            localStorage.setItem('currentUser', JSON.stringify(userData));
            
            // Add to users array if not exists
            let allUsers = JSON.parse(localStorage.getItem('users')) || [];
            const existingUserIndex = allUsers.findIndex(u => u.email === userData.email);
            if (existingUserIndex === -1) {
                allUsers.push(userData);
                localStorage.setItem('users', JSON.stringify(allUsers));
            } else {
                // Update existing user data
                allUsers[existingUserIndex] = { ...allUsers[existingUserIndex], ...userData };
                localStorage.setItem('users', JSON.stringify(allUsers));
            }
            
            if (typeof showToast === 'function') showToast('Welcome, ' + userData.name + '!');
            setTimeout(() => window.location.href = 'user-dashboard.html', 1000);
        } catch (error) {
            console.error("Google Auth Error:", error);
            if (typeof showToast === 'function') showToast('Google Auth failed: ' + error.message);
        }
    };

    if (googleLoginBtn) googleLoginBtn.addEventListener('click', handleGoogleAuth);
    if (googleSignupBtn) googleSignupBtn.addEventListener('click', handleGoogleAuth);

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-pass').value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                const isAdmin = email === "imserv67@gmail.com";
                const userData = { 
                    name: user.displayName || user.email.split('@')[0], 
                    email, 
                    role: isAdmin ? "admin" : "user",
                    profilePic: user.photoURL || null
                };

                // Save to currentUser
                localStorage.setItem('currentUser', JSON.stringify(userData));
                
                // Update users array
                let allUsers = JSON.parse(localStorage.getItem('users')) || [];
                const existingUserIndex = allUsers.findIndex(u => u.email === userData.email);
                if (existingUserIndex !== -1) {
                    // Update existing user data (preserve registeredDate)
                    allUsers[existingUserIndex] = { ...allUsers[existingUserIndex], ...userData };
                    localStorage.setItem('users', JSON.stringify(allUsers));
                }
                
                if (typeof showToast === 'function') showToast('Welcome back, ' + userData.name + '!');
                setTimeout(() => window.location.href = 'user-dashboard.html', 1000);
            } catch (error) {
                if (typeof showToast === 'function') showToast('Login failed: ' + error.message);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-pass').value;

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, { displayName: name });

                const isAdmin = email === "imserv67@gmail.com";
                const userData = { 
                    name, 
                    email, 
                    role: isAdmin ? "admin" : "user",
                    registeredDate: new Date().toISOString(),
                    profilePic: null,
                    phone: null
                };
                
                // Save to currentUser
                localStorage.setItem('currentUser', JSON.stringify(userData));
                
                // Add to users array
                let allUsers = JSON.parse(localStorage.getItem('users')) || [];
                const existingUserIndex = allUsers.findIndex(u => u.email === userData.email);
                if (existingUserIndex === -1) {
                    allUsers.push(userData);
                } else {
                    allUsers[existingUserIndex] = userData;
                }
                localStorage.setItem('users', JSON.stringify(allUsers));

                if (typeof showToast === 'function') showToast('Registration successful!');
                setTimeout(() => window.location.href = 'user-dashboard.html', 1500);
            } catch (error) {
                if (typeof showToast === 'function') showToast('Registration failed: ' + error.message);
            }
        });
    }
});

// Auth Persistence Listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        const isAdmin = user.email === "imserv67@gmail.com";
        const userData = {
            name: user.displayName || user.email.split('@')[0],
            email: user.email,
            role: isAdmin ? "admin" : "user",
            profilePic: user.photoURL || null
        };
        
        // Save to currentUser
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        // Update users array if user exists
        let allUsers = JSON.parse(localStorage.getItem('users')) || [];
        const existingUserIndex = allUsers.findIndex(u => u.email === userData.email);
        if (existingUserIndex !== -1) {
            // Update existing user (preserve registeredDate and other fields)
            allUsers[existingUserIndex] = { ...allUsers[existingUserIndex], ...userData };
            localStorage.setItem('users', JSON.stringify(allUsers));
        }
        
        if (typeof updateNavbarAuth === 'function') updateNavbarAuth();
    } else {
        localStorage.removeItem('currentUser');
        if (typeof updateNavbarAuth === 'function') updateNavbarAuth();
    }
});
