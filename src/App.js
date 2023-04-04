import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/layout/Header/Header';
import { Login } from './components/auth/Login/Login';
import { Logout } from './components/auth/Logout/Logout';
import { AuthProvider } from './contexts/AuthContext';
import { Home } from './pages/Home/Home';
import { AddNew } from './pages/Admin/AddNew/AddNew';
import { ShowsProvider } from './contexts/ShowsConext';
import { Watchlist } from './pages/Watchlist/Watchlist';
import { MoviesCatalog } from './pages/MoviesCatalog/MoviesCatalog';
import { SeriesCatalog } from './pages/SeriesCatalog/SeriesCatalog';
import { ShowDetails } from './pages/ShowDetails/ShowDetails';
import { EditShow } from './pages/Admin/EditShow/EditShow';
import { Genres } from './pages/Genres/Genres';
import { GenreCatalog } from './pages/GenreCatalog/GenreCatalog';
import { Register } from './components/auth/Register/Register';
import { Reset } from './components/auth/Reset/Reset';

function App() {

    return (

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
    );
}

export default App;
