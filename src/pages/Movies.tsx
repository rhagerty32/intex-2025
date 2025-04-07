import Papa from 'papaparse'
import { useEffect, useState, useRef } from 'react'
import { Title } from '../components/Title';
import { genres } from '../utils/genres';
import { FaPlay } from "react-icons/fa";

const CHUNK_SIZE = 20

export const Movies = () => {
    const [allMovies, setAllMovies] = useState<Title[]>([])

    // Load CSV once
    useEffect(() => {
        fetch('/movies_titles.csv')
            .then(response => response.text())
            .then(csvText => {
                Papa.parse<Title>(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        const rows = result.data.filter(row => row.title?.trim())
                        const sorted = rows.sort((a, b) => a.title.localeCompare(b.title))


                        setAllMovies(sorted)
                    },
                })
            })
    }, [])

    const Section = ({ title, movies }: { title: string, movies: Title[] }) => {
        const [visibleMovies, setVisibleMovies] = useState<Title[]>([])
        const [scrollIndex, setScrollIndex] = useState(CHUNK_SIZE)
        const loaderRef = useRef<HTMLDivElement>(null)
        const containerRef = useRef<HTMLDivElement>(null)

        // Initial load
        useEffect(() => {
            if (movies.length > 0) {
                setVisibleMovies(movies.slice(0, CHUNK_SIZE))
                setScrollIndex(CHUNK_SIZE)
            }
        }, [movies])

        // Intersection observer for horizontal scroll
        useEffect(() => {
            if (!loaderRef.current || !containerRef.current) return

            const observer = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0]
                    if (entry.isIntersecting) {
                        loadMore()
                    }
                },
                {
                    root: containerRef.current,
                    threshold: 1.0,
                }
            );

            observer.observe(loaderRef.current)

            return () => observer.disconnect()
        }, [scrollIndex, movies])

        const loadMore = () => {
            const nextChunk = movies.slice(scrollIndex, scrollIndex + CHUNK_SIZE)
            if (nextChunk.length === 0) return;
            setVisibleMovies(prev => [...prev, ...nextChunk])
            setScrollIndex(prev => prev + CHUNK_SIZE)
        }

        return (
            <div className="flex flex-col items-start justify-center w-full overflow-hidden h-fit relative">
                <h2 className="text-2xl text-zinc-100 font-bold mb-4 px-8">{title}</h2>
                <div
                    ref={containerRef}
                    className="flex flex-row gap-4 overflow-x-auto w-full min-w-0 px-8 relative scroll-smooth no-scrollbar"
                >
                    {visibleMovies.map((movie, index) => (
                        <Title key={index} movie={movie} />
                    ))}
                    <div ref={loaderRef} className="w-[2px] h-full bg-transparent" />
                    <div className="pointer-events-none fixed right-0 h-80 w-16 bg-gradient-to-l from-[#191919] to-transparent" />
                </div>
            </div>
        );
    };

    const filterTitle = ({ titleList, allMovies }: { titleList: string[], allMovies: Title[] }) => {
        const filteredMovies = allMovies.filter(movie => {
            const movieTitle = movie.title.toLowerCase()
            return titleList.some(title => title.toLowerCase() === movieTitle)
        })
        return filteredMovies
    };

    const example = ['100 Meters', '14 Cameras'];
    const top10List = filterTitle({ titleList: example, allMovies })

    const findTitle = (title: string) => {
        const foundMovie = allMovies.find(movie => movie.title.toLowerCase() === title.toLowerCase())
        if (!foundMovie) throw new Error(`Movie with title "${title}" not found`)
        const activeGenres = Object.keys(foundMovie).filter(key => genres.includes(key) && foundMovie[key] === '1')

        return { obj: foundMovie, genres: activeGenres }
    };

    type RecentlyAdded = {
        obj: Title
        genres: string[]
    }
    const recentlyAdded: RecentlyAdded | null = allMovies.length
        ? findTitle('100 Meters')
        : null

    return (
        <div className="flex flex-col items-center justify-start bg-[#191919] no-scrollbar w-full">
            <div className="flex flex-col items-start justify-center w-full overflow-clip h-[calc(80% - 20px)] text-white gap-4 mb-8 relative">
                <img
                    src={`https://cdn.spotparking.app/public/posters/${recentlyAdded?.obj.title}.jpg`}
                    alt={recentlyAdded?.obj.title}
                    loading="lazy"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.onerror = null
                        target.src = 'https://blocks.astratic.com/img/general-img-portrait.png'
                    }}
                    className="w-full object-cover aspect-video object-top"
                />
                <div className='absolute bottom-10 left-10 flex flex-col gap-3 z-10'>
                    <p className='font-light text-3xl text-shadow-lg'>Recently Added</p>
                    <p className='font-semibold text-6xl text-shadow-lg'>{recentlyAdded?.obj.title}</p>
                    <p className='font-light text-md text-gray-200 text-shadow-lg'>{recentlyAdded?.genres.join(", ")}</p>

                    <div className='flex flex-row gap-2 w-fit items-center justify-between bg-[#EA8C55] rounded-full px-3 py-2 cursor-pointer group hover:shadow-lg transition hover:bg-[#BA6D40]'>
                        <div className='bg-[#AF6A42] group-hover:bg-[#8C5433] rounded-full w-8 h-8 flex justify-center items-center'>
                            <FaPlay size={16} className="text-zinc-100" />
                        </div>
                        <p className='group-hover:text-gray-100 pr-1'>Play Now</p>
                    </div>
                </div>
                <div className="pointer-events-none absolute right-0 bottom-0 h-48 w-full bg-gradient-to-t from-[#191919] to-transparent" />
            </div>

            <Section movies={allMovies} title="You May Like..." />
            <Section movies={allMovies} title="Trending" />
        </div>
    );
};