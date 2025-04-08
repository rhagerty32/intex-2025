declare global {
    type Title = {
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
        random_rating: string
        tomatoRating: number,
        imdbRating: number,
        [key: string]: any
    };

    type RecentlyAdded = {
        obj: Title
        genres: string[]
    }
}

export { }