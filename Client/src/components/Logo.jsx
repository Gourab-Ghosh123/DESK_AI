import { Headphones, Sparkles } from "lucide-react";


const Logo = ({ showTagline = true }) => {

    return (
        <div className="flex items-center gap-3">

            {/* Logo icon */}
            <div className="
                relative
                w-11
                h-11
                rounded-2xl
                bg-[#d9eeeb]
                flex
                items-center
                justify-center
                text-[#18565b]
            ">

                <Headphones size={22} />

                <Sparkles
                    size={11}
                    className="
                        absolute
                        top-1
                        right-1
                        text-[#65aaa3]
                    "
                />

            </div>


            {/* Brand */}
            <div>

                <h1 className="
                    text-xl
                    font-bold
                    tracking-tight
                    text-[#18565b]
                ">
                    DESK AI
                </h1>

                {showTagline && (
                    <p className="text-[11px] text-[#6b898b]">
                        Smarter Support. Happier Customers.
                    </p>
                )}

            </div>

        </div>
    );
};


export default Logo;