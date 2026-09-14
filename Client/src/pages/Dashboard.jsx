import { useEffect, useState } from "react";

import {
    Ticket,
    Clock3,
    CheckCircle2,
    Sparkles,
    ArrowUpRight
} from "lucide-react";

import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const totalTickets = tickets.length;

        const openTickets = tickets.filter(
            (ticket) => ticket.status === "Open"
        ).length;

        const resolvedTickets = tickets.filter(
            (ticket) => ticket.status === "Resolved"
        ).length;

    useEffect(() => {

    const fetchTickets = async () => {

        try {

            const response = await api.get("/tickets");

            setTickets(response.data.tickets);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to load tickets"
            );

        } finally {

            setLoading(false);

        }
    };


    fetchTickets();

}, []);

    return (
        <main className="p-8">

            {/* Greeting */}
            <div className="mb-8">

                <div className="flex items-center justify-between">

                    <div>

                        <h2 className="text-3xl font-bold text-[#18565b]">
                            Good Morning, Customer! ✨
                        </h2>

                        <p className="mt-2 text-[#6b898b]">
                            Here's what's happening with your support tickets today.
                        </p>

                    </div>


                    <div className="text-7xl opacity-80">
                        🐋
                    </div>

                </div>

            </div>


            {/* Stats */}
            <div className="grid grid-cols-4 gap-5 mb-7">

                <StatCard
                    icon={<Ticket size={21} />}
                    label="Total Tickets"
                    value={totalTickets}
                    color="mint"
                />

                <StatCard
                    icon={<Clock3 size={21} />}
                    label="Open Tickets"
                    value={openTickets}
                    color="peach"
                />

                <StatCard
                    icon={<CheckCircle2 size={21} />}
                    label="Resolved Tickets"
                    value={resolvedTickets}
                    color="blue"
                />

                <StatCard
                    icon={<Clock3 size={21} />}
                    label="Avg. Resolution Time"
                    value="4.2h"
                    color="yellow"
                />

            </div>


            {/* Main grid */}
            <div className="grid grid-cols-[1fr_350px] gap-6">


                {/* Tickets */}
                <section className="bg-white rounded-3xl border border-[#d9ebe8] p-6">

                    <div className="flex items-center justify-between mb-6">

                        <h3 className="text-lg font-bold text-[#18565b]">
                            Your Recent Tickets
                        </h3>

                        <button
                        onClick={() => navigate("/my-tickets")}
                         className="text-sm text-[#4f9291] font-medium flex items-center gap-1">
                            View All
                            
                            <ArrowUpRight size={15} />
                            
                        </button>

                    </div>

                    {loading && (
                        <div className="py-10 text-center text-[#78999b]">
                            Loading your tickets...
                        </div>
                    )}

                    {error && (
                        <div className="
                            mb-5
                            rounded-2xl
                            bg-[#ffe7e2]
                            px-4
                            py-3
                            text-sm
                            text-[#a65d55]
                        ">
                            {error}
                        </div>
                    )}

                    <div className="overflow-hidden">

                        <table className="w-full">

                            <thead>

                                <tr className="text-left text-xs text-[#7b999b] border-b border-[#e5f0ee]">

                                    <th className="pb-4">ID</th>
                                    <th className="pb-4">Title</th>
                                    <th className="pb-4">Category</th>
                                    <th className="pb-4">Priority</th>
                                    <th className="pb-4">Status</th>

                                </tr>

                            </thead>


                            <tbody>

                                {!loading && tickets.length === 0 ? (

    <tr>
        <td
            colSpan="5"
            className="
                py-12
                text-center
                text-sm
                text-[#78999b]
            "
        >
            No tickets yet. Create your first ticket!
        </td>
    </tr>

) : (

    tickets.map((ticket) => (

       <tr
    key={ticket._id}
    onClick={() => navigate(`/tickets/${ticket._id}`)}
    className="
        border-b
        border-[#edf4f2]
        last:border-none
        cursor-pointer
        hover:bg-[#f7fbfa]
        transition
    "
>

            <td className="
                py-5
                text-xs
                font-semibold
                text-[#365e61]
            ">
                #{ticket._id.slice(-5).toUpperCase()}
            </td>


            <td className="
                py-5
                text-sm
                text-[#244e52]
            ">
                {ticket.title}
            </td>


            <td className="py-5">

                <Badge
                    text={ticket.category}
                    type="category"
                />

            </td>


            <td className="py-5">

                <Badge
                    text={ticket.priority}
                    type="priority"
                />

            </td>


            <td className="py-5">

                <Badge
                    text={ticket.status}
                    type="status"
                />

            </td>

        </tr>

    ))

)}

                            </tbody>

                        </table>

                    </div>

                </section>


                {/* AI Assistant */}
                <section className="bg-white rounded-3xl border border-[#d9ebe8] p-6">

                    <div className="flex items-center gap-4 mb-5">

                        <div className="w-14 h-14 rounded-2xl bg-[#d9eeeb] flex items-center justify-center">
                            <Sparkles
                                size={26}
                                className="text-[#3d8b87]"
                            />
                        </div>

                        <div>

                            <h3 className="font-bold text-lg text-[#18565b]">
                                AI Assistant
                            </h3>

                            <p className="text-sm text-[#78999b]">
                                Smarter ticket insights
                            </p>

                        </div>

                    </div>


                    <p className="text-sm leading-6 text-[#5f8082] mb-6">
                        Get AI-powered summaries, ticket insights,
                        sentiment analysis and response suggestions.
                    </p>


                    <button className="
                        w-full
                        bg-[#d9eeeb]
                        hover:bg-[#cce7e3]
                        text-[#18565b]
                        rounded-2xl
                        py-3
                        font-semibold
                        flex
                        items-center
                        justify-center
                        gap-2
                        transition
                    ">

                        <Sparkles size={18} />

                        Open AI Assistant

                    </button>


                    <div className="mt-5 rounded-2xl bg-[#f2f9f8] p-4">

                        <p className="text-xs text-[#7b999b] mb-2">
                            AI Insight
                        </p>

                        <p className="text-sm text-[#365e61] leading-5">
                            Payment issues are currently the most common
                            category in your tickets.
                        </p>

                    </div>

                </section>

            </div>

        </main>
    );
};


/* -------------------------------- */
/* Stat Card */
/* -------------------------------- */

const StatCard = ({
    icon,
    label,
    value,
    color
}) => {

    const colors = {
        mint: "bg-[#d9eeeb]",
        peach: "bg-[#ffe1db]",
        blue: "bg-[#dceafa]",
        yellow: "bg-[#f9edc8]"
    };


    return (
        <div className="bg-white rounded-3xl border border-[#d9ebe8] p-5">

            <div className="flex items-center gap-4">

                <div
                    className={`
                        w-11
                        h-11
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        text-[#18565b]
                        ${colors[color]}
                    `}
                >
                    {icon}
                </div>

            </div>


            <p className="mt-5 text-sm text-[#6b898b]">
                {label}
            </p>

            <p className="mt-1 text-3xl font-bold text-[#183f43]">
                {value}
            </p>

            <p className="mt-3 text-xs text-[#5d9992]">
                ↑ 0% from last week
            </p>

        </div>
    );
};


/* -------------------------------- */
/* Badge */
/* -------------------------------- */

const Badge = ({
    text,
    type
}) => {

    let classes = "bg-[#edf5f4] text-[#477275]";


    if (type === "priority") {

        if (text === "High") {
            classes = "bg-[#ffe0da] text-[#c56b5e]";
        }

        if (text === "Medium") {
            classes = "bg-[#f9edc8] text-[#9a7a28]";
        }

        if (text === "Low") {
            classes = "bg-[#dff1e9] text-[#47806b]";
        }

    }


    if (type === "status") {

        if (text === "Open") {
            classes = "bg-[#dceafa] text-[#497aa8]";
        }

        if (text === "In Progress") {
            classes = "bg-[#e8ddf8] text-[#7658a5]";
        }

        if (text === "Resolved") {
            classes = "bg-[#dff1e9] text-[#47806b]";
        }

    }


    return (
        <span
            className={`
                inline-flex
                px-3
                py-1
                rounded-full
                text-[11px]
                font-semibold
                ${classes}
            `}
        >
            {text}
        </span>
    );
};


export default Dashboard;