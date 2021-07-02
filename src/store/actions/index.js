import { SHOW_MOVIE, LOAD_MORE_MOVIES, SET_ERROR } from '../types/types';

export const showMovies = (poster_paths, titles) => ({ type: SHOW_MOVIE, poster_paths, titles });
export const loadMoreMovies = () => ({type: LOAD_MORE_MOVIES});
export const setError = error => ({type: SET_ERROR, error})
