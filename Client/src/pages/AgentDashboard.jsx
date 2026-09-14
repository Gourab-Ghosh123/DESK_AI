import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Ticket,
    Clock3,
    AlertTriangle,
    Frown,
    ArrowRight,
    Sparkles
} from "lucide-react";

import api from "../services/api";


const AgentDashboard = () => {

    const navigate = useNavigate();

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchTickets = async () => {

            try {

                const response = await api.get("/tickets");

                setTickets(response.data.tickets);

            } catch (error) {

                console.error(
                    "Failed to fetch tickets:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        fetchTickets();

    }, []);


    const totalTickets = tickets.length;

    const openTickets = tickets.filter(
        (ticket) =>
            ticket.status === "Open"
    ).length;

    const highPriorityTickets = tickets.filter(
        (ticket) =>
            ticket.priority === "High" ||
            ticket.priority === "Critical"
    ).length;

    const negativeTickets = tickets.filter(
        (ticket) =>
            ticket.sentiment === "Negative"
    ).length;


    const stats = [

        {
            title: "Total Tickets",
            value: totalTickets,
            icon: Ticket,
            bg: "bg-[#d9eeeb]"
        },

        {
            title: "Open Tickets",
            value: openTickets,
            icon: Clock3,
            bg: "bg-[#d9e9f7]"
        },

        {
            title: "High Priority",
            value: highPriorityTickets,
            icon: AlertTriangle,
            bg: "bg-[#ffe1dd]"
        },

        {
            title: "Negative Sentiment",
            value: negativeTickets,
            icon: Frown,
            bg: "bg-[#ffe8d5]"
        }

    ];


    return (

        <div className="min-h-screen bg-[#e8f4f2] p-6">

            {/* HEADER */}

            <div className="mb-8">

                <p className="text-sm font-medium text-[#78999b]">
                    SUPPORT WORKSPACE
                </p>

                <h1 className="mt-1 text-3xl font-bold text-[#18565b]">
                    Agent Dashboard
                </h1>

                <p className="mt-2 text-[#78999b]">
                    Manage customer issues and resolve tickets faster with AI assistance.
                </p>

            </div>


            {/* STATS */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                {stats.map((stat) => {

                    const Icon = stat.icon;

                    return (

                        <div
                            key={stat.title}
                            className="rounded-3xl bg-white p-5 shadow-sm"
                        >

                            <div className="flex items-center justify-between">

                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg}`}
                                >

                                    <Icon
                                        size={22}
                                        className="text-[#18565b]"
                                    />

                                </div>

                            </div>


                            <p className="mt-5 text-sm text-[#78999b]">
                                {stat.title}
                            </p>

                            <h2 className="mt-1 text-3xl font-bold text-[#18565b]">
                                {stat.value}
                            </h2>

                        </div>

                    );

                })}

            </div>


            {/* MAIN CONTENT */}

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">


                {/* TICKET QUEUE */}

                <div className="rounded-3xl bg-white p-6 shadow-sm lg:col-span-2">

                    <div className="flex items-center justify-between">

                        <div>

                            <h2 className="text-xl font-bold text-[#18565b]">
                                Ticket Queue
                            </h2>

                            <p className="mt-1 text-sm text-[#78999b]">
                                Recent customer issues
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                navigate("/my-tickets")
                            }
                            className="flex items-center gap-2 text-sm font-semibold text-[#18565b] hover:underline"
                        >

                            View all

                            <ArrowRight size={16} />

                        </button>

                    </div>


                    <div className="mt-6 space-y-3">

                        {loading ? (

                            <p className="py-8 text-center text-[#78999b]">
                                Loading tickets...
                            </p>

                        ) : tickets.length === 0 ? (

                            <div className="py-10 text-center">

                                <Ticket
                                    size={35}
                                    className="mx-auto text-[#9ab6b7]"
                                />

                                <p className="mt-3 text-[#78999b]">
                                    No tickets available
                                </p>

                            </div>

                        ) : (

                            tickets
                                .slice(0, 6)
                                .map((ticket) => (

                                    <div
                                        key={ticket._id}
                                        onClick={() =>
                                            navigate(
                                                `/tickets/${ticket._id}`
                                            )
                                        }
                                        className="cursor-pointer rounded-2xl border border-[#e4eeee] p-4 transition hover:bg-[#f7fbfa]"
                                    >

                                        <div className="flex items-center justify-between gap-4">

                                            <div className="min-w-0">

                                                <h3 className="truncate font-semibold text-[#18565b]">
                                                    {ticket.title}
                                                </h3>

                                                <p className="mt-1 truncate text-sm text-[#78999b]">
                                                    {ticket.description}
                                                </p>

                                            </div>


                                            <div className="flex shrink-0 items-center gap-2">

                                                <span className="rounded-full bg-[#f8edc9] px-3 py-1 text-xs font-semibold text-[#18565b]">
                                                    {ticket.priority}
                                                </span>

                                                <span className="hidden rounded-full bg-[#d9eeeb] px-3 py-1 text-xs font-semibold text-[#18565b] sm:block">
                                                    {ticket.status}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                ))

                        )}

                    </div>

                </div>


                {/* AI INSIGHTS */}

                <div className="rounded-3xl bg-[#18565b] p-6 text-white">

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">

                            <Sparkles size={22} />

                        </div>

                        <div>

                            <h2 className="font-bold">
                                AI Insights
                            </h2>

                            <p className="text-sm text-[#c5dfdc]">
                                Ticket intelligence
                            </p>

                        </div>

                    </div>


                    <div className="mt-7 space-y-5">

                        <div>

                            <p className="text-sm text-[#c5dfdc]">
                                High priority tickets
                            </p>

                            <p className="mt-1 text-2xl font-bold">
                                {highPriorityTickets}
                            </p>

                        </div>


                        <div>

                            <p className="text-sm text-[#c5dfdc]">
                                Negative sentiment
                            </p>

                            <p className="mt-1 text-2xl font-bold">
                                {negativeTickets}
                            </p>

                        </div>


                        <div className="rounded-2xl bg-white/10 p-4">

                            <p className="text-sm leading-6 text-[#e1f0ee]">

                                AI automatically analyzes incoming
                                tickets and identifies their category,
                                priority, sentiment, and summary.

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
};


export default AgentDashboard;