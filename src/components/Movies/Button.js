import React from "react";
import {useDispatch} from "react-redux";
import {loadMoreMovies} from "../../store/actions";

const Button = ({ name }) => {
    const dispatch = useDispatch();

    return <button type="button"
                   data-testid="button_element"
                   onClick={() => dispatch(loadMoreMovies())}>{name}</button>
}

export default Button;