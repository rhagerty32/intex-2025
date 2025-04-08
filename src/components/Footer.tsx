import { Link } from "react-router-dom"
import { Logo } from "./logo"

export const Footer = () => {
    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full bg-[#383838] text-white text-sm p-4 z-50">
            <Link to="/">
                <Logo />
            </Link>
            <div className="flex flex-row gap-4 justify-center items-center w-full">
                <Link to="/privacy-policy" className="text-white font-extralight hover:text-gray-400">
                    Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="text-white font-extralight hover:text-gray-400">
                    TV Shows
                </Link>
                <Link to="/contact" className="text-white font-extralight hover:text-gray-400">
                    Movies
                </Link>
                <Link to="/about" className="text-white font-extralight hover:text-gray-400">
                    Genres
                </Link>
                <Link to="/help" className="text-white font-extralight hover:text-gray-400">
                    Sign Out
                </Link>
            </div>
            <p className="text-[#D9D9D9] font-extralight">
                © 2025 CineNiche All rights reserved.
            </p>
        </div>
    )
}