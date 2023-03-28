import { createContext, useContext, useEffect, useState } from "react";
import { getAll, getAllFromWatchlist, getOne } from "../services/showsService";
import { useAuthContext } from "./AuthContext";

const ShowsContext = createContext();
export const useShowsContext = () => useContext(ShowsContext);
export const ShowsProvider = ({ children }) => {
    const [moviesList, setMoviesList] = useState([]);
    const [seriesList, setSeriesList] = useState([]);
    const [userWatchlist, setUserWatchlist] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const { currentUser } = useAuthContext();
    useEffect(() => {

        getAll('Movie')
            .then(docs => {
                docs.forEach((doc) => {
                    // arr.push({
                    //     id: doc.id,
                    //     fields: doc.fields
                    // });
                    setMoviesList(state => [...state, { id: doc.id, fields: doc.fields }]);
                    console.log(moviesList);
                });
                // setMoviesList(arr);
            });
        getAll('Series')
            .then(docs => {
                docs.forEach((doc) => {
                    // arr.push({
                    //     id: doc.id,
                    //     fields: doc.fields
                    // });
                    setSeriesList(state => [...state, { id: doc.id, fields: doc.fields }]);
                });
                // setMoviesList(arr);
            });
        
    }, []);
    useEffect(() => {

        if (currentUser?.uid) {
            getAllFromWatchlist(currentUser.uid)
                .then(result => {
                    setUserWatchlist(result);
                    result.forEach(async (x) => {
                        const show = await getOne(x.showId, x.type);
                        setWatchlist(state => [...state, { id: show.id, fields: show.fields }]);
                    });
                });
        };

    }, [currentUser?.uid]);

//     useEffect(() => {
// console.log(userWatchlist);
//        userWatchlist.forEach(async (x) => {
//             const show = await getOne(x.showId, x.type);
//             setWatchlist(state => [...state, { id: show.id, fields: show.fields }]);
//             console.log(watchlist);
//         });

//     }, [userWatchlist]);

    return <ShowsContext.Provider value={{ moviesList, seriesList, watchlist, setWatchlist }}>
        {children}
    </ShowsContext.Provider>
};