import React, {
    useState,
    useEffect,
    useCallback,
    ForwardedRef,
    forwardRef,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import Fuse from 'fuse.js'
import { SEARCH_INDEX } from './searchIndex'
import Papa from 'papaparse'

type Movie = {
    show_id: string
    type: string
    title: string
    director: string
    cast: string
    country: string
    release_year: string
    rating: string
    duration: string
    description: string
    [key: string]: any
}

type SearchItem = {
    title: string
    path: string
    keywords?: string[]
    data?: any
}

type Props = {
    setSearchActive: (value: boolean) => void
    shouldHighlight?: boolean
    ref: ForwardedRef<HTMLInputElement>
}



const SearchBar = forwardRef<HTMLInputElement, Props>(({ setSearchActive, shouldHighlight }, ref) => {
    const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [fuse, setFuse] = useState<Fuse<SearchItem> | null>(null);
    const navigate = useNavigate();

    // TODO This crashes sometimes because it's too much to process.
    // This will have to be fixed with backend queries (SQL)
    useEffect(() => {
        fetch('/movies_titles.csv')
            .then((res) => res.text())
            .then((csvText) => {
                Papa.parse<Movie>(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        const raw = result.data.filter((row) => row.title?.trim())

                        // Limit indexed items (you can increase later if stable)
                        const sliced = raw.slice(0, 3000)

                        const indexedMovies = sliced.map((movie) => ({
                            title: `${movie.title}`,
                            path: `/title?titleID=${movie.show_id}`,
                            keywords: [
                                movie.title?.toLowerCase(),
                                movie.description?.toLowerCase(),
                                movie.director?.toLowerCase(),
                                movie.cast?.toLowerCase(),
                                movie.country?.toLowerCase(),
                                movie.release_year,
                                movie.rating?.toLowerCase(),
                                movie.duration?.toLowerCase(),
                                ...Object.keys(movie)
                                    .filter((key) => movie[key] === '1')
                                    .map((genre) => genre.toLowerCase()),
                            ].filter(Boolean), // only keep valid strings
                            data: movie,
                        }))

                        const fullIndex = [...SEARCH_INDEX, ...indexedMovies]

                        // Use "includeScore" for better sorting if needed
                        const fuseInstance = new Fuse(fullIndex, {
                            keys: ['title', 'keywords'],
                            threshold: 0.3,
                            minMatchCharLength: 2,
                        })

                        setFuse(fuseInstance)
                    },
                })
            })
    }, [])

    function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void {
        let timer: NodeJS.Timeout
        return (...args: Parameters<T>) => {
            clearTimeout(timer)
            timer = setTimeout(() => fn(...args), delay)
        }
    }

    const handleSearch = (query: string) => {
        if (!query.trim() || !fuse) {
            setSearchResults([])
            setSelectedIndex(0)
            return
        }

        const rawResults = fuse.search(query).slice(0, 50) // ✅ Limit to 50 results

        const results = rawResults.map((result) => {
            const item = result.item
            const title = item?.title ?? ''

            return {
                ...item,
                title: title.includes('~~') ? title.replace(/~~/g, ' ') : title,
                data: item?.data ?? null,
                path: item?.path ?? '/',
            }
        }).filter(item => item.title && item.path)

        setSearchResults(results)
        setSelectedIndex(0)
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (searchResults.length === 0) return
        if (e.key === 'Escape') {
            setSearchActive(false)
            setSearchResults([])
            setSelectedIndex(0)
            setTimeout(() => {
                (ref as React.RefObject<HTMLInputElement>)?.current?.blur()
            }, 0)
        } else
            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setSelectedIndex((prev) => (prev + 1) % searchResults.length)
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setSelectedIndex((prev) =>
                    prev <= 0 ? searchResults.length - 1 : prev - 1
                )
            } else if (e.key === 'Enter' && selectedIndex >= 0) {
                e.preventDefault()
                const selectedItem = searchResults[selectedIndex]
                navigate(selectedItem.path)
                setSearchActive(false)
                setSearchResults([])
                setSelectedIndex(0)
                setTimeout(() => {
                    (ref as React.RefObject<HTMLInputElement>)?.current?.blur()
                }, 0)
            }
    }

    useEffect(() => {
        const selectedEl = document.querySelector(
            `.search-result-item[data-idx="${selectedIndex}"]`
        )
        if (selectedEl) {
            selectedEl.scrollIntoView({ block: 'nearest' })
        }
    }, [selectedIndex])

    useEffect(() => {
        if (shouldHighlight && ref && 'current' in ref && ref.current) {
            ref.current.select()
        }
    }, [shouldHighlight, ref])

    const handleSearchItemClick = useCallback((result: SearchItem) => {
        if (result?.title?.includes('~~')) {
            const [type, _name] = result.title.split('~~')
            if (type === 'Movie' && result.data) {
                sessionStorage.setItem('selectedMovie', JSON.stringify(result.data))
            };
        };

        navigate(result.path)
        setSearchActive(false)
        setSearchResults([])
        setSelectedIndex(-1)
            ; (ref as React.RefObject<HTMLInputElement>)?.current?.blur()
    }, [navigate, setSearchActive, ref])

    const debouncedSearch = useCallback(debounce(handleSearch, 200), [fuse])

    return (
        <div className="flex flex-col justify-center items-center absolute left-1/2 -translate-x-1/2 gap-2 w-1/2">
            <div
                className={`w-full shadow-md border-white py-4 bg-zinc-300 rounded-2xl flex flex-col justify-start items-center`}
                onClick={() => (ref as React.RefObject<HTMLInputElement>)?.current?.focus()}
            >
                <div className="flex flex-row justify-center items-center gap-2 w-full px-2">
                    <FiSearch size={18} className="text-stone-900" />
                    <input
                        type="text"
                        placeholder={'Search for movies, shows, and more'}
                        className="w-full h-full bg-transparent outline-none text-black text-xl"
                        ref={ref}
                        onChange={(e) => debouncedSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                {searchResults.length > 0 && (
                    <>
                        <hr className="w-full border-t-2 border-stone-200 mt-4" />
                        <p className="text-sm font-semibold text-stone-400 mt-4 text-left w-full px-4">
                            Total results ({searchResults.length >= 50 ? '50+' : searchResults.length})
                        </p>
                        <div className="w-full p-4 pb-0 max-h-96 overflow-auto flex flex-col no-scrollbar">
                            {searchResults.map((result, idx) => (
                                <div
                                    key={idx}
                                    data-idx={idx}
                                    className={`search-result-item cursor-pointer px-3 py-3 flex justify-between items-center hover:bg-stone-100 rounded w-full ${idx === selectedIndex ? 'bg-stone-200' : ''
                                        }`}
                                    onMouseDown={(e) => {
                                        e.preventDefault()
                                        handleSearchItemClick(result)
                                    }}
                                >
                                    <div className="flex flex-row gap-2 items-center justify-center">
                                        <p className="text-sm font-medium text-black">
                                            {result.title}
                                        </p>
                                        {result.data && (
                                            <p className="text-xs font-normal text-stone-500">
                                                ({result.data.release_year})
                                            </p>
                                        )}
                                    </div>
                                    <p className="text-xs font-normal text-stone-500">
                                        {result.data.type}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
})

export default SearchBar