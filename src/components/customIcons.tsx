import { RiMapLine } from "react-icons/ri";
import { PiMegaphoneSimpleBold } from "react-icons/pi";
// import { IoArrowBack } from "react-icons/io5";
import { MdPerson } from "react-icons/md";
import { RiParkingBoxLine } from "react-icons/ri";

// export const SidebarArrow = ({ color, onClick, sidebarOpen }) => {
//     return (
//         <div
//             className={`flex flex-row justify-center items-center gap-0 absolute transition-colors duration-0 p-2 rounded-lg cursor-pointer ${sidebarOpen ? 'right-5 bottom-2' : 'rotate-180 right-1/2 translate-x-1/2 bottom-2'}`}
//             onClick={onClick}
//         >
//             <div className={`w-[3px] h-5 rounded-full`} style={{ backgroundColor: color }} />
//             <IoArrowBack size={24} color={color} className="-mr-2" />
//         </div>
//     );
// };

export const DashboardIcon = () => {
    return (
        <div
            className="w-4 h-4 flex flex-row justify-between items-center relative rounded-[3px] bg-transparent border-2 border-stone-900 group cursor-pointer"
        >
            {/* Vertical center line - animates leftward on hover */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute h-full left-1/2 -translate-x-1/2 w-[2px] bg-stone-900 origin-center transition-transform duration-200 group-hover:-translate-x-[8px] group-hover:delay-0 delay-200"
                    style={{ willChange: 'transform' }}
                />
            </div>

            {/* Bottom horizontal line - expands from right to left */}
            <div
                className="absolute w-full h-[2px] right-0 bg-stone-900 origin-right scale-x-50 group-hover:scale-x-100 transition-transform duration-200 group-hover:delay-0 delay-200"
                style={{ willChange: 'transform' }}
            />

            {/* Top vertical line - slides inward from right */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute h-1/2 top-0 -right-[1px] translate-x-[1px] w-[2px] bg-stone-900 origin-center transition-transform duration-200 group-hover:-translate-x-[6px] group-hover:delay-200 delay-0"
                    style={{ willChange: 'transform' }}
                />
            </div>
        </div>
    );
};

export const MegaphoneIcon = () => {
    return (
        <div className="relative group transition duration-200 h-4 w-4 flex justify-center items-center">
            <PiMegaphoneSimpleBold size={18} className="text-stone-900 -scale-x-[100%]" />

            <div className="absolute -right-[6px] -top-[3px] w-[6px] h-[6px] border-t-[2px] border-r-[1px] border-stone-900 rounded-tr-full transform rotate-[70deg] scale-0 delay-0 group-hover:delay-150 group-hover:scale-100 transition duration-200 origin-left" />

            <div className="absolute -right-[4px] -bottom-[1px] w-[4px] h-[6px] border-t-[1px] border-r-[2px] border-stone-900 rounded-tr-full transform rotate-[0deg] scale-0 delay-0 group-hover:delay-150 group-hover:scale-100 transition duration-200 origin-left" />
        </div>
    );
};

export const MapIcon = () => {
    return (
        <div className="relative group transition duration-200 h-4 w-4 flex justify-center items-center hover:delay-0 delay-200">
            <RiMapLine size={18} className="text-stone-900 scale-110" />

            <div className="absolute top-[45%] right-[30%] w-[1px] h-[5px] rotate-45 bg-black scale-y-0 group-hover:scale-y-100 transition-all duration-200 delay-0 group-hover:delay-0 origin-top" />
            <div className="absolute top-[45%] right-[52%] w-[1px] h-[5px] -rotate-45 bg-black scale-y-0 origin-top group-hover:scale-y-100 transition-all duration-200 delay-100 group-hover:delay-100" />
        </div>
    );
};

export const ChartIcon = () => {
    return (
        <div className="w-4 h-4 flex flex-row justify-between items-end relative rounded-[3px] bg-transparent border-2 border-stone-900 group px-[2px]">
            <div
                className="h-[60%] origin-bottom group-hover:animate-shrinkAndRegrow w-[2px] rounded-t bg-stone-900"
                style={{
                    animationDuration: `0.3s`,
                    animationTimingFunction: 'ease-in-out',
                    animationFillMode: 'forwards',
                }}
            />
            <div
                className="h-[40%] origin-bottom group-hover:animate-shrinkAndRegrow w-[2px] rounded-t bg-stone-900"
                style={{
                    animationDuration: `0.4s`,
                    animationTimingFunction: 'ease-in-out',
                    animationFillMode: 'forwards',
                }}
            />
            <div
                className="h-[80%] origin-bottom group-hover:animate-shrinkAndRegrow w-[2px] rounded-t bg-stone-900"
                style={{
                    animationDuration: `0.5s`,
                    animationTimingFunction: 'ease-in-out',
                    animationFillMode: 'forwards',
                }}
            />
        </div>
    );
};

export const UsersIcon = ({ size }: { size: number }) => {
    return (
        <div className="relative group w-4 h-4">
            <MdPerson size={size} className="text-zinc-100 z-[2] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            <MdPerson size={size * 0.5} className="text-zinc-100 absolute left-[50%] top-[70%] -translate-x-[50%] -translate-y-[50%] scale-[10%] group-hover:scale-100 transition-all duration-200 delay-100 group-hover:delay-0 group-hover:left-[5%] group-hover:top-[55%]" />
            <MdPerson size={size * 0.5} className="text-zinc-100 absolute left-[50%] top-[70%] -translate-x-[50%] -translate-y-[50%] scale-[10%] group-hover:scale-100 transition-all duration-200 delay-100 group-hover:delay-0 group-hover:left-[95%] group-hover:top-[55%]" />
        </div>
    );
};

export const LotIcon = () => {
    return (
        <div className="w-4 h-4 group justify-center overflow-hidden items-center flex">
            <RiParkingBoxLine size={18} className="text-spotGray group-hover:animate-parkingIcon" />
        </div>
    );
};

export const PermitIcon = () => {
    return (
        <div className="w-4 h-4 group justify-center items-center flex">
            <div className="group-hover:animate-permitIcon origin-top mt-[1px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M10.8643 17.5317L7.57798 17.5323C7.28987 17.5326 7.00453 17.476 6.7383 17.3659C6.47207 17.2558 6.23017 17.0943 6.02644 16.8905C5.82272 16.6868 5.66118 16.4449 5.55106 16.1787C5.44094 15.9124 5.38441 15.6271 5.38471 15.339V6.84355C5.38433 6.41192 5.469 5.98445 5.63386 5.58555C5.79872 5.18665 6.04055 4.82413 6.34555 4.51871L9.31436 1.54989C9.72564 1.13925 10.2831 0.908613 10.8643 0.908613C11.4454 0.908613 12.0029 1.13925 12.4142 1.54989L15.383 4.51871C15.9992 5.13493 16.3444 5.97144 16.3438 6.84355V15.339C16.3441 15.6271 16.2876 15.9124 16.1775 16.1787C16.0673 16.4449 15.9058 16.6868 15.7021 16.8905C15.4983 17.0943 15.2564 17.2558 14.9902 17.3659C14.724 17.476 14.4386 17.5326 14.1505 17.5323L10.8643 17.5317Z" stroke="black" strokeWidth="1.2803" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.67069 13.6027L13.0572 13.6027M9.31406 8.94453C9.51764 9.14811 9.75932 9.30959 10.0253 9.41976C10.2913 9.52994 10.5764 9.58664 10.8643 9.58664C11.1522 9.58664 11.4372 9.52994 11.7032 9.41976C11.9692 9.30959 12.2109 9.14811 12.4145 8.94453C12.618 8.74096 12.7795 8.49928 12.8897 8.23329C12.9999 7.96731 13.0566 7.68223 13.0566 7.39434C13.0566 7.10644 12.9999 6.82136 12.8897 6.55538C12.7795 6.28939 12.618 6.04772 12.4145 5.84414C12.0033 5.433 11.4457 5.20203 10.8643 5.20203C10.2828 5.20203 9.7252 5.433 9.31406 5.84414C8.90293 6.25528 8.67195 6.8129 8.67195 7.39434C8.67195 7.97577 8.90293 8.53339 9.31406 8.94453Z" stroke="black" strokeWidth="1.2803" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    );
};

export const SignIcon = () => {
    return (
        <div className="w-4 h-4 group justify-center items-center flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <g clipPath="url(#clip0_1156_12)">
                    <path d="M3.31772 0C3.87084 0 4.05273 0.446874 4.05273 0.999999V2H15.0527C15.6059 2 16 2.19261 16 2.74573C16 3.29886 15.6059 3.5 15.0527 3.5H4.05273V15C4.05273 15.5531 3.83064 16 3.27752 16C2.72439 16 2.55273 15.5531 2.55273 15V3.5H1.05273C0.499609 3.5 0.0527344 3.32266 0.0527344 2.76953C0.0527344 2.21641 0.499609 2 1.05273 2H2.55273V0.999999C2.55273 0.446874 2.76459 0 3.31772 0Z" fill="black" />
                    <path className="group-hover:animate-signIcon origin-top transition-transform [transform-style:preserve-3d]" d="M6.37656 5H13.5766C14.0744 5 14.4766 5.38304 14.4766 5.85714V10.1429C14.4766 10.617 14.0744 11 13.5766 11H6.37656C5.87875 11 5.47656 10.617 5.47656 10.1429V5.85714C5.47656 5.38304 5.87875 5 6.37656 5Z" stroke="black" strokeWidth="1.5" />
                </g>
                <defs>
                    <clipPath id="clip0_1156_12">
                        <rect width="16" height="16" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    )
}