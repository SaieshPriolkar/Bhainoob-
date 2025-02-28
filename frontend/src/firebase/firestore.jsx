import { db } from "./config";
import { doc, setDoc, getDoc } from "firebase/firestore";

/**
 * Save user data to Firestore
 * @param {string} userId - Firebase Auth user ID
 * @param {object} userData - User's additional details
 */
export const saveUserData = async (userId, userData) => {
    try {
        await setDoc(doc(db, "users", userId), userData, { merge: true });
        console.log("User data saved successfully!");
    } catch (error) {
        console.error("Error saving user data:", error);
    }
};

/**
 * Get user data from Firestore
 * @param {string} userId - Firebase Auth user ID
 * @returns {Promise<object|null>}
 */
export const getUserData = async (userId) => {
    try {
        const userDoc = await getDoc(doc(db, "users", userId));
        return userDoc.exists() ? userDoc.data() : null;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};
