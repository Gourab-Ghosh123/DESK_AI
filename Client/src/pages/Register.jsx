import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight
} from "lucide-react";

import Logo from "../components/Logo";
import api from "../services/api";


const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleRegister = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            await api.post(
                "/auth/register",
                {
                    name,
                    email,
                    password
                }
            );


            navigate("/login");


        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
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


                {/* Form */}
                <div className="
                    p-8
                    md:p-12
                    flex
                    flex-col
                    justify-center
                ">

                    <div className="mb-8">
                        <Logo />
                    </div>


                    <div className="mb-8">

                        <p className="
                            text-sm
                            font-semibold
                            text-[#5d9992]
                            mb-2
                        ">
                            Get started
                        </p>

                        <h2 className="
                            text-3xl
                            font-bold
                            text-[#183f43]
                        ">
                            Create your account
                        </h2>

                        <p className="
                            mt-2
                            text-sm
                            text-[#78999b]
                        ">
                            Start managing support smarter.
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
                        onSubmit={handleRegister}
                        className="space-y-5"
                    >

                        {/* Name */}
                        <div>

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-[#365e61]
                                mb-2
                            ">
                                Full name
                            </label>

                            <div className="relative">

                                <User
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
                                    type="text"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    placeholder="Your name"
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
                                        outline-none
                                        focus:border-[#8fc2bc]
                                        focus:ring-4
                                        focus:ring-[#d9eeeb]
                                    "
                                />

                            </div>

                        </div>


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
                                    placeholder="Create a password"
                                    minLength={6}
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
                                ? "Creating account..."
                                : "Create Account"
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

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="
                                font-semibold
                                text-[#3d8985]
                                hover:text-[#18565b]
                            "
                        >
                            Sign in
                        </Link>

                    </p>

                </div>


                {/* Right visual */}
                <div className="
                    hidden
                    md:flex
                    relative
                    bg-[#d9eeeb]
                    p-12
                    flex-col
                    justify-center
                    overflow-hidden
                ">

                    <div className="relative z-10">

                        <div className="
                            w-20
                            h-20
                            rounded-3xl
                            bg-white/80
                            flex
                            items-center
                            justify-center
                            text-4xl
                            mb-7
                        ">
                            🤖
                        </div>


                        <h2 className="
                            text-4xl
                            font-bold
                            leading-tight
                            text-[#18565b]
                        ">
                            Every ticket
                            tells a story.
                        </h2>


                        <p className="
                            mt-5
                            text-[#5d8183]
                            leading-7
                            max-w-sm
                        ">
                            SupportAI uses intelligent ticket analysis
                            to help your team understand customers
                            and respond with confidence.
                        </p>

                    </div>


                    <div className="
                        absolute
                        -bottom-20
                        -right-20
                        w-72
                        h-72
                        rounded-full
                        bg-[#b9ded8]
                        opacity-60"
                    />

                </div>

            </div>

        </div>
    );
};


export default Register;