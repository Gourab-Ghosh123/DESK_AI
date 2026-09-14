import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

import Logo from "../components/Logo";
import api from "../services/api";


const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );


            // Save JWT
            localStorage.setItem(
                "token",
                response.data.token
            );


            // Save user information
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );


            // Go to dashboard
            navigate("/");


        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="
            min-h-screen
            bg-[#eaf5f3]
            flex
            items-center
            justify-center
            p-6
        ">


            {/* Main card */}
            <div className="
                w-full
                max-w-5xl
                bg-white
                rounded-[32px]
                border
                border-[#d9ebe8]
                shadow-[0_20px_60px_rgba(24,86,91,0.08)]
                overflow-hidden
                grid
                md:grid-cols-2
            ">


                {/* Left visual section */}
                <div className="
                    hidden
                    md:flex
                    relative
                    bg-[#d9eeeb]
                    p-12
                    flex-col
                    justify-between
                    overflow-hidden
                ">

                    <Logo />


                    <div className="relative z-10">

                        <div className="
                            w-20
                            h-20
                            rounded-3xl
                            bg-white/80
                            flex
                            items-center
                            justify-center
                            mb-7
                        ">

                            <span className="text-4xl">
                                ✨
                            </span>

                        </div>


                        <h2 className="
                            text-4xl
                            font-bold
                            leading-tight
                            text-[#18565b]
                        ">
                            Support your
                            customers smarter.
                        </h2>


                        <p className="
                            mt-5
                            max-w-sm
                            text-[#5d8183]
                            leading-7
                        ">
                            Manage support tickets, understand
                            customer sentiment and let AI help
                            your support team respond faster.
                        </p>

                    </div>


                    {/* Decorative circles */}
                    <div className="
                        absolute
                        -bottom-20
                        -left-10
                        w-64
                        h-64
                        rounded-full
                        bg-[#b9ded8]
                        opacity-60
                    " />

                    <div className="
                        absolute
                        top-10
                        right-[-70px]
                        w-48
                        h-48
                        rounded-full
                        bg-white/40
                    " />

                </div>


                {/* Login section */}
                <div className="
                    p-8
                    md:p-12
                    flex
                    flex-col
                    justify-center
                ">

                    <div className="md:hidden mb-10">
                        <Logo />
                    </div>


                    <div className="mb-8">

                        <p className="
                            text-sm
                            font-semibold
                            text-[#5d9992]
                            mb-2
                        ">
                            Welcome back
                        </p>

                        <h2 className="
                            text-3xl
                            font-bold
                            text-[#183f43]
                        ">
                            Sign in to SupportAI
                        </h2>

                        <p className="
                            mt-2
                            text-sm
                            text-[#78999b]
                        ">
                            Access your support workspace.
                        </p>

                    </div>


                    {error && (

                        <div className="
                            mb-5
                            rounded-2xl
                            bg-[#ffe7e2]
                            border
                            border-[#f5c7c0]
                            px-4
                            py-3
                            text-sm
                            text-[#a65d55]
                        ">
                            {error}
                        </div>

                    )}


                    <form
                        onSubmit={handleLogin}
                        className="space-y-5"
                    >

                        {/* Email */}
                        <div>

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-[#365e61]
                                mb-2
                            ">
                                Email address
                            </label>

                            <div className="relative">

                                <Mail
                                    size={18}
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-[#8aa8a9]
                                    "
                                />

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="you@example.com"
                                    required
                                    className="
                                        w-full
                                        rounded-2xl
                                        border
                                        border-[#d9ebe8]
                                        bg-[#f7fbfa]
                                        py-3.5
                                        pl-11
                                        pr-4
                                        text-sm
                                        text-[#183f43]
                                        outline-none
                                        focus:border-[#8fc2bc]
                                        focus:ring-4
                                        focus:ring-[#d9eeeb]
                                    "
                                />

                            </div>

                        </div>


                        {/* Password */}
                        <div>

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-[#365e61]
                                mb-2
                            ">
                                Password
                            </label>

                            <div className="relative">

                                <Lock
                                    size={18}
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-[#8aa8a9]
                                    "
                                />

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    required
                                    className="
                                        w-full
                                        rounded-2xl
                                        border
                                        border-[#d9ebe8]
                                        bg-[#f7fbfa]
                                        py-3.5
                                        pl-11
                                        pr-12
                                        text-sm
                                        text-[#183f43]
                                        outline-none
                                        focus:border-[#8fc2bc]
                                        focus:ring-4
                                        focus:ring-[#d9eeeb]
                                    "
                                />


                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="
                                        absolute
                                        right-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-[#78999b]
                                    "
                                >

                                    {showPassword
                                        ? <EyeOff size={18} />
                                        : <Eye size={18} />
                                    }

                                </button>

                            </div>

                        </div>


                        {/* Login button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full
                                rounded-2xl
                                bg-[#18565b]
                                hover:bg-[#124a4f]
                                disabled:opacity-60
                                text-white
                                py-3.5
                                font-semibold
                                flex
                                items-center
                                justify-center
                                gap-2
                                transition
                            "
                        >

                            {loading
                                ? "Signing in..."
                                : "Sign In"
                            }

                            {!loading && (
                                <ArrowRight size={18} />
                            )}

                        </button>

                    </form>


                    <p className="
                        text-center
                        text-sm
                        text-[#78999b]
                        mt-7
                    ">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="
                                font-semibold
                                text-[#3d8985]
                                hover:text-[#18565b]
                            "
                        >
                            Create one
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
};


export default Login;