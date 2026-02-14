import { db } from './firebase-config.js';
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

async function fetchProductsFromFirebase() {
    try {
        const q = query(collection(db, "products"), orderBy("id", "asc"));
        const querySnapshot = await getDocs(q);
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push(doc.data());
        });

        if (products.length > 0) {
            console.log("🟢 Loaded " + products.length + " products from Firestore");
            window.allProducts = products;
            // Re-render components if needed
            if (typeof renderProducts === 'function') {
                const params = new URLSearchParams(window.location.search);
                const mainContainer = document.getElementById('dynamic-all-pro');
                if (mainContainer) renderProducts('dynamic-all-pro', null, params.get('cat'), params.get('search'));

                if (document.getElementById('dynamic-featured-pro')) renderProducts('dynamic-featured-pro', 8);
                if (document.getElementById('dynamic-new-pro')) renderProducts('dynamic-new-pro', 8);
            }
        } else {
            console.warn("⚠️ No products found in Firestore. Falling back to local generation.");
        }
    } catch (error) {
        console.error("🔴 Firestore Fetch Error:", error);
    }
}

// Initial fetch
fetchProductsFromFirebase();

// === Writing Data ===
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

async function saveProductToFirebase(productData) {
    try {
        const docRef = doc(db, "products", productData.id.toString());
        await setDoc(docRef, {
            ...productData,
            lastUpdated: new Date().toISOString()
        });
        console.log("🟢 Product saved to Firestore:", productData.id);

        // Refresh local state without reload
        const idx = window.allProducts.findIndex(p => p.id == productData.id);
        if (idx !== -1) {
            window.allProducts[idx] = productData;
        } else {
            window.allProducts.push(productData);
        }
    } catch (error) {
        console.error("🔴 Error saving product to Firestore:", error);
        throw error;
    }
}

// Export globally
window.fetchProductsFromFirebase = fetchProductsFromFirebase;
window.saveProductToFirebase = saveProductToFirebase;
