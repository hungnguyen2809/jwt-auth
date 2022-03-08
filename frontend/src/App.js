import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Components/Home/HomePage';
import Login from './Components/Login/Login';
import NavBar from './Components/NavBar/NavBar';
import Register from './Components/Register/Register';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
