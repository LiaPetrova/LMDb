import { Route, Routes, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { Suspense } from 'react';

import { GuestGuard } from './guards/GuestGuard';
import { AuthGuard } from './guards/AuthGuard';
import { AdminGuard } from './guards/AdminGuard';

import Header from './components/layout/Header/Header';
import { AuthProvider } from './contexts/AuthContext';
import { ShowsProvider } from './contexts/ShowsConext';
import { Login } from './components/auth/Login/Login';
import { Logout } from './components/auth/Logout/Logout';
import { Home } from './pages/Home/Home';
import { AddNew } from './pages/Admin/AddNew/AddNew';
import { MoviesCatalog } from './pages/MoviesCatalog/MoviesCatalog';
import { SeriesCatalog } from './pages/SeriesCatalog/SeriesCatalog';
import { ShowDetails } from './pages/ShowDetails/ShowDetails';
import { EditShow } from './pages/Admin/EditShow/EditShow';
import { Genres } from './pages/Genres/Genres';
import { GenreCatalog } from './pages/GenreCatalog/GenreCatalog';
import { Register } from './components/auth/Register/Register';
import { Reset } from './components/auth/Reset/Reset';
<<<<<<< HEAD
import { PageNotFound } from './pages/PageNotFound/PageNotFound';
import './App.css';
import Loader from './components/shared/Loader/Loader';

const Watchlist = React.lazy(() => import('./pages/Watchlist/Watchlist'));
=======
>>>>>>> parent of 87140975 (update)

function App() {
    const navigate = useNavigate();
    const GlobalErrorHandler = ({ error }) => {
        navigate('/');
        toast.error('Something went wrong!');
    };

    return (
        <ErrorBoundary FallbackComponent={GlobalErrorHandler}>
            <div className='width'>
                <AuthProvider>
                    <ShowsProvider>
                        <Header />
                        <main className="main">

<<<<<<< HEAD
                            <Routes>
                                <Route path='/' element={<Home />} />
                                <Route element={<GuestGuard />}>
                                    <Route path='/login' element={<Login />} />
                                    <Route path='/register' element={<Register />} />
                                    <Route path='/reset' element={<Reset />} />
                                </Route>
                                <Route element={<AuthGuard />}>
                                    <Route path='/logout' element={<Logout />} />
                                    <Route path='/watchlist'>
                                        <Suspense fallback={<Loader />}>
                                            <Route path='/watchlist' element={<Watchlist />} />
                                        </Suspense>
                                    </Route>
                                    <Route element={<AdminGuard />}>
                                        <Route path='/add' element={<AddNew />} />
                                        <Route path='/:type/:showId/edit' element={<EditShow />} />
                                    </Route>
                                </Route>
                                <Route path='/movies' element={<MoviesCatalog />} />
                                <Route path='/series' element={<SeriesCatalog />} />
                                <Route path='/genres' element={<Genres />} />
                                <Route path='/catalog/:genre' element={<GenreCatalog />} />
                                <Route path='/catalog/:type/:showId' element={<ShowDetails />} />
                                <Route path="*" element={<PageNotFound />} />
                            </Routes>
                        </main>
                    </ShowsProvider>
                    <ToastContainer theme='dark' icon={true} position={'top-right'} />
                </AuthProvider>
            </div>
        </ErrorBoundary>
=======
        <div className='width'>
            <AuthProvider>
                    <ShowsProvider>
                <Header />
                <main className="main">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/add' element={<AddNew />} />
                    <Route path='/:type/:showId/edit' element={<EditShow />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/reset' element={<Reset />} />
                    <Route path='/watchlist' element={<Watchlist />} />
                    <Route path='/movies' element={<MoviesCatalog />} />
                    <Route path='/series' element={<SeriesCatalog />} />
                    <Route path='/genres' element={<Genres />} />
                    <Route path='/catalog/:genre' element={<GenreCatalog />} />
                    <Route path='/catalog/:type/:showId' element={<ShowDetails />} />
                </Routes>
                </main>
                </ShowsProvider>
            </AuthProvider>
        </div>
>>>>>>> parent of 87140975 (update)
    );
}

export default App;
