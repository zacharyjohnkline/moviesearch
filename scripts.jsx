const Movies = ({movies}) => {
    if(movies.length <= 0){
        return <p>Loading...</p>
    }
    return (
        <div className='gallery'>
            {movies.map((movie, index) => (
                <div key={index} className='gallery-items'>
                <img src={movie.Poster} alt={movie.Title} height='200px'/>
                <p className='titles'>{movie.Title}</p>
                <p className="years">{movie.Year}</p>
                </div>
            ))}
        </div>
    )
}

function App() {
    const {useEffect, useReducer} = React;
    const initialState = {
        searchText: '',
        movies: []
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case "UPDATE_SEARCH_TEXT":
                return {
                    ...state,
                    searchText: action.payload,
                }
            case "UPDATE_MOVIES":
                return {
                    ...state,
                    movies: action.payload,
                }
            default:
                return state;
        }
    };
    
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function getStartupMovies() {
            const response = await axios.get('https://www.omdbapi.com/?s=bob&type=movie&apikey=7f117cec');
            const movieList = response.data.Search;
            movieList.forEach((item) => {
                console.log(item.Title)
            });
            // console.log(response.data.Search);
            dispatch({type: 'UPDATE_MOVIES', payload: movieList});
        }
        getStartupMovies();
    }, []);

    const handleChange = (event) => {
        dispatch({type: 'UPDATE_SEARCH_TEXT', payload: event.target.value});
    }
    const handleSubmit = async (event) => {
        // event.preventDefault();
        let inputField = document.getElementById('input');
        console.log(inputField.value);
        const response = await axios.get(`https://www.omdbapi.com/?s=${inputField.value}&type=movie&apikey=7f117cec`);
        const movieList = response.data.Search;
        inputField.value = '';
        dispatch({type: 'UPDATE_MOVIES', payload: movieList});
        if(!state.seachText) {
            return;
        }
    }
    return (
        <>
            <div className="search-items">
                <input type='text' placeholder='search movie title' onChange={handleChange} id='input'></input>
                <button onClick={handleSubmit} id="button">Search</button>
            </div>
            <div className='gallery'>
            <Movies movies={state.movies}/>
            </div>
        </>
    )  
}

ReactDOM.render(<App />, document.getElementById("root"));