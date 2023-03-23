import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/layout/Header/Header';
import { Login } from './components/auth/Login/Login';
import { Logout } from './components/auth/Logout/Logout';
import Register from './components/auth/Register/Register';
import Reset from './components/auth/Reset/Reset';
import { AuthProvider } from './contexts/AuthContext';
import { Home } from './pages/Home/Home';
import { AddNew } from './pages/Admin/AddNew/AddNew';
import { ShowsProvider } from './contexts/ShowsConext';
import { Watchlist } from './pages/Watchlist/Watchlist';
import { MoviesCatalog } from './pages/MoviesCatalog/MoviesCatalog';

function App() {

    return (

        <div className='width'>
            <AuthProvider>
                <Header />
                <main className="main">
                    <ShowsProvider>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/add' element={<AddNew />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/reset' element={<Reset />} />
                    <Route path='/watchlist' element={<Watchlist />} />
                    <Route path='/movies' element={<MoviesCatalog />} />
                </Routes>
                </ShowsProvider>
                </main>
            </AuthProvider>
        </div>
    );
}

export default App;
