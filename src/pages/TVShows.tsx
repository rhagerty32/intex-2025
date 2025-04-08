import Papa from 'papaparse'
import { useEffect, useState, useRef, useMemo } from 'react'
import { Title } from '../components/Title'
import { genres } from '../utils/genres'

const CHUNK_SIZE = 40

export const TVShows = () => {
    const [allMovies, setAllMovies] = useState<Title[]>([])
    const [visibleMovies, setVisibleMovies] = useState<Title[]>([])
    const [selectedGenre, setSelectedGenre] = useState<string>('Action')
    const [scrollIndex, setScrollIndex] = useState(CHUNK_SIZE)
    const [loading, setLoading] = useState(true)
    const loaderRef = useRef<HTMLDivElement>(null)

    // Load CSV once
    useEffect(() => {
        fetch('/movies_titles.csv')
            .then(response => response.text())
            .then(csvText => {
                Papa.parse<Title>(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        const rows = result.data.filter(row => row.title?.trim() && row.type === 'TV Show')
                        const sorted = rows.sort((a, b) => a.title.localeCompare(b.title))
                        setAllMovies(sorted)
                        setLoading(false)
                    },
                })
            })
    }, [])

    // Extract available genres
    const allGenres = useMemo(() => {
        return allMovies.reduce((acc, movie) => {
            const movieGenres = Object.keys(movie).filter(
                key => genres.includes(key) && movie[key] === '1'
            )
            return [...acc, ...movieGenres]
        }, [] as string[])
            .filter((genre, index, self) => self.indexOf(genre) === index)
            .sort((a, b) => a.localeCompare(b))
    }, [allMovies])

    // Filtered movies based on genre
    const filteredMovies = useMemo(() => {
        return allMovies.filter(movie => selectedGenre ? movie[selectedGenre] === '1' : true)
    }, [allMovies, selectedGenre])

    // Load initial chunk of visible movies on genre change
    useEffect(() => {
        setScrollIndex(CHUNK_SIZE)
        setVisibleMovies(filteredMovies.slice(0, CHUNK_SIZE))
    }, [filteredMovies])

    // Lazy load more on scroll
    useEffect(() => {
        if (!loaderRef.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore()
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 1.0,
            }
        )

        observer.observe(loaderRef.current)
        return () => observer.disconnect()
    }, [scrollIndex, filteredMovies])

    const loadMore = () => {
        const nextChunk = filteredMovies.slice(scrollIndex, scrollIndex + CHUNK_SIZE)
        if (nextChunk.length === 0) return
        setVisibleMovies(prev => [...prev, ...nextChunk])
        setScrollIndex(prev => prev + CHUNK_SIZE)
    };

    console.log(`Selected genre: ${selectedGenre}`)

    return (
        <div className="flex flex-col items-center justify-center bg-[#191919] no-scrollbar w-full gap-10 mt-10">
            <p className='font-semibold text-4xl -mt-5 -mb-5 text-shadow-lg text-white'>TV Shows</p>

            {loading && (
                <div className="w-full flex justify-center py-8">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white" />
                </div>
            )}

            <div className="w-screen relative overflow-hidden pb-2 pt-2">
                <div className="grid grid-rows-1 auto-cols-max grid-flow-col gap-4 px-8 overflow-x-auto no-scrollbar pr-12">
                    {allGenres.map((genre, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedGenre(genre)}
                            className={`cursor-pointer transition text-md px-6 py-4 min-w-[150px] max-w-[250px] rounded-lg flex items-center justify-center bg-[#383838] text-white ${selectedGenre === genre ? 'bg-white text-black font-semibold' : 'hover:bg-[#252525]'}`}
                        >
                            <span className={`truncate whitespace-nowrap overflow-hidden w-full ${selectedGenre === genre ? 'text-black' : 'text-white'} text-center`}>
                                {genre}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Side gradients */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-[#191919] to-transparent z-10" />
                <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#191919] to-transparent z-10" />
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 w-full px-8">
                {visibleMovies.map((movie, index) => (
                    <div key={index} className="flex items-center justify-center">
                        <Title movie={movie} />
                    </div>
                ))}
                <div ref={loaderRef} className="w-[2px] h-full bg-transparent" />
                <div className="pointer-events-none fixed bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#191919] to-transparent z-10" />
            </div>
        </div>
    )
}