import {React,useState} from 'react'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Upload from './components/Upload';
import Start from './components/Start';
import Login from './components/sign_in';
import Register from './components/sign_up';
import Upp from './components/up';
import Chatlogin from './components/Chatlogin';

function App() {
  const [ user, setLoginUser] = useState({})
  return (
    <Router>
      <Routes>
      <Route path="/" >
        {
          user && user._id ? <Start />:<Login setLoginUser={setLoginUser}/> 
        }
      </Route>
     <Route path='/signin' >
      <Login setLoginUser={setLoginUser} />
     </Route>
     <Route path='/signup' element={<Register/>}/>
     <Route path="/upload" element={<Upp />} />
      <Route path="/chat" element={<Chatlogin />}/>
     </Routes>
    </Router>
  );
}

export default App;
