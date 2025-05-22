import React, { useContext, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const {
        createUser,
        updateUser,
        setUser,
        user,
        setBalance,
        logoutUser,
        loginWithGoogle,
    } = useContext(AuthContext);
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    if (user) {
        return navigate("/");
    }
    const handleRegister = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const url = e.target.url.value;
        const password = e.target.password.value;

        let err = "";
        if (password.length < 6)
            err = "Password must be at least 6 characters.";
        else if (!/[A-Z]/.test(password))
            err = "Password must contain at least one uppercase letter.";
        else if (!/[a-z]/.test(password))
            err = "Password must contain at least one lowercase letter.";
        if (err) {
            setPasswordError(err);
            toast.error(err);
            return;
        } else {
            setPasswordError("");
        }

        createUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateUser({ displayName: name, photoURL: url }).then(() => {
                    setUser({
                        ...user,
                        displayName: name,
                        photoURL: url,
                    });
                    setBalance(10000);
                    toast.success("Registration successful");
                    logoutUser();
                    navigate("/auth/login");
                });
            })
            .catch((error) => {
                toast.error(error.message);
                console.error(error.message);
            });
    };

    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then((result) => {
                setUser(result.user);
                toast.success("Login successful");
                setBalance(10000);
                navigate(location.state || "/");
            })
            .catch((error) => {
                toast.error(error.message);
                console.error(error);
            });
    };
    return (
        <div className="min-h-screen bg-base-200 pt-10">
            <div className="card bg-base-100 w-full max-w-sm mx-auto mt-10 shrink-0 shadow-2xl">
                <h2 className="text-center text-2xl font-bold mt-3">Sign Up</h2>
                <div className="card-body">
                    <form onSubmit={handleRegister} className="fieldset">
                        <label className="label">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="input"
                            placeholder="Your Name"
                        />
                        <label className="label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="input"
                            placeholder="Email"
                        />
                        <label className="label">Photo Url</label>
                        <input
                            type="text"
                            name="url"
                            className="input"
                            placeholder="Enter Photo Url"
                        />
                        <label className="label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="input"
                            placeholder="Password"
                        />
                        {passwordError && (
                            <p className="text-red-500">{passwordError}</p>
                        )}
                        <button className="btn btn-neutral mt-4">
                            Sign Up
                        </button>
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="btn btn-outline w-full mt-2 flex items-center justify-center"
                        >
                            <FcGoogle className="mr-2 text-xl" />
                            Sign Up with Google
                        </button>
                        <div>
                            <NavLink
                                to="/auth/login"
                                className="link link-hover underline"
                            >
                                Already Have an Account?
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
