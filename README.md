# Alina Collection 🛍️

Premium Fashion & Curated Style ecommerce platform built with Vanilla JS and Firebase.

## Features 🚀

- **Dynamic Product Rendering**: High-performance rendering from Firestore.
- **Admin Dashboard**: Inventory and user management.
- **Authentication**: Secure login/register via Firebase Auth.
- **Responsive Design**: Mobile-first architecture (WCAG 2.2 AA compliant).
- **Cart & Checkout**: Seamless shopping experience with multi-currency support.

## Setup & Local Development 🛠️

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd your-collection
   ```

2. **Configure Firebase**:
   - Copy `firebase-config.js` and fill in your project credentials.
   - Alternatively, use the template placeholders in the existing file if you're deploying.

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run Locally**:
   ```bash
   npm run dev
   ```

## Security & Deployment 🔐

- **Secrets**: API keys and service accounts are ignored via `.gitignore`.
- **Firestore Rules**: Strict rules enforced (see `firestore.rules`).
- **Admin Access**: Hardcoded sovereign admin access for initial setup (check `auth.js`).

## Tech Stack 💻

- **Frontend**: Vanilla HTML5, CSS3 (Modern Features), ESM JavaScript.
- **Backend**: Firebase (Auth, Firestore, Storage).
- **Tooling**: Live-Server for development.

---
*Crafted for Elegance.*
