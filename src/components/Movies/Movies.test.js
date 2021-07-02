import Movies from "./Movies"
import {render, screen} from "@testing-library/react"
import '@testing-library/jest-dom'
import {Provider} from "react-redux";
import configureStore from "../../store/configureStore";
import userEvent from "@testing-library/user-event";
import createStore from "./../../store/configureStore"

const store = configureStore();

const renderWithRedux = (
    component,
    { initialState, store = createStore() } = {}
) => {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store,
    }
}

describe('Movies component', () => {
    test('renders movies\' posters and titles if request succeeds', async () => {
        renderWithRedux(<Movies/>)

        const posterElements = await screen.findAllByRole("img")
        const titleElements = await screen.getByText("luca", {exact: false})
        expect(posterElements).not.toHaveLength(0)
        expect(titleElements).toBeInTheDocument()
    })

    test('renders a new line of movies when the button is clicked', async () => {
        renderWithRedux(<Movies/>)

        const buttonElement = screen.getByRole("button", {selector: "button"})
        userEvent.click(buttonElement)

        const firstMovieToDisappear = screen.queryByText("luca", {exact: false})
        expect(firstMovieToDisappear).not.toBeInTheDocument()
    })

    test('can set an initial state for the movies\' page', async () => {
        renderWithRedux(<Movies/>, {page: 3})

        const firstMovieToDisappear = screen.queryByText("luca", {exact: false})
        expect(firstMovieToDisappear).not.toBeInTheDocument()
    })

    test('renders poster\'s title if succeed', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{ "page": 1, results: [{"original_title": "Witcher", "poster_path":"/jTswp6KyDYKtvC52GbHagrZbGvD.jpg"},
                                                      {"original_title": "Interstellar", "poster_path":"/jTswp6KyDYKtvC52GbHagrZbGvD.jpg"}]}]
        })

        renderWithRedux(<Movies/>)

        const posterElements = screen.getByAltText("witcher", {exact: false})
        const titleElements = screen.getByText("witcher", {exact: false})
        expect(posterElements).not.toHaveLength(0)
        expect(titleElements).toBeInTheDocument()
    })
})