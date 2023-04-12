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
import Home from './pages/Home/Home';
import { MoviesCatalog } from './pages/MoviesCatalog/MoviesCatalog';
import { SeriesCatalog } from './pages/SeriesCatalog/SeriesCatalog';
import { ShowDetails } from './pages/ShowDetails/ShowDetails';
import { GenreCatalog } from './pages/GenreCatalog/GenreCatalog';
import './App.css';
import Loader from './components/shared/Loader/Loader';
import { ScrollButton } from './components/layout/Header/ScrollButton/ScrollButton';

const EditShow = React.lazy(() => import('./pages/Admin/EditShow/EditShow'));
const AddNew = React.lazy(() => import('./pages/Admin/AddNew/AddNew'));
const PageNotFound = React.lazy(() => import('./pages/PageNotFound/PageNotFound'));
const Reset = React.lazy(() => import('./components/auth/Reset/Reset'));
const Genres = React.lazy(() => import('./pages/Genres/Genres'));
const Register = React.lazy(() => import('./components/auth/Register/Register'));
const Watchlist = React.lazy(() => import('./pages/Watchlist/Watchlist'));

function App() {
    const navigate = useNavigate();
    const GlobalErrorHandler = () => {
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

                            <Routes>
                                <Route path='/' element={<Home />} />
                                <Route element={<GuestGuard />}>
                                    <Route path='/login' element={<Login />} />
                                    <Route
                                        path='/register'
                                        element={
                                            <Suspense fallback={<Loader />}>
                                                <Register />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path='/reset'
                                        element={
                                            <Suspense fallback={<Loader />}>
                                                <Reset />
                                            </Suspense>
                                        }
                                    />
                                </Route>
                                <Route element={<AuthGuard />}>
                                    <Route path='/logout' element={<Logout />} />
                                    <Route
                                        path='/watchlist'
                                        element={
                                            <Suspense fallback={<Loader />}>
                                                <Watchlist />
                                            </Suspense>
                                        }
                                    />
                                    <Route element={<AdminGuard />}>
                                        <Route
                                            path='/add'
                                            element={
                                                <Suspense fallback={<Loader />}>
                                                    <AddNew />
                                                </Suspense>
                                            }
                                        />
                                        <Route
                                            path='/:type/:showId/edit'
                                            element={
                                                <Suspense fallback={<Loader />}>
                                                    <EditShow />
                                                </Suspense>
                                            }
                                        />
                                    </Route>
                                </Route>
                                <Route path='/movies' element={<MoviesCatalog />} />
                                <Route path='/series' element={<SeriesCatalog />} />
                                <Route
                                    path='/genres'
                                    element={
                                        <Suspense fallback={<Loader />}>
                                            <Genres />
                                        </Suspense>
                                    }
                                />
                                <Route path='/catalog/:genre' element={<GenreCatalog />} />
                                <Route path='/catalog/:type/:showId' element={<ShowDetails />} />
                                <Route path="*" element={<PageNotFound />} />
                            </Routes>
                        </main>
                    </ShowsProvider>
                    <ScrollButton />
                    <ToastContainer theme='dark' icon={true} position={'top-right'} />
                </AuthProvider>
            </div>
        </ErrorBoundary>
    );
}

export default App;
