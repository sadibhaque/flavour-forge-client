import React, { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.init";


const auth = getAuth(app);
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [balance, setBalance] = useState(() => {
        const localBalance = localStorage.getItem("balance");
        return localBalance ? JSON.parse(localBalance) : 100001;
    });

    useEffect(() => {
        localStorage.setItem("balance", JSON.stringify(balance));
    }, [balance]);

    const logoutUser = () => {
        return signOut(auth).then(() => {
            localStorage.setItem("paidBills", JSON.stringify([]));
        });
    };

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const googleProvider = new GoogleAuthProvider();
    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => {
            unsubscribe;
        };
    }, []);

    const authData = {
        user,
        setUser,
        createUser,
        loginUser,
        logoutUser,
        loading,
        setLoading,
        updateUser,
        loginWithGoogle,
        balance,
        setBalance,
    };
    return (
        <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
