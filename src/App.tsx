import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Account } from './pages/Account'
import { Navbar } from './components/Navbar'
import { useEffect, useRef, useState } from 'react';
import SearchBar from './components/SearchBar';
import { Movies } from './pages/Movies';
import "./index.css"
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Footer } from './components/Footer';
import { TVShows } from './pages/TVShows';
import { Title } from './pages/Title';
import { Login } from './pages/Login';

function App() {
    const [searchActive, setSearchActive] = useState(false);
    const searchWrapperRef = useRef<HTMLDivElement | null>(null);
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const [highlightSearchInput, setHighlightSearchInput] = useState(false);

    const handleClickOutside = (e: any) => {
        // 👇 If click happened *outside* the SearchBar wrapper, close it
        if (
            searchWrapperRef.current &&
            !searchWrapperRef.current.contains(e.target)
        ) {
            setSearchActive(false);
        };
    };

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "k") {
                event.preventDefault();
                searchActive ? setSearchActive(false) : setSearchActive(true);
            };

            if (event.key === "Escape") {
                event.preventDefault();
                setSearchActive(false);
            };
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (searchActive) {
            if (searchInputRef.current) {
                searchInputRef.current.focus();
            }
            setHighlightSearchInput(true);
        } else {
            if (searchInputRef.current) {
                searchInputRef.current.blur();
            }
            setHighlightSearchInput(false);
        };
    }, [searchActive]);

    const noFooterPages = [
        'tv-shows',
        'movies',
        'login',
        'sign-up'
    ];

    return (
        <>
            <Router>
                <div className="h-screen flex flex-col bg-[#191919] no-scrollbar relative">
                    <Navbar setSearchActive={setSearchActive} ref={searchInputRef} />

                    {/* Search Overlay */}
                    <div
                        onClick={handleClickOutside}
                        className={`${searchActive
                            ? 'opacity-100 touch-auto pointer-events-auto'
                            : 'opacity-0 touch-none pointer-events-none'
                            } transition-all duration-200 absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-start items-center gap-2 bg-transparent w-full overflow-clip z-[500000]`}
                    >
                        <div
                            className={`${searchActive
                                ? 'opacity-20 touch-auto pointer-events-auto'
                                : 'opacity-0 touch-none pointer-events-none'
                                } transition-all duration-200 absolute top-0 w-full bottom-0 left-0 right-0 flex flex-col justify-start items-center gap-2 bg-black z-[500000]`}
                            onClick={() => setSearchActive(false)}
                        />
                        <div
                            ref={searchWrapperRef}
                            className="absolute z-[5000001] top-[40%] w-full flex flex-col justify-start items-center gap-2"
                        >
                            <SearchBar
                                ref={searchInputRef}
                                setSearchActive={setSearchActive}
                                shouldHighlight={highlightSearchInput}
                            />
                        </div>
                    </div>

                    {/* Main content below the navbar */}
                    <div className="flex-1 pt-16 overflow-auto no-scrollbar">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/tv-shows" element={<TVShows />} />
                            <Route path="/movies" element={<Movies />} />
                            <Route path="/title" element={<Title />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        </Routes>

                        {/* Footer */}
                        {!noFooterPages.includes(window.location.pathname.slice(0, 1)) && (
                            <div className="flex items-center justify-center w-full h-20 bg-[#191919]">
                                <Footer />
                            </div>
                        )}
                    </div>
                </div>
            </Router>
        </>
    );
};

export default App
