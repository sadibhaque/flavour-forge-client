import React, { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";

import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../provider/AuthProvider';

const Login = () => {
    const { loginUser, loginWithGoogle, setUser, setBalance } =
        useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    console.log(location.state);

    const handleLogin = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        loginUser(email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                setBalance(10000);
                navigate(`${location.state ? location.state : "/"}`);
                toast.success("Login successful");
            })
            .catch((error) => {
                toast.error(error.message);
                console.log(error.message);
            });
    };
    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then((result) => {
                setUser(result.user);
                toast.success("Login successful");
                setBalance(10000);
                navigate(`${location.state ? location.state : "/"}`);
            })
            .catch((error) => {
                toast.error(error.message);
                console.error(error);
            });
    };
    return (
        <div className="min-h-screen bg-base-200 pt-10">
            <div className="card bg-base-100 w-full max-w-sm mx-auto mt-10 shrink-0 shadow-2xl">
                <h2 className="text-center text-2xl font-bold mt-3">Login</h2>
                <div className="card-body">
                    <form onSubmit={handleLogin} className="fieldset">
                        <label className="label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="input"
                            placeholder="Email"
                        />
                        <label className="label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="input"
                            placeholder="Password"
                        />
                        <div>
                            <a className="link link-hover">Forgot password?</a>
                        </div>
                        <button className="btn btn-neutral mt-4">Login</button>
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="btn btn-outline w-full mt-2 flex items-center justify-center"
                        >
                            <FcGoogle className="mr-2 text-xl" />
                            Login with Google
                        </button>
                        <div>
                            <NavLink
                                to="/auth/register"
                                className="link link-hover underline"
                            >
                                Create an Account ?
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
