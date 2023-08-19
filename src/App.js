import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import MenuMain from './containers/main'
import ImprimirReceta from './containers/imprimir/receta'

const App = () => {

  return (  
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact path="/"
            element={<MenuMain />} />
          <Route
            exact path="/imprimir/receta/normal"
            element={<ImprimirReceta />} />
          <Route
            exact path="/imprimir/receta/antibioticos"
            element={<ImprimirReceta />} />
          <Route
            exact path="/imprimir/receta/controlados"
            element={<ImprimirReceta />} />
        </Routes>

      </div>
    </Router>
  )
}

export default App
