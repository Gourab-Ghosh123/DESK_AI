import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Search,
    Filter,
    Ticket,
    ArrowRight,
    Clock3,
    Sparkles
} from "lucide-react";

import api from "../services/api";


const MyTickets = () => {

    const navigate = useNavigate();

    const [tickets, setTickets] = useState([]);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // --------------------------------
    // Fetch tickets
    // --------------------------------

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


    // --------------------------------
    // Filtering
    // --------------------------------

    const filteredTickets = tickets.filter((ticket) => {

        const matchesSearch =
            ticket.title
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            ticket.description
                .toLowerCase()
                .includes(search.toLowerCase());


        const matchesStatus =
            statusFilter === "All" ||
            ticket.status === statusFilter;


        const matchesPriority =
            priorityFilter === "All" ||
            ticket.priority === priorityFilter;


        return (
            matchesSearch &&
            matchesStatus &&
            matchesPriority
        );

    });


    // --------------------------------
    // Priority styles
    // --------------------------------

    const getPriorityStyle = (priority) => {

        switch (priority) {

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


    // --------------------------------
    // Status styles
    // --------------------------------

    const getStatusStyle = (status) => {

        switch (status) {

            case "Resolved":
                return "bg-[#dcefe7] text-[#397763]";

            case "In Progress":
                return "bg-[#d9e9f7] text-[#467295]";

            case "Closed":
                return "bg-[#edf1f1] text-[#607778]";

            default:
                return "bg-[#f8edc9] text-[#8b7532]";

        }

    };


    return (

        <main className="p-6 md:p-8 max-w-7xl">

            {/* ============================= */}
            {/* Header */}
            {/* ============================= */}

            <div className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-4
                mb-8
            ">

                <div>

                    <div className="
                        flex
                        items-center
                        gap-2
                        mb-2
                    ">

                        <Ticket
                            size={19}
                            className="text-[#3d8985]"
                        />

                        <span className="
                            text-sm
                            font-semibold
                            text-[#6b898b]
                        ">
                            SUPPORT
                        </span>

                    </div>


                    <h1 className="
                        text-3xl
                        font-bold
                        text-[#18565b]
                    ">
                        My Tickets
                    </h1>


                    <p className="
                        mt-2
                        text-sm
                        text-[#78999b]
                    ">
                        Track and manage your support requests.
                    </p>

                </div>


                <button
                    onClick={() => navigate("/create-ticket")}
                    className="
                        rounded-2xl
                        bg-[#18565b]
                        hover:bg-[#124a4f]
                        text-white
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        transition
                    "
                >
                    + Create Ticket
                </button>

            </div>


            {/* ============================= */}
            {/* Search + filters */}
            {/* ============================= */}

            <div className="
                bg-white
                rounded-3xl
                border
                border-[#d9ebe8]
                p-5
                mb-6
            ">

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-[1fr_auto_auto]
                    gap-4
                ">


                    {/* Search */}

                    <div className="relative">

                        <Search
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
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search tickets..."
                            className="
                                w-full
                                rounded-2xl
                                border
                                border-[#d9ebe8]
                                bg-[#f7fbfa]
                                py-3
                                pl-11
                                pr-4
                                text-sm
                                outline-none
                                text-[#365e61]
                                focus:border-[#8fc2bc]
                                focus:ring-4
                                focus:ring-[#d9eeeb]
                            "
                        />

                    </div>


                    {/* Status */}

                    <div className="relative">

                        <Filter
                            size={16}
                            className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-[#8aa8a9]
                                pointer-events-none
                            "
                        />

                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                            className="
                                appearance-none
                                rounded-2xl
                                border
                                border-[#d9ebe8]
                                bg-[#f7fbfa]
                                py-3
                                pl-10
                                pr-8
                                text-sm
                                text-[#557779]
                                outline-none
                                cursor-pointer
                            "
                        >

                            <option value="All">
                                All Status
                            </option>

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


                    {/* Priority */}

                    <select
                        value={priorityFilter}
                        onChange={(e) =>
                            setPriorityFilter(e.target.value)
                        }
                        className="
                            rounded-2xl
                            border
                            border-[#d9ebe8]
                            bg-[#f7fbfa]
                            py-3
                            px-4
                            text-sm
                            text-[#557779]
                            outline-none
                            cursor-pointer
                        "
                    >

                        <option value="All">
                            All Priority
                        </option>

                        <option value="Critical">
                            Critical
                        </option>

                        <option value="High">
                            High
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="Low">
                            Low
                        </option>

                    </select>

                </div>

            </div>


            {/* ============================= */}
            {/* Results */}
            {/* ============================= */}

            <div className="
                bg-white
                rounded-3xl
                border
                border-[#d9ebe8]
                overflow-hidden
            ">


                {/* Result header */}

                <div className="
                    px-6
                    py-5
                    border-b
                    border-[#edf4f2]
                    flex
                    items-center
                    justify-between
                ">

                    <div>

                        <h2 className="
                            font-bold
                            text-[#18565b]
                        ">
                            Your Support Requests
                        </h2>

                        <p className="
                            text-xs
                            text-[#8aa8a9]
                            mt-1
                        ">
                            {filteredTickets.length} ticket
                            {filteredTickets.length !== 1
                                ? "s"
                                : ""
                            }
                        </p>

                    </div>


                    <Sparkles
                        size={19}
                        className="text-[#79aaa5]"
                    />

                </div>


                {/* Loading */}

                {loading && (

                    <div className="
                        py-16
                        text-center
                        text-sm
                        text-[#78999b]
                    ">
                        Loading tickets...
                    </div>

                )}


                {/* Error */}

                {!loading && error && (

                    <div className="
                        p-6
                        text-sm
                        text-[#a65d55]
                        bg-[#fff4f1]
                    ">
                        {error}
                    </div>

                )}


                {/* Empty */}

                {!loading &&
                    !error &&
                    filteredTickets.length === 0 && (

                    <div className="
                        py-16
                        px-6
                        text-center
                    ">

                        <div className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-[#d9eeeb]
                            flex
                            items-center
                            justify-center
                            mx-auto
                            mb-4
                        ">

                            <Ticket
                                size={23}
                                className="text-[#3d8985]"
                            />

                        </div>


                        <h3 className="
                            font-semibold
                            text-[#365e61]
                        ">
                            No tickets found
                        </h3>


                        <p className="
                            text-sm
                            text-[#8aa8a9]
                            mt-2
                        ">
                            Try changing your search or filters.
                        </p>

                    </div>

                )}


                {/* Tickets */}

                {!loading &&
                    !error &&
                    filteredTickets.length > 0 && (

                    <div className="divide-y divide-[#edf4f2]">

                        {filteredTickets.map((ticket) => (

                            <button
                                key={ticket._id}
                                onClick={() =>
                                    navigate(
                                        `/tickets/${ticket._id}`
                                    )
                                }
                                className="
                                    w-full
                                    text-left
                                    px-6
                                    py-5
                                    hover:bg-[#f7fbfa]
                                    transition
                                    group
                                "
                            >

                                <div className="
                                    flex
                                    flex-col
                                    lg:flex-row
                                    lg:items-center
                                    gap-4
                                ">


                                    {/* Main info */}

                                    <div className="
                                        flex-1
                                        min-w-0
                                    ">

                                        <div className="
                                            flex
                                            items-center
                                            gap-3
                                            mb-2
                                        ">

                                            <span className="
                                                text-[11px]
                                                font-bold
                                                text-[#8aa8a9]
                                            ">
                                                #
                                                {ticket._id
                                                    .slice(-6)
                                                    .toUpperCase()
                                                }
                                            </span>


                                            <span className={`
                                                px-2.5
                                                py-1
                                                rounded-lg
                                                text-[11px]
                                                font-bold
                                                ${getStatusStyle(
                                                    ticket.status
                                                )}
                                            `}>
                                                {ticket.status}
                                            </span>

                                        </div>


                                        <h3 className="
                                            font-semibold
                                            text-[#365e61]
                                            truncate
                                            group-hover:text-[#18565b]
                                        ">
                                            {ticket.title}
                                        </h3>


                                        <p className="
                                            text-sm
                                            text-[#8aa8a9]
                                            mt-1
                                            line-clamp-1
                                        ">
                                            {ticket.description}
                                        </p>

                                    </div>


                                    {/* AI info */}

                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">

                                        <span className="
                                            px-3
                                            py-1.5
                                            rounded-xl
                                            bg-[#edf6f4]
                                            text-[#4d7d7a]
                                            text-xs
                                            font-semibold
                                        ">
                                            {ticket.category}
                                        </span>


                                        <span className={`
                                            px-3
                                            py-1.5
                                            rounded-xl
                                            text-xs
                                            font-semibold
                                            ${getPriorityStyle(
                                                ticket.priority
                                            )}
                                        `}>
                                            {ticket.priority}
                                        </span>

                                    </div>


                                    {/* Date */}

                                    <div className="
                                        flex
                                        items-center
                                        gap-2
                                        text-xs
                                        text-[#8aa8a9]
                                    ">

                                        <Clock3 size={14} />

                                        {new Date(
                                            ticket.createdAt
                                        ).toLocaleDateString()}

                                    </div>


                                    <ArrowRight
                                        size={18}
                                        className="
                                            text-[#9ab6b5]
                                            group-hover:text-[#18565b]
                                            group-hover:translate-x-1
                                            transition
                                        "
                                    />

                                </div>

                            </button>

                        ))}

                    </div>

                )}

            </div>

        </main>
    );
};


export default MyTickets;