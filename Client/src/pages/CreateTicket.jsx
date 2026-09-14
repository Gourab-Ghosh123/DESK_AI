import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Send,
    Sparkles
} from "lucide-react";

import api from "../services/api";


const CreateTicket = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            await api.post(
                "/tickets",
                {
                    title,
                    description
                }
            );


            navigate("/");


        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to create ticket"
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <main className="p-8 max-w-5xl">

            {/* Header */}
            <div className="mb-8">

                <button
                    onClick={() => navigate("/")}
                    className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-[#5d898b]
                        hover:text-[#18565b]
                        mb-5
                    "
                >

                    <ArrowLeft size={17} />

                    Back to Dashboard

                </button>


                <h2 className="
                    text-3xl
                    font-bold
                    text-[#18565b]
                ">
                    Create a Support Ticket
                </h2>


                <p className="
                    mt-2
                    text-[#78999b]
                ">
                    Tell us what you're experiencing and our
                    support team will help you.
                </p>

            </div>


            {/* Form */}
            <div className="
                bg-white
                rounded-3xl
                border
                border-[#d9ebe8]
                p-8
            ">


                {/* AI notice */}
                <div className="
                    mb-7
                    flex
                    items-start
                    gap-4
                    rounded-2xl
                    bg-[#f0f8f6]
                    border
                    border-[#d9ebe8]
                    p-5
                ">

                    <div className="
                        w-11
                        h-11
                        shrink-0
                        rounded-2xl
                        bg-[#d9eeeb]
                        flex
                        items-center
                        justify-center
                    ">

                        <Sparkles
                            size={20}
                            className="text-[#3d8985]"
                        />

                    </div>


                    <div>

                        <h3 className="
                            font-semibold
                            text-[#18565b]
                        ">
                            AI-powered ticket analysis
                        </h3>

                        <p className="
                            mt-1
                            text-sm
                            text-[#6b898b]
                            leading-6
                        ">
                            After you submit this ticket, SupportAI
                            will automatically analyze its category,
                            priority, sentiment and generate a summary.
                        </p>

                    </div>

                </div>


                {error && (

                    <div className="
                        mb-6
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
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* Title */}
                    <div>

                        <label className="
                            block
                            text-sm
                            font-semibold
                            text-[#365e61]
                            mb-2
                        ">
                            Ticket title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            placeholder="Example: Payment deducted but order failed"
                            required
                            maxLength={200}
                            className="
                                w-full
                                rounded-2xl
                                border
                                border-[#d9ebe8]
                                bg-[#f8fcfb]
                                px-5
                                py-4
                                text-sm
                                text-[#183f43]
                                outline-none
                                focus:border-[#8fc2bc]
                                focus:ring-4
                                focus:ring-[#d9eeeb]
                            "
                        />

                    </div>


                    {/* Description */}
                    <div>

                        <label className="
                            block
                            text-sm
                            font-semibold
                            text-[#365e61]
                            mb-2
                        ">
                            Describe your issue
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            placeholder="Please explain what happened..."
                            required
                            maxLength={5000}
                            rows={8}
                            className="
                                w-full
                                resize-none
                                rounded-2xl
                                border
                                border-[#d9ebe8]
                                bg-[#f8fcfb]
                                px-5
                                py-4
                                text-sm
                                text-[#183f43]
                                outline-none
                                focus:border-[#8fc2bc]
                                focus:ring-4
                                focus:ring-[#d9eeeb]
                            "
                        />

                        <p className="
                            mt-2
                            text-xs
                            text-[#8aa8a9]
                        ">
                            {description.length}/5000 characters
                        </p>

                    </div>


                    {/* Submit */}
                    <div className="flex justify-end">

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                px-7
                                py-3.5
                                rounded-2xl
                                bg-[#18565b]
                                hover:bg-[#124a4f]
                                disabled:opacity-60
                                text-white
                                font-semibold
                                flex
                                items-center
                                gap-2
                                transition
                            "
                        >

                            {loading
                                ? "Creating ticket..."
                                : "Submit Ticket"
                            }

                            {!loading && (
                                <Send size={17} />
                            )}

                        </button>

                    </div>

                </form>

            </div>

        </main>
    );
};


export default CreateTicket;