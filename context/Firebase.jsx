"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-hot-toast";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  addDoc,
  Timestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        profDetails();
      } else setUser(null);
    });
  }, []);

  const signUpUser = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;

      // Set the user's display name
      await updateProfile(user, {
        displayName: name,
      });

      return user; // Optional: return updated user object
    } catch (error) {
      throw error;
    }
  };
  const signInUser = async (email, password) => {
    return await signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const googleSignIn = async () => {
    return await signInWithPopup(firebaseAuth, googleProvider);
  };

  const profDetails = () => {
    try {
      if (user) {
        const createdAt = user.metadata.creationTime;
        const createdDate = new Date(createdAt).toDateString();

        const lastLogin = user.metadata.lastSignInTime;
        const lastLoginDate = new Date(lastLogin).toDateString();

        return {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: createdDate,
          lastLoggedIn: lastLoginDate,
        };
      }
      return null;
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      return null;
    }
  };

  const isLoggedIn = user ? true : false;

  const logOut = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const updateUserName = async (newName) => {
    try {
      await updateProfile(user, {
        displayName: newName,
      });
      console.log("User name updated successfully!");
    } catch (error) {
      console.error("Failed to update user name:", error.message);
    }
  };

  const profilePicUpload = async (file) => {
    try {
      if (!file) throw new Error("File missing");

      const allowedTypes = ["image/png", "image/jpeg"];
      if (!allowedTypes.includes(file.type)) {
        throw new Error("Only PNG and JPG images are allowed");
      }

      if (!user) throw new Error("User not authenticated");

      const storageRef = ref(
        storage,
        `profile_pictures/${user.uid}/${Date.now()}_${file.name}`
      );

      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      await updateProfile(user, {
        photoURL: downloadURL,
      });
      return true;
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(`Upload failed: ${error.message}`);
      return false;
    }
  };

  const createOrUpdateUserDetails = async (gender, phone) => {
    try {
      if (!user) throw new Error("User not authenticated");

      const userDocRef = doc(db, "userDetails", user.uid);

      await setDoc(
        userDocRef,
        {
          gender,
          phone,
          updatedAt: Timestamp.fromDate(new Date()),
        },
        { merge: true }
      );

      console.log("User details created/updated successfully!");
    } catch (error) {
      console.error("Error creating/updating user details:", error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const userDocRef = doc(db, "userDetails", user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No user details found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        isLoggedIn,
        signUpUser,
        signInUser,
        googleSignIn,
        profDetails,
        logOut,
        updateUserName,
        profilePicUpload,
        createOrUpdateUserDetails,
        fetchUserDetails,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

// Custom hook
export const useFirebase = () => useContext(FirebaseContext);
