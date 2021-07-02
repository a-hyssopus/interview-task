import React from 'react';
import Movies from './Movies/Movies';
import {useSelector} from "react-redux";

export const App = () => {
    const error = useSelector(state => state.moviesReducer.error)
    let content;
    error ? content = (<div className="error">Sorry, the server is unavailable now</div>) : content = <Movies/>

    return (
        <div className="app">
            {content}
        </div>
    );
};