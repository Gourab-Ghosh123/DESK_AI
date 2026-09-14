import {
    Search,
    Bell,
    ChevronDown
} from "lucide-react";


const Navbar = () => {

    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-[#d9ebe8] flex items-center justify-between px-8">

            {/* Search */}
            <div className="relative w-[420px]">

                <Search
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#78999b]"
                />

                <input
                    type="text"
                    placeholder="Search tickets, customers..."
                    className="
                        w-full
                        bg-[#f5faf9]
                        border
                        border-[#d9ebe8]
                        rounded-full
                        py-3
                        pl-11
                        pr-5
                        text-sm
                        outline-none
                        focus:border-[#9fcac5]
                    "
                />

            </div>


            {/* Right side */}
            <div className="flex items-center gap-6">

                <button className="relative text-[#365e61]">

                    <Bell size={21} />

                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#f3a99e] rounded-full border-2 border-white" />

                </button>


                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-[#d9eeeb] flex items-center justify-center text-xl">
                        🐟
                    </div>

                    <div className="leading-tight">

                        <p className="text-xs text-[#6b898b]">
                            Hello,
                        </p>

                        <p className="text-sm font-semibold text-[#183f43]">
                            Customer
                        </p>

                    </div>

                    <ChevronDown
                        size={16}
                        className="text-[#6b898b]"
                    />

                </div>

            </div>

        </header>
    );
};


export default Navbar;