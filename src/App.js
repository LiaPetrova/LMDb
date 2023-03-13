import { Route, Routes } from 'react-router-dom';
import styles from './App.css';
import { Header } from './components/layout/Header/Header';
import { Login } from './components/auth/Login/Login';
import { Logout } from './components/auth/Logout/Logout';
import Register from './components/auth/Register/Register';
import Reset from './components/auth/Reset/Reset';
import { AuthProvider } from './contexts/AuthContext';

function App() {

    return (

        <div className={`${styles.App} ${styles.width}`}>
            <AuthProvider>
                <Header />
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/reset' element={<Reset />} />
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
