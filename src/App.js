import { Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Sidebar from './components/Sidebar/Sidebar';
import Profile from './pages/Profile/Profile';

function App() {
    return (
        <div className='app'>
            <Header />
            <Sidebar />

            {/* Modals */}
            <Login />
            <Register />
            {/* Modals */}

            {/* Pages */}
            <Route exact path='/profile'>
                <Profile />
            </Route>
        </div>
    );
}

export default App;
