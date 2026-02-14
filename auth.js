import { auth } from './firebase-config.js';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Initialize UI handlers for login page
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-pass').value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Sovereign Admin Access Check
                const role = email === "davidscot8786@gmail.com" ? "admin" : "user";
                const userData = { name: user.displayName || user.email.split('@')[0], email, role };

                localStorage.setItem('currentUser', JSON.stringify(userData));
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

                const userData = { name, email, role: 'user' };
                localStorage.setItem('currentUser', JSON.stringify(userData));

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
        const role = user.email === "davidscot8786@gmail.com" ? "admin" : "user";
        const userData = {
            name: user.displayName || user.email.split('@')[0],
            email: user.email,
            role
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        if (typeof updateNavbarAuth === 'function') updateNavbarAuth();
    } else {
        localStorage.removeItem('currentUser');
        if (typeof updateNavbarAuth === 'function') updateNavbarAuth();
    }
});
