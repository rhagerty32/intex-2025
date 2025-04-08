import Papa from 'papaparse';
import { useEffect, useState, useRef } from 'react';
import { Title } from '../components/Title';
import { genres } from '../utils/genres';
import { FaPlay } from "react-icons/fa";
import { useAuthStore } from '../utils/useAuthStore';
import { ScrollColumn } from '../components/ScrollColumn';
import { ScrollingIcons } from '../components/ScrollingIcons';
import { TvIcons } from '../components/tvIcons';
import Arrow from '../components/Arrow';

const CHUNK_SIZE = 20

export const Home = () => {
    const [allMovies, setAllMovies] = useState<Title[]>([])
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

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

                <div className="relative w-full">
                    {/* Scrollable container */}
                    <div
                        ref={containerRef}
                        className="flex flex-row gap-4 overflow-x-auto w-full min-w-0 px-8 relative scroll-smooth no-scrollbar"
                    >
                        {visibleMovies.map((movie, index) => (
                            <Title key={index} movie={movie} />
                        ))}
                        <div ref={loaderRef} className="w-[2px] h-full bg-transparent" />
                    </div>

                    {/* Left fade */}
                    <div className="pointer-events-none absolute top-0 left-0 h-full w-10 bg-gradient-to-r from-[#191919] to-transparent z-10" />

                    {/* Right fade */}
                    <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-[#191919] to-transparent z-10" />
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

    const recentlyAdded: RecentlyAdded | null = allMovies.length
        ? findTitle('All American')
        : null

    const allGenres = allMovies.reduce((acc, movie) => {
        const movieGenres = Object.keys(movie).filter(key => genres.includes(key) && movie[key] === '1')
        return [...acc, ...movieGenres]
    }, [] as string[])
        .filter((genre, index, self) => self.indexOf(genre) === index)
        .sort((a, b) => a.localeCompare(b))

    const Slash = ({ color }: { color: string }) => {
        return (
            <div
                className="w-24 sm:w-36 lg:w-64 h-[4000px] z-10"
                style={{ backgroundColor: color }}
            />
        );
    };

    const batchedMovies = allMovies.slice(0, 150)
    const items1 = batchedMovies.slice(0, 50)
    const items2 = batchedMovies.slice(50, 100)
    const items3 = batchedMovies.slice(100, 150)

    const findMovie = (title: string) => {
        const foundMovie = allMovies.find(movie => movie.title.toLowerCase() === title.toLowerCase())
        if (!foundMovie) throw new Error(`Movie with title "${title}" not found`)

        return foundMovie;
    };

    const title1 = {
        "show_id": "s3328",
        "type": "TV Show",
        "title": "A Year In Space",
        "director": "",
        "cast": "Scott Kelly",
        "country": "United States",
        "release_year": "2015",
        "rating": "TV-PG",
        "duration": "1 Season",
        "description": "Two astronauts attempt to brave a life in Earth's orbit on a record-setting mission to see if humans have the endurance to survive a flight to Mars.",
        "random_rating": '5',
        "tomatoRating": 78,
        "imdbRating": 5
    } as Title

    const title2 = {
        "show_id": "s5991",
        "type": "Movie",
        "title": "14 Blades",
        "director": "Daniel Lee",
        "cast": "Donnie Yen Zhao Wei Wu Chun Law Kar-Ying Kate Tsui Yuwu Qi Wu Ma Chen Kuan Tai Sammo Kam-Bo Hung Chen Zhi Hui Damian Lau Xiang Dong Xu",
        "country": "Hong Kong China Singapore",
        "release_year": "2010",
        "rating": "R",
        "duration": "113 min",
        "description": "In the age of the Ming Dynasty Quinglong is the best of the Jinyiwei an elite assassin squad made up of highly trained former street urchins. When evil eunuch Jia unseats the emperor Quinglong is called to action but is quickly betrayed.",
        "random_rating": "2",
        "tomatoRating": 26,
        "imdbRating": 9
    } as Title

    const cdnUrl = "https://cdn.spotparking.app/public/posters/"

    if (isLoggedIn) {
        <div className="flex flex-col items-center justify-start bg-[#191919] min-h-screen no-scrollbar w-full pb-10 gap-8 py-0">
            <div className="flex flex-col items-start justify-center w-full h-[calc(80%-20px)] overflow-clip text-white gap-4 relative">
                <img
                    src={`https://cdn.spotparking.app/public/posters/${recentlyAdded?.obj.title}.jpg`}
                    alt={recentlyAdded?.obj.title}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.onerror = null
                        target.src = 'https://blocks.astratic.com/img/general-img-portrait.png'
                    }}
                    className="w-full object-cover aspect-video object-top"
                    style={{}}
                />
                <div className='absolute bottom-20 left-20 flex flex-col gap-3 z-10'>
                    <p className='font-light text-2xl text-white'>Recently Added</p>
                    <p className='font-semibold text-6xl text-shadow-lg'>{recentlyAdded?.obj.title}</p>
                    <p className='font-light text-md text-gray-200 text-shadow-lg'>{recentlyAdded?.genres.join(", ")}</p>

                    <div className='flex flex-row gap-2 w-fit items-center justify-between bg-[#EA8C55] rounded-full px-3 py-2 cursor-pointer group hover:shadow-lg transition hover:bg-[#BA6D40]'>
                        <div className='bg-[#AF6A42] group-hover:bg-[#8C5433] rounded-full w-8 h-8 flex justify-center items-center'>
                            <FaPlay size={16} className="text-zinc-100" />
                        </div>
                        <p className='group-hover:text-gray-100 pr-1'>Play Now</p>
                    </div>
                </div>
                <div className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-50 bg-gradient-to-r from-[#191919] to-transparent z-0" />
                <div className="pointer-events-none absolute right-0 bottom-0 h-48 w-full bg-gradient-to-t from-[#191919] to-transparent" />
            </div>

            <Section movies={allMovies} title="You May Like..." />
            <Section movies={allMovies} title="Recommended" />

            <div className="w-screen relative overflow-hidden bg-[#050505] pb-10 pt-6 shadow-lg">
                <h2 className="text-2xl text-zinc-100 font-bold mb-4 px-8">Genres</h2>

                {/* Scrollable grid with 2 rows */}
                <div className="grid grid-rows-1 auto-cols-max grid-flow-col gap-4 px-8 overflow-x-auto no-scrollbar pr-12">
                    {allGenres.map((genre, index) => (
                        <div
                            key={index}
                            className="bg-[#383838] text-white px-6 py-8 rounded-lg text-center min-w-[150px] flex hover:bg-[#191919] items-center justify-center text-xl max-w-96 cursor-pointer text-wrap transition"
                        >
                            {genre}
                        </div>
                    ))}
                </div>

                {/* Right fade */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-[#050505] to-transparent z-10" />
                <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#050505] to-transparent z-10" />
            </div>

            <Section movies={allMovies} title="Popular TV Shows" />
            <Section movies={allMovies} title="Horror" />
        </div>
    } else {
        return (
            <div className="flex flex-col items-center justify-start bg-[#191919] min-h-screen no-scrollbar w-full pb-10 gap-8 py-0">
                <div className="flex flex-col items-center justify-center w-full overflow-hidden text-white gap-4 relative">

                    <div className='absolute top-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-6 z-20'>
                        <p className='text-[60px] text-center text-shadow-lg font-bold text-white select-none'>Rediscover Film. Curated Classics,</p>
                        <p className='text-[60px] text-center text-shadow-lg font-bold text-white select-none -mt-10'>Hidden Gems, Indie Gold.</p>
                        <h1 className='text-2xl text-white bg-[#503047] py-5 px-8 rounded-full font-light hover:bg-[#402639] transition cursor-pointer select-none'>Start Watching Now</h1>
                    </div>

                    <div className='w-fit flex rotate-[30deg] h-screen z-10'>
                        <div className='absolute -translate-y-[1000px] flex flex-row translate-x-[50px]'>
                            <Slash color="#E8AF58" />
                            <Slash color="#EA8C55" />
                            <Slash color="#E06961" />
                            <Slash color="#503047" />
                        </div>
                    </div>

                    <div className="flex flex-row gap-6 pl-8 absolute top-0 left-48 h-full w-fit z-0 opacity-60 scale-150 select-none">
                        <ScrollColumn items={items1} direction="down" />
                        <ScrollColumn items={items2} direction="up" />
                        <ScrollColumn items={items3} direction="down" />
                        <ScrollColumn items={items1} direction="up" />
                        <ScrollColumn items={items2} direction="down" />
                        <ScrollColumn items={items3} direction="up" />
                        <ScrollColumn items={items1} direction="down" />
                        <ScrollColumn items={items3} direction="up" />
                        <ScrollColumn items={items1} direction="down" />
                        <ScrollColumn items={items3} direction="up" />
                        <ScrollColumn items={items1} direction="down" />
                    </div>

                    <Arrow height={800} />

                </div>


                <div className="w-full h-fit flex flex-col justify-center items-center bg-[#191919]" id='scroll-target'>

                    <div className='w-2/3 h-fit bg-[#191919] flex flex-col items-center relative py-20'>
                        <div className='flex flex-row gap-20 justify-center items-center relative'>
                            <div className="flex flex-col justify-center items-start text-right gap-4 text-white w-1/2  py-64 mr-[500px] pl-10">
                                <p className="text-4xl md:text-5xl text-left w-full font-bold">Why CineNiche?</p>
                                <p className="text-base md:text-lg text-left w-full font-light">
                                    At CineNiche, we believe great films shouldn’t be buried by algorithms. We handpick every title, from underground cult hits to award-winning international gems, so every recommendation feels personal.
                                </p>
                                <p className="text-base md:text-lg text-left font-light">
                                    Whether you're a lifelong cinephile or just tired of the same old blockbusters, CineNiche is your passport to a deeper, richer viewing experience.
                                </p>
                            </div>
                            <div className='h-full absolute w-full flex flex-col gap-4'>
                                <div className="absolute rotate-[12deg] top-32 right-10 rounded-lg scale-150">
                                    <Title movie={title2!} full={false} />
                                </div>
                                <div className="absolute -rotate-[17deg] top-96 right-40 rounded-lg scale-150">
                                    <Title movie={title1!} full={false} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-fit bg-[#503047] flex flex-col items-center relative'>
                        <div className='flex flex-row gap-20 justify-center items-center relative'>
                            <div className='h-full absolute top-0 left-0 w-full flex flex-col gap-4'>
                                <img
                                    src={`https://cdn.spotparking.app/public/posters/Malala Cover.jpg`}
                                    alt={recentlyAdded?.obj.title}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement
                                        target.onerror = null
                                        target.src = `${cdnUrl}fallbackImage.jpg`;
                                    }}
                                    className="absolute -left-0 lg:-left-32 -top-12 lg:-top-32 object-cover rounded-lg h-[150px] lg:h-[250px] aspect-video shadow-2xl"
                                />
                                <img
                                    src={`https://cdn.spotparking.app/public/posters/Russian Film Cover.jpg`}
                                    alt={recentlyAdded?.obj.title}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement
                                        target.onerror = null
                                        target.src = `${cdnUrl}fallbackImage.jpg`;
                                    }}
                                    className="absolute left-10 lg:-left-8 top-56 lg:top-40 object-cover rounded-lg h-[150px] lg:h-[250px] aspect-video shadow-2xl"
                                />
                                <img
                                    src={`https://cdn.spotparking.app/public/posters/The Lobster Cover.jpg`}
                                    alt={recentlyAdded?.obj.title}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement
                                        target.onerror = null
                                        target.src = `${cdnUrl}fallbackImage.jpg`;
                                    }}
                                    className="absolute -left-12 lg:-left-48 top-[480px] lg:top-[450px] object-cover rounded-lg h-[150px] lg:h-[250px] aspect-video shadow-2xl"
                                />
                                <img
                                    src={`https://cdn.spotparking.app/public/posters/Jaws Cover.png`}
                                    alt={recentlyAdded?.obj.title}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement
                                        target.onerror = null
                                        target.src = `${cdnUrl}fallbackImage.jpg`;
                                    }}
                                    className="absolute left-1/6 lg:left-1/6 top-[740px] object-cover rounded-lg h-[150px] lg:h-[250px] aspect-video shadow-2xl"
                                />
                            </div>

                            <div className="flex flex-col justify-center items-end text-right gap-4 text-white w-3/4  py-36 ml-[500px] pr-10">
                                <p className="text-4xl md:text-5xl font-bold">Rediscover the Stories <br /> That Shaped Cinema</p>
                                <p className="text-base md:text-lg font-light max-w-[500px]">
                                    Some of the most powerful films were never made for the spotlight. At CineNiche, we celebrate the overlooked and the unforgettable: cult favorites, indie gems, global cinema, and documentaries that offer something real. Each title is carefully chosen to bring fresh perspective and lasting impact.
                                </p>
                                <p className="text-base md:text-lg font-light max-w-[450px]">
                                    These are the stories worth watching again and again. They challenge how we think, reflect what we feel, and remind us why cinema matters.
                                </p>
                            </div>
                        </div>

                        <div className='h-36 w-full bg-[#E06861]' />
                        <div className='h-24 w-full bg-[#EA8C55]' />
                        <div className='h-12 w-full bg-[#E9AF59]' />
                    </div>

                    <div className='w-full h-fit flex flex-col justify-center items-center gap-10 pb-10'>
                        <div className='flex flex-col gap-1 justify-center items-center py-6'>
                            <p className="text-4xl md:text-4xl text-center pt-32 text-white w-full font-bold">Where You Can Watch</p>
                            <ScrollingIcons icons={[<TvIcons />, <TvIcons />, <TvIcons />, <TvIcons />, <TvIcons />]} />
                        </div>

                        <div className='w-[90%] max-w-6xl h-64 bg-[#E9AF59] rounded-xl flex flex-col justify-center items-center gap-8'>
                            <p className="text-4xl md:text-5xl text-center text-white w-full font-semibold">Join Free for 7 Days</p>
                            <p className='text-2xl text-white bg-[#503047] py-5 px-8 rounded-full hover:bg-[#402639] transition cursor-pointer select-none'>Sign Up Now</p>
                        </div>
                    </div>



                </div>
            </div>
        );
    };
};