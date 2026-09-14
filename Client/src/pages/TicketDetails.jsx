import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    ArrowLeft,
    Sparkles,
    Copy,
    Check,
    UserRound,
    CircleDot,
    Save
} from "lucide-react";

import api from "../services/api";


const TicketDetails = () => {

    const user = JSON.parse(
    localStorage.getItem("user")
    );

    const { id } = useParams();
    const navigate = useNavigate();


    const [ticket, setTicket] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [generating, setGenerating] = useState(false);
    const [aiResponse, setAiResponse] = useState("");

    const [copied, setCopied] = useState(false);

    const [status, setStatus] = useState("");
    const [assignedTo, setAssignedTo] = useState("");

    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");

    const [agents, setAgents] = useState([]);


    const fetchAgents = async () => {

    try {

        const response = await api.get(
            "/auth/agents"
        );

        setAgents(response.data.agents);

    } catch (error) {

        console.error(
            "Failed to fetch agents:",
            error
        );

    }

};


    // ------------------------------------
    // Get ticket
    // ------------------------------------

    useEffect(() => {

        const fetchTicket = async () => {

            try {

                const response = await api.get(
                    `/tickets/${id}`
                );

                setTicket(response.data);

                // If an old AI response exists
                if (response.data.aiResponse) {
                    setAiResponse(
                        response.data.aiResponse
                    );
                }

                setTicket(response.data);

                setStatus(response.data.status);
                setAssignedTo(
                    response.data.assignedTo?._id || ""
                );

            } catch (error) {

                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load ticket"
                );

            } finally {

                setLoading(false);

            }
        };


        fetchTicket();

        if (
        user?.role === "agent" ||
        user?.role === "admin"
    ) {
        fetchAgents();
    }

    }, [id]);


    const updateTicket = async () => {

    try {

        setSaving(true);
        setSaveMessage("");

        await api.put(`/tickets/${ticket._id}`, {
            status,
            assignedTo: assignedTo || undefined
        });

        setSaveMessage(
            "Ticket updated successfully."
        );

        // Refresh ticket data
        const response = await api.get(
            `/tickets/${ticket._id}`
        );

        setTicket(response.data);

    } catch (error) {

        console.error(
            "Failed to update ticket:",
            error
        );

        setSaveMessage(
            "Failed to update ticket."
        );

    } finally {

        setSaving(false);

    }
};


    // ------------------------------------
    // Generate AI response
    // ------------------------------------

    const handleGenerateResponse = async () => {

        setGenerating(true);
        setError("");

        try {

            const response = await api.post(
                `/tickets/${id}/generate-response`
            );

            setAiResponse(
                response.data.response
            );

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to generate AI response"
            );

        } finally {

            setGenerating(false);

        }
    };


    // ------------------------------------
    // Copy AI response
    // ------------------------------------

    const handleCopy = async () => {

        await navigator.clipboard.writeText(
            aiResponse
        );

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);

    };


    // ------------------------------------
    // Loading
    // ------------------------------------

    if (loading) {

        return (
            <main className="p-8">

                <div className="
                    bg-white
                    rounded-3xl
                    border
                    border-[#d9ebe8]
                    p-10
                    text-center
                    text-[#78999b]
                ">
                    Loading ticket...
                </div>

            </main>
        );

    }


    // ------------------------------------
    // Error
    // ------------------------------------

    if (error && !ticket) {

        return (
            <main className="p-8">

                <button
                    onClick={() => navigate("/")}
                    className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-[#5d898b]
                        mb-6
                    "
                >
                    <ArrowLeft size={17} />
                    Back to Dashboard
                </button>


                <div className="
                    bg-[#ffe7e2]
                    border
                    border-[#f5c7c0]
                    rounded-3xl
                    p-6
                    text-[#a65d55]
                    flex
                    items-center
                    gap-3
                ">

                    <AlertCircle size={20} />

                    {error}

                </div>

            </main>
        );

    }


    const getPriorityStyle = () => {

        switch (ticket.priority) {

            case "Critical":
                return "bg-[#ffe1dd] text-[#a64f46]";

            case "High":
                return "bg-[#ffe8d5] text-[#a76532]";

            case "Medium":
                return "bg-[#f8edc9] text-[#8b7532]";

            default:
                return "bg-[#dff0ed] text-[#397773]";
        }
    };


    const getSentimentStyle = () => {

        switch (ticket.sentiment) {

            case "Negative":
                return "bg-[#ffe1dd] text-[#a64f46]";

            case "Positive":
                return "bg-[#dcefe7] text-[#397763]";

            default:
                return "bg-[#edf3f2] text-[#557779]";
        }
    };


    return (

        <main className="p-6 md:p-8 max-w-7xl">

            {/* -------------------------------- */}
            {/* Header */}
            {/* -------------------------------- */}

            <div className="mb-7">

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
                        transition
                    "
                >

                    <ArrowLeft size={17} />

                    Back to Dashboard

                </button>


                <div className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                ">

                    <div>

                        <div className="
                            flex
                            items-center
                            gap-3
                            mb-2
                        ">

                            <span className="
                                text-xs
                                font-semibold
                                text-[#7a999b]
                            ">
                                TICKET #{ticket._id.slice(-6).toUpperCase()}
                            </span>

                            <span className="
                                px-3
                                py-1
                                rounded-full
                                bg-[#dff0ed]
                                text-[#397773]
                                text-xs
                                font-semibold
                            ">
                                {ticket.status}
                            </span>

                        </div>


                        <h1 className="
                            text-3xl
                            font-bold
                            text-[#18565b]
                        ">
                            {ticket.title}
                        </h1>

                    </div>


                    <div className="
                        px-4
                        py-2.5
                        rounded-2xl
                        bg-white
                        border
                        border-[#d9ebe8]
                        text-sm
                        text-[#557779]
                        flex
                        items-center
                        gap-2
                    ">

                        <Clock3 size={16} />

                        {new Date(
                            ticket.createdAt
                        ).toLocaleDateString()}

                    </div>

                </div>

            </div>


            {/* Error while generating */}
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
                    flex
                    items-center
                    gap-2
                ">

                    <AlertCircle size={17} />

                    {error}

                </div>

            )}


            {/* -------------------------------- */}
            {/* Main grid */}
            {/* -------------------------------- */}

            <div className="
                grid
                grid-cols-1
                xl:grid-cols-[1.4fr_0.9fr]
                gap-6
            ">


                {/* ================================= */}
                {/* LEFT — CUSTOMER TICKET */}
                {/* ================================= */}

                <div className="space-y-6">


                    {/* Customer issue */}
                    <section className="
                        bg-white
                        rounded-3xl
                        border
                        border-[#d9ebe8]
                        p-7
                    ">

                        <div className="
                            flex
                            items-center
                            gap-3
                            mb-6
                        ">

                            <div className="
                                w-10
                                h-10
                                rounded-2xl
                                bg-[#d9eeeb]
                                flex
                                items-center
                                justify-center
                                text-[#397773]
                            ">

                                <User size={19} />

                            </div>


                            <div>

                                <h2 className="
                                    font-bold
                                    text-[#18565b]
                                ">
                                    Customer Issue
                                </h2>

                                <p className="
                                    text-xs
                                    text-[#8aa8a9]
                                    mt-0.5
                                ">
                                    Original support request
                                </p>

                            </div>

                        </div>


                        <div className="
                            rounded-2xl
                            bg-[#f7fbfa]
                            border
                            border-[#edf4f2]
                            p-6
                        ">

                            <p className="
                                text-sm
                                leading-7
                                text-[#365e61]
                                whitespace-pre-wrap
                            ">
                                {ticket.description}
                            </p>

                        </div>

                    </section>


                    {/* ================================= */}
                    {/* AI RESPONSE ASSISTANT */}
                    {/* ================================= */}

                    <section className="
                        bg-white
                        rounded-3xl
                        border
                        border-[#cfe6e2]
                        overflow-hidden
                    ">


                        {/* AI Header */}
                        <div className="
                            px-7
                            py-6
                            bg-[#dff0ed]
                            border-b
                            border-[#cfe6e2]
                            flex
                            flex-col
                            md:flex-row
                            md:items-center
                            md:justify-between
                            gap-4
                        ">

                            <div className="
                                flex
                                items-center
                                gap-4
                            ">

                                <div className="
                                    w-11
                                    h-11
                                    rounded-2xl
                                    bg-white
                                    flex
                                    items-center
                                    justify-center
                                    text-[#3d8985]
                                ">

                                    <Sparkles size={21} />

                                </div>


                                <div>

                                    <h2 className="
                                        font-bold
                                        text-[#18565b]
                                    ">
                                        AI Response Assistant
                                    </h2>

                                    <p className="
                                        text-xs
                                        text-[#638587]
                                        mt-1
                                    ">
                                        Generate a professional
                                        response draft
                                    </p>

                                </div>

                            </div>


                            <button
                                onClick={handleGenerateResponse}
                                disabled={generating}
                                className="
                                    rounded-2xl
                                    bg-[#18565b]
                                    hover:bg-[#124a4f]
                                    disabled:opacity-60
                                    text-white
                                    px-5
                                    py-3
                                    text-sm
                                    font-semibold
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    transition
                                "
                            >

                                <Sparkles size={16} />

                                {generating
                                    ? "Generating..."
                                    : "Generate Response"
                                }

                            </button>

                        </div>


                        {/* Response */}
                        <div className="p-7">

                            {!aiResponse ? (

                                <div className="
                                    border-2
                                    border-dashed
                                    border-[#d9ebe8]
                                    rounded-2xl
                                    py-12
                                    px-6
                                    text-center
                                ">

                                    <Sparkles
                                        size={28}
                                        className="
                                            mx-auto
                                            text-[#8fbcb7]
                                            mb-4
                                        "
                                    />

                                    <p className="
                                        text-sm
                                        font-medium
                                        text-[#557779]
                                    ">
                                        No AI response generated yet
                                    </p>

                                    <p className="
                                        text-xs
                                        text-[#8aa8a9]
                                        mt-2
                                    ">
                                        Click "Generate Response"
                                        to let AI draft a reply.
                                    </p>

                                </div>

                            ) : (

                                <>

                                    <div className="
                                        rounded-2xl
                                        bg-[#f7fbfa]
                                        border
                                        border-[#d9ebe8]
                                        p-6
                                    ">

                                        <p className="
                                            text-sm
                                            leading-7
                                            text-[#365e61]
                                            whitespace-pre-wrap
                                        ">
                                            {aiResponse}
                                        </p>

                                    </div>


                                    <div className="
                                        mt-4
                                        flex
                                        flex-wrap
                                        gap-3
                                    ">

                                        <button
                                            onClick={handleCopy}
                                            className="
                                                px-4
                                                py-2.5
                                                rounded-xl
                                                border
                                                border-[#d9ebe8]
                                                bg-white
                                                text-[#557779]
                                                text-sm
                                                font-medium
                                                flex
                                                items-center
                                                gap-2
                                                hover:bg-[#f4faf8]
                                            "
                                        >

                                            {copied
                                                ? <CheckCircle2 size={16} />
                                                : <Copy size={16} />
                                            }

                                            {copied
                                                ? "Copied"
                                                : "Copy Response"
                                            }

                                        </button>


                                        <button
                                            className="
                                                px-4
                                                py-2.5
                                                rounded-xl
                                                bg-[#18565b]
                                                text-white
                                                text-sm
                                                font-medium
                                                flex
                                                items-center
                                                gap-2
                                            "
                                        >

                                            <Send size={16} />

                                            Use Response

                                        </button>

                                    </div>


                                    <p className="
                                        mt-4
                                        text-xs
                                        text-[#8aa8a9]
                                    ">
                                        AI-generated drafts should be
                                        reviewed and edited by a support
                                        agent before being sent.
                                    </p>

                                </>

                            )}

                        </div>

                    </section>

                </div>


                {/* ================================= */}
                {/* RIGHT — AI ANALYSIS */}
                {/* ================================= */}

                <div className="space-y-6">


                    <section className="
                        bg-white
                        rounded-3xl
                        border
                        border-[#d9ebe8]
                        p-7
                    ">

                        <div className="
                            flex
                            items-center
                            gap-3
                            mb-7
                        ">

                            <div className="
                                w-11
                                h-11
                                rounded-2xl
                                bg-[#d9eeeb]
                                flex
                                items-center
                                justify-center
                                text-[#3d8985]
                            ">

                                <Sparkles size={20} />

                            </div>


                            <div>

                                <h2 className="
                                    font-bold
                                    text-[#18565b]
                                ">
                                    AI Analysis
                                </h2>

                                <p className="
                                    text-xs
                                    text-[#8aa8a9]
                                    mt-1
                                ">
                                    Automatic ticket intelligence
                                </p>

                            </div>

                        </div>


                        {/* Category */}
                        <div className="
                            pb-5
                            mb-5
                            border-b
                            border-[#edf4f2]
                        ">

                            <p className="
                                text-xs
                                font-medium
                                text-[#8aa8a9]
                                mb-2
                            ">
                                CATEGORY
                            </p>

                            <p className="
                                font-semibold
                                text-[#365e61]
                            ">
                                {ticket.category}
                            </p>

                        </div>


                        {/* Priority */}
                        <div className="
                            pb-5
                            mb-5
                            border-b
                            border-[#edf4f2]
                        ">

                            <p className="
                                text-xs
                                font-medium
                                text-[#8aa8a9]
                                mb-2
                            ">
                                PRIORITY
                            </p>

                            <span className={`
                                inline-flex
                                px-3
                                py-1.5
                                rounded-xl
                                text-xs
                                font-bold
                                ${getPriorityStyle()}
                            `}>
                                {ticket.priority}
                            </span>

                        </div>


                        {/* Sentiment */}
                        <div className="
                            pb-5
                            mb-5
                            border-b
                            border-[#edf4f2]
                        ">

                            <p className="
                                text-xs
                                font-medium
                                text-[#8aa8a9]
                                mb-2
                            ">
                                CUSTOMER SENTIMENT
                            </p>

                            <span className={`
                                inline-flex
                                px-3
                                py-1.5
                                rounded-xl
                                text-xs
                                font-bold
                                ${getSentimentStyle()}
                            `}>
                                {ticket.sentiment}
                            </span>

                        </div>


                        {/* Summary */}
                        <div>

                            <p className="
                                text-xs
                                font-medium
                                text-[#8aa8a9]
                                mb-3
                            ">
                                AI SUMMARY
                            </p>

                            <div className="
                                rounded-2xl
                                bg-[#f7fbfa]
                                p-5
                                text-sm
                                leading-6
                                text-[#557779]
                            ">

                                {ticket.summary ||
                                    "AI summary is not available yet."
                                }

                            </div>

                        </div>

                    </section>


                    {/* Ticket metadata */}

                    <section className="
                        bg-[#d9eeeb]
                        rounded-3xl
                        p-6
                    ">

                        <p className="
                            text-xs
                            font-semibold
                            text-[#56817f]
                            mb-4
                        ">
                            TICKET INFORMATION
                        </p>


                        <div className="space-y-3">

                            <div className="
                                flex
                                justify-between
                                gap-4
                                text-sm
                            ">

                                <span className="text-[#6b898b]">
                                    Status
                                </span>

                                <span className="
                                    font-semibold
                                    text-[#18565b]
                                ">
                                    {ticket.status}
                                </span>

                            </div>


                            <div className="
                                flex
                                justify-between
                                gap-4
                                text-sm
                            ">

                                <span className="text-[#6b898b]">
                                    Created
                                </span>

                                <span className="
                                    font-semibold
                                    text-[#18565b]
                                ">
                                    {new Date(
                                        ticket.createdAt
                                    ).toLocaleDateString()}
                                </span>

                            </div>


                            <div className="
                                flex
                                justify-between
                                gap-4
                                text-sm
                            ">

                                <span className="text-[#6b898b]">
                                    Last updated
                                </span>

                                <span className="
                                    font-semibold
                                    text-[#18565b]
                                ">
                                    {new Date(
                                        ticket.updatedAt
                                    ).toLocaleDateString()}
                                </span>

                            </div>

                        </div>

                    </section>

                    {/* AGENT CONTROLS */}

{(user?.role === "agent" ||
    user?.role === "admin") && (

    <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

        <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d9eeeb]">

                <UserRound
                    size={21}
                    className="text-[#18565b]"
                />

            </div>

            <div>

                <h2 className="text-xl font-bold text-[#18565b]">
                    Agent Controls
                </h2>

                <p className="text-sm text-[#78999b]">
                    Manage ticket assignment and status
                </p>

            </div>

        </div>


        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* STATUS */}

            <div>

                <label className="mb-2 block text-sm font-semibold text-[#18565b]">
                    Ticket Status
                </label>

                <div className="relative">

                    <CircleDot
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78999b]"
                    />

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                        className="w-full appearance-none rounded-2xl border border-[#dcebea] bg-[#f7fbfa] px-10 py-3 text-sm text-[#18565b] outline-none focus:border-[#18565b]"
                    >

                        <option value="Open">
                            Open
                        </option>

                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="Resolved">
                            Resolved
                        </option>

                        <option value="Closed">
                            Closed
                        </option>

                    </select>

                </div>

            </div>


            {/* ASSIGNED AGENT */}

            <div>

                <label className="mb-2 block text-sm font-semibold text-[#18565b]">
                    Assigned Agent
                </label>

                <div className="relative">

                    <UserRound
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78999b]"
                    />

                    <select
                        value={assignedTo}
                        onChange={(e) =>
                            setAssignedTo(e.target.value)
                        }
                        className="w-full appearance-none rounded-2xl border border-[#dcebea] bg-[#f7fbfa] px-10 py-3 text-sm text-[#18565b] outline-none focus:border-[#18565b]"
                    >

                        <option value="">
                            Unassigned
                        </option>

                        {/* We'll populate real agents next */}

                        {agents.map((agent) => (

                            <option
                                key={agent._id}
                                value={agent._id}
                            >
                                {agent.name} ({agent.email})
                            </option>

                        ))}

                    </select>

                </div>

            </div>

        </div>


        <div className="mt-5 flex items-center gap-4">

            <button
                onClick={updateTicket}
                disabled={saving}
                className="flex items-center gap-2 rounded-2xl bg-[#18565b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#164f54] disabled:cursor-not-allowed disabled:opacity-60"
            >

                <Save size={17} />

                {saving
                    ? "Saving..."
                    : "Save Changes"}

            </button>


            {saveMessage && (

                <p className="text-sm font-medium text-[#78999b]">
                    {saveMessage}
                </p>

            )}

        </div>

    </div>

)}

                </div>

            </div>

        </main>
    );
};


export default TicketDetails;