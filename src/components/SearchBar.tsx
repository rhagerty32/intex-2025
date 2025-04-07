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
    const [searchResults, setSearchResults] = useState<SearchItem[]>([])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [fuse, setFuse] = useState<Fuse<SearchItem> | null>(null)
    const navigate = useNavigate()

    const baseIndex: SearchItem[] = [...SEARCH_INDEX]

    useEffect(() => {
        const fuseInstance = new Fuse(baseIndex, {
            keys: ['title', 'keywords'],
            threshold: 0.3,
        })
        setFuse(fuseInstance)
    }, [])

    const handleSearch = (query: string) => {
        if (!query.trim() || !fuse) {
            setSearchResults([])
            setSelectedIndex(0)
            return
        }

        const results = fuse.search(query).map((result) => ({
            ...result.item,
            title: result.item.title.replace(/~~/g, ' '),
        }))
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
            const [type, name] = result.title.split('~~')
            if (type === 'User' && result.data) {
                sessionStorage.setItem('individualUser', JSON.stringify(result.data))
            }
            if (type === 'License Plate') {
                sessionStorage.setItem('plate', name)
            }
        }

        navigate(result.path)
        setSearchActive(false)
        setSearchResults([])
        setSelectedIndex(-1)
            ; (ref as React.RefObject<HTMLInputElement>)?.current?.blur()
    }, [navigate, setSearchActive, ref])

    return (
        <div className="flex flex-col justify-center items-center absolute left-1/2 -translate-x-1/2 gap-2 w-1/2">
            <div
                className={`w-full shadow-md border py-4 bg-zinc-300 rounded-2xl flex flex-col justify-start items-center`}
                onClick={() => (ref as React.RefObject<HTMLInputElement>)?.current?.focus()}
            >
                <div className="flex flex-row justify-center items-center gap-2 w-full px-2">
                    <FiSearch size={18} className="text-stone-900" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full h-full bg-transparent outline-none text-black text-xl"
                        ref={ref}
                        onChange={(e) => handleSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                {searchResults.length > 0 && (
                    <>
                        <hr className="w-full border-t-2 border-stone-200 mt-4" />
                        <p className="text-sm font-semibold text-stone-400 mt-4 text-left w-full px-4">
                            Total results ({searchResults.length})
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
                                            {result.title.includes('~~')
                                                ? result.title.split('~~')[1]
                                                : result.title}
                                        </p>
                                        {result.data && (
                                            <p className="text-xs font-normal text-stone-500">
                                                ({result.data.email})
                                            </p>
                                        )}
                                    </div>
                                    {result.title.includes('~~') && (
                                        <p className="text-xs font-normal text-stone-500">
                                            {result.title.split('~~')[0]}
                                        </p>
                                    )}
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