import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Logout } from './components/Logout/Logout';
import Register from './components/Register/Register';
import Reset from './components/Reset/Reset';

function App() {

    return (

        <div className="App">
          <Header/>  
            <Routes>
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/logout' element={<Logout/>} />
                <Route path='/reset' element={<Reset/>} />
            </Routes>
        </div>
    );
}

export default App;
