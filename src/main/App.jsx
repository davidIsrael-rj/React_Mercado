import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'

import React from 'react'
import { BrowserRouter } from 'react-router-dom'

export default props =>
    <BrowserRouter>
        <div className="app">
            <h1>Mercados</h1>
        </div>
    </BrowserRouter>