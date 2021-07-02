import React from 'react';
import {useEffect} from 'react';
import {setError, showMovies} from '../../store/actions/index';
import {useDispatch, useSelector} from 'react-redux';
import {key} from "./utils";
import Button from "./Button";

const Movies = () => {
    const dispatch = useDispatch();
    const mergedTitlesPaths = useSelector(state => state.moviesReducer.mergedTitlesPaths)
    const page = useSelector(state => state.moviesReducer.page);

    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${page}`;


    useEffect(
        () => {
            fetch(url)
                .then(requestResult => requestResult.json())
                .then(page => dispatch(showMovies(page.results.map(result => result.poster_path),
                    page.results.map(result => result.original_title))
                    )
                )
                .catch(error => dispatch(setError(error)))
        }, [dispatch, mergedTitlesPaths]
    )

    const movieElements = Array.from(mergedTitlesPaths)
        .map(([key, value]) => <div className="flex-column" key={key}>
            <p>{key}</p>
            <img className="poster" src={`http://image.tmdb.org/t/p/w185${value}`} alt={key}/>
        </div>)

    return <div className="flex-column">
        <div className="flex-row  black">{movieElements}</div>
        <Button name="Show more movies"/>
    </div>;
}

export default Movies;
