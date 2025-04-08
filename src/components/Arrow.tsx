import React, { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";

interface ArrowProps {
    height: number;
}

const Arrow: React.FC<ArrowProps> = () => {
    const [arrow, setArrow] = useState<boolean>(false);
    const [pulse, setPulse] = useState<boolean>(false);

    useEffect(() => {
        const arrowTimer = setTimeout(() => {
            setArrow(true);
        }, 2000);

        const pulseTimer = setTimeout(() => {
            setPulse(true);
        }, 2500);

        return () => {
            clearTimeout(arrowTimer);
            clearTimeout(pulseTimer);
        };
    }, []);

    const handleClick = () => {
        document.getElementById('scroll-target')?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div
            className={`absolute z-40 left-1/2 transform -translate-x-1/2 cursor-pointer flex justify-center items-center rounded-full hover:bg-gray-200/10 backdrop-blur-sm bottom-32 transition-all duration-700 ${arrow ? "opacity-100" : "opacity-0"
                } ${pulse ? "animate-pulse" : ""}`}
            onClick={handleClick}
        >
            <GoChevronDown aria-label="arrow" size={64} className="text-white text-4xl m-auto" />
        </div>
    );
};

export default Arrow;