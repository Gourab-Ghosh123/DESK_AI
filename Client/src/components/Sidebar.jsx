import {
    LayoutDashboard,
    PlusCircle,
    Ticket,
    Sparkles,
    BarChart3,
    Settings,
    LifeBuoy
} from "lucide-react";

import {useNavigate} from "react-router-dom";


const Sidebar = () => {

    const navigate = useNavigate();

    return (
        <aside className="w-64 min-h-screen bg-white border-r border-[#d9ebe8] flex flex-col">

            {/* Logo */}
            <div className="px-7 py-7">

                <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-2xl bg-[#d9eeeb] flex items-center justify-center text-2xl">
                        🐟
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-[#18565b]">
                            DESK AI
                        </h1>

                        <p className="text-[11px] text-[#6b898b]">
                            Smarter Support. Happier Customers.
                        </p>
                    </div>

                </div>

            </div>


            {/* Navigation */}
            <nav className="px-4 space-y-2">

                <SidebarItem
                    icon={<LayoutDashboard size={19} />}
                    label="Dashboard"
                    active
                    onClick={() => navigate("/")}
                />

                <SidebarItem
                    icon={<PlusCircle size={19} />}
                    label="Create Ticket"
                    onClick={() => navigate("/create-ticket")}
                />

                <SidebarItem
                    icon={<Ticket size={19} />}
                    label="My Tickets"
                    onClick={() => navigate("/my-tickets")}
                />

                <SidebarItem
                    icon={<Sparkles size={19} />}
                    label="AI Assistant"
                />

                <SidebarItem
                    icon={<BarChart3 size={19} />}
                    label="Analytics"
                />

            </nav>


            {/* Bottom */}
            <div className="mt-auto px-4 pb-6 space-y-2">

                <SidebarItem
                    icon={<LifeBuoy size={19} />}
                    label="Help & Guide"
                />

                <SidebarItem
                    icon={<Settings size={19} />}
                    label="Settings"
                />

            </div>

        </aside>
    );
};


const SidebarItem = ({
    icon,
    label,
    active = false,
    onClick
}) => {

    return (
        <button
            onClick={onClick}
            className={`
                w-full
                flex
                items-center
                gap-4
                px-4
                py-3
                rounded-2xl
                text-sm
                transition-all
                duration-200

                ${
                    active
                        ? "bg-[#d9eeeb] text-[#18565b] font-semibold"
                        : "text-[#365e61] hover:bg-[#f1f8f7]"
                }
            `}
        >

            {icon}

            <span>
                {label}
            </span>

        </button>
    );
};


export default Sidebar;