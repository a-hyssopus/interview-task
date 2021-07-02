import {SHOW_MOVIE, LOAD_MORE_MOVIES, SET_ERROR} from '../types/types';

const initialState = {
    page: 1,
    poster_paths: [],
    titles: [],
    mergedTitlesPaths: new Map(),
    error: false,
};

export const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MOVIE: {
            const formattedMergedArrays = new Map();
            for (let i=0; i < state.titles.length; i++) {
                formattedMergedArrays.set(state.titles[i], state.poster_paths[i])
            }
            return {
                ...state,
                poster_paths: action.poster_paths,
                titles: action.titles,
                mergedTitlesPaths: formattedMergedArrays
            };
        }
        case LOAD_MORE_MOVIES: {
            return {
                ...state,
                page: state.page+1
            }
        }
        case SET_ERROR: {
            return {
                ...state,
                error: true
            }
        }
        default:
            return state;
    }
};
