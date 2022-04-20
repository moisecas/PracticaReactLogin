import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
  
} from "react-router-dom"; 
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar";

function App() { //en router adentro de routes vamos agregando cada componente según sintaxis 
  return (
    <Router> 

      <div className="container">
        <Navbar/> 
        <Routes> 
          <Route path="/"/> 
          <Route path="/login" element={<Login />} />                                               
          <Route path="/admin"/>  
            
            
            
      
        </Routes>

        
      </div>

    </Router>

  );
}

export default App;
