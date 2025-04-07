import { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";

export const Title = ({ movie }: { movie: Title }) => {
    const cdnUrl = "https://cdn.spotparking.app/public/posters/";
    const [showImage, setShowImage] = useState(true);
    const numFullStar = parseInt(movie.random_rating);
    const numEmptyStar = 5 - numFullStar

    return (
        <div className={`flex-shrink-0 w-48 flex flex-col gap-2 items-start justify-center h-fit overflow-hidden transition`}>
            {showImage && (
                <img
                    src={`${cdnUrl}${movie.title}.jpg`}
                    alt={movie.title}
                    loading="lazy"
                    onError={() => setShowImage(false)}
                    className="w-full aspect-[3/4] object-fill overflow-hidden mb-2 rounded-lg hover:opacity-50 cursor-pointer transition"
                />
            )}
            <div className="flex flex-row gap-2 items-start justify-between w-full">
                <div className="flex flex-col gap-1">
                    <h2 className="text-md text-ellipsis cursor-pointer text-wrap line-clamp-2 overflow-clip text-white">{movie.title}</h2>
                    <div className="flex flex-row gap-1 items-center justify-start">
                        {movie.random_rating && (
                            <>
                                {Array.from({ length: numFullStar }).map((_, index) => (
                                    <FaStar key={index} size={15} className="text-[#F4AC45]" />
                                ))}
                                {Array.from({ length: numEmptyStar }).map((_, index) => (
                                    <FaStar key={index} size={15} className="text-[#969696]" />
                                ))}
                            </>
                        )}
                    </div>
                </div>
                <div className="flex items-center cursor-pointer justify-center rounded-full ml-2 py-1 px-3 border border-[#F25F5D] group hover:bg-[#F25F5D] transition">
                    <FaHeart size={15} className="text-[#F25F5D] group-hover:text-[#191919]" />
                </div>
            </div>
        </div>
    );
};