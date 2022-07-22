import { BrowserRouter as Router,  Routes,  Route, Navigate} from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { login_action } from "./store";

function PrivateRoute({children: Profile}) {
  const token = useSelector((state) => state.token);

  return token === "" ? <Navigate to="/login"/> : Profile
}

function App() {
  // const token = ""
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  //useEffect changement token setItem 
  const didMount = useRef(false)
  useEffect(() => {
    if (didMount.current) {
      localStorage.setItem("token", token)
    }else {
      didMount.current = true;
    }
  },[token])
  useEffect(() => {
    if(localStorage.getItem("token") !== null){
      dispatch(login_action(localStorage.getItem("token")))
    }
  }
  , [])
  return (
      <Router>
        <Routes>
        <Route path="/" element={<Homepage />} />   
        <Route path="/login" element={<Login />} /> 
        <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />                  
        </Routes>
      </Router>    
  );
}

export default App;