import { IoHomeOutline } from "react-icons/io5";
import { MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";
import { FiSearch } from 'react-icons/fi'
import React, { forwardRef } from "react";
import { LuCommand } from "react-icons/lu";
import { TbMovie } from "react-icons/tb";

export const Navbar = forwardRef<HTMLInputElement, { setSearchActive: (value: boolean) => void }>(({ setSearchActive }, ref) => {

    const HeaderLink = ({ icon, text, link }: { icon: any, text: string, link: string }) => {
        return (
            <Link to={link} className="flex flex-row justify-center items-center hover:bg-zinc-800 p-2 my-2 rounded gap-2 cursor-pointer transition">
                {icon}
                <p>{text}</p>
            </Link>
        );
    };

    const headerLinks = [
        {
            icon: <TbMovie className="text-zinc-100" />,
            text: "Movies",
            link: "/movies"
        },
        {
            icon: <MdPerson size={24} className="text-zinc-100" />,
            text: "Account",
            link: "/account"
        }
    ];

    const platform = navigator.userAgent.includes("Mac") ? "Mac" : navigator.userAgent.includes("Win") ? "Windows" : "Other";

    return (
        <div className="bg-transparent relative border-y border-zinc-800 text-zinc-100 h-16 px-8 flex flex-row justify-between items-center">
            <Link to="/">
                <img src="/logo.png" alt="Logo" className="h-10 w-10" />
            </Link>

            {/* Search Bar */}
            <div
                className="flex flex-col justify-center items-center absolute left-1/2 -translate-x-1/2 gap-2 w-1/3"
                onClick={() => setSearchActive(true)}
            >
                <div
                    className="w-full shadow-md border py-1 bg-zinc-300 rounded-2xl flex flex-col justify-start items-center"
                    onClick={() => (ref as React.RefObject<HTMLInputElement>)?.current?.focus()}
                >
                    <div className="flex flex-row justify-center items-center gap-2 w-full px-2">
                        <FiSearch size={18} className="text-stone-900" />
                        <div className="w-full h-full bg-transparent outline-none text-zinc-500">
                            Search
                        </div>
                        <p className="flex flex-row justify-center items-center mr-2 gap-0 mt-[1px] w-fit text-zinc-500 text-xs">
                            {platform ? <LuCommand size={13} className="text-zinc-500" /> : "Ctrl"}+K
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-center items-center gap-2">
                {headerLinks.map((link, index) => (
                    <HeaderLink
                        key={index}
                        icon={link.icon}
                        text={link.text}
                        link={link.link}
                    />
                ))}
            </div>
        </div>
    );
}
);