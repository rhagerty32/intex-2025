import Papa from 'papaparse'
import { useEffect, useState, useRef } from 'react'

const CHUNK_SIZE = 100

export const Home = () => {
    const [allTitles, setAllTitles] = useState<string[]>([])
    const [visibleTitles, setVisibleTitles] = useState<string[]>([])
    const [index, setIndex] = useState(0)
    const loaderRef = useRef<HTMLDivElement>(null)

    // Load CSV once
    useEffect(() => {
        fetch('/movies_titles.csv')
            .then(response => response.text())
            .then(csvText => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        const rows = result.data as any[]
                        const extractedTitles = rows.map(row => row.title?.trim()).filter(Boolean)
                        const sortedTitles = extractedTitles.sort((a, b) => a.localeCompare(b))
                        setAllTitles(sortedTitles)
                        setVisibleTitles(sortedTitles.slice(0, CHUNK_SIZE))
                        setIndex(CHUNK_SIZE)
                    },
                })
            })
    }, [])

    // Load more when loaderRef comes into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore()
                }
            },
            { threshold: 1.0 }
        )

        if (loaderRef.current) {
            observer.observe(loaderRef.current)
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current)
            }
        }
    }, [loaderRef, index, allTitles])

    const loadMore = () => {
        const nextChunk = allTitles.slice(index, index + CHUNK_SIZE)
        setVisibleTitles(prev => [...prev, ...nextChunk])
        setIndex(prev => prev + CHUNK_SIZE)
    }

    const Movie = ({ movie }: { movie: { title: string, src?: string } }) => {
        return (
            <div className="flex flex-col items-center justify-center mb-4 border bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-lg p-4 border-zinc-700 text-zinc-100">
                {movie.src && (
                    <img src={movie.src} alt={movie.title} className="w-32 h-48 object-cover mb-2" />
                )}
                <h2 className="text-lg font-semibold">{movie.title}</h2>
            </div>
        );
    };

    return (
        <div className="flex flex-col min-h-screen items-center justify-start bg-zinc-900">
            <h1 className="text-3xl text-zinc-100 font-bold my-4">Movie Titles</h1>
            <div className="grid bg-zinc-900 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
                {visibleTitles.map((title, index) => (
                    <Movie
                        key={index}
                        movie={{ title }}
                    />
                ))}
            </div>
            <div ref={loaderRef} className="h-16 mt-8 flex items-center justify-center">
                <span className="text-gray-500">Loading more...</span>
            </div>
        </div>
    );
};