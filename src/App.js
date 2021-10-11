import './App.css';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Sidebar from './components/Sidebar/Sidebar';

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
        </div>
    );
}

export default App;
