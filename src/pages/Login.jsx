import React from 'react';

const Login = () => {
    return (
        <div className="min-h-screen">
            <div className="card bg-base-100 w-full max-w-sm mx-auto mt-20 shrink-0 shadow-2xl">
                <h2 className="text-center font-bold text-2xl mt-5">Login</h2>
                <div className="card-body">
                    <form className="fieldset">
                        <label className="label">Email</label>
                        <input
                            type="email"
                            className="input"
                            placeholder="Email"
                        />
                        <label className="label">Password</label>
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                        />
                        <div>
                            <a className="link link-hover">Forgot password?</a>
                        </div>
                        <button className="btn btn-primary mt-4">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;