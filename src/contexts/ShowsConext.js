import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { getAll, getAllFromWatchlist, getOne } from "../services/showsService";
import { useAuthContext } from "./AuthContext";

const ShowsContext = createContext();
export const useShowsContext = () => useContext(ShowsContext);

const showReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_SHOWS':
            return action.payload;
        case 'SORT_SHOWS':
            return [...action.payload];
        case 'ADD_SHOW':
            return [action.payload, ...state];
        case 'EDIT_SHOW':
            return state.map(x => x.id === action.showId ? action.payload : x);
        case 'DELETE_SHOW':
            return state.filter(x => x.id !== action.showId);
        default:
            return state;
    }
};


export const ShowsProvider = ({ children }) => {

    const [allShowsList, setAllShowsList] = useState([]);
    const [watchlist, setWatchlist] = useState(null);
    const { currentUser } = useAuthContext();
    const [movies, dispatchMovies] = useReducer(showReducer, []);
    const [series, dispatchSeries] = useReducer(showReducer, []);


    useEffect(() => {
        getAll('Movie')
            .then(result => {
                const action = {
                    type: 'ADD_SHOWS',
                    payload: result
                };
                dispatchMovies(action);
            });

        getAll('Series')
            .then(result => {
                const action = {
                    type: 'ADD_SHOWS',
                    payload: result
                };
                dispatchSeries(action);
            });
    }, []);

    useEffect(() => {

        if (currentUser?.uid) {
            getAllFromWatchlist(currentUser.uid)
                .then(result => {
                    result.forEach(async (x, i) => {
                        const show = await getOne(x.showId, x.type);
                        if (i === 0) {
                            return setWatchlist([show]);
                        } else {
                            return setWatchlist(state => [...state, show]);
                        }
                    });
                    setWatchlist([]);
                });
        };

    }, [currentUser?.uid]);

    useEffect(() => {
        setAllShowsList([...movies, ...series]);
    }, [series, movies]);


    const showEdit = (showId, showData, type) => {
        if (type === 'Movie') {
            dispatchMovies({
                type: 'EDIT_SHOW',
                payload: showData,
                showId
            });
        } else {
            dispatchSeries({
                type: 'EDIT_SHOW',
                payload: showData,
                showId
            });
        }
    };

    const showDelete = (showId, type) => {
        if (type === 'Movie') {
            dispatchMovies({
                type: 'DELETE_SHOW',
                showId
            });
        } else {
            dispatchSeries({
                type: 'DELETE_SHOW',
                showId
            });
        }
    };

    const showAdd = (showData, type) => {
        if (type === 'Movie') {

            dispatchMovies({
                type: 'ADD_SHOW',
                payload: showData,
            });
        } else {
            dispatchSeries({
                type: 'ADD_SHOW',
                payload: showData,
            });
        }

    };

    const showsSort = (showsData, type) => {
        if (type === 'Movie') {

            dispatchMovies({
                type: 'SORT_SHOWS',
                payload: showsData,
            });
        } else {
            dispatchSeries({
                type: 'SORT_SHOWS',
                payload: showsData,
            });
        }
    }

    return <ShowsContext.Provider value={{
        moviesList: movies,
        seriesList: series,
        watchlist,
        setWatchlist,
        allShowsList,
        showEdit,
        showAdd,
        showsSort,
        showDelete
    }}>
        {children}
    </ShowsContext.Provider>
};