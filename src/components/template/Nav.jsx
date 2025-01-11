import { Link } from 'react-router-dom'
import './Nav.css'
import React from 'react'

export default props =>
    <aside className="menu-area">
        <div className='fundo'>
            <nav className="menu">
                <Link to="/">
                    <i className="fa fa-home"></i>Início
                </Link>
                <Link to="/users">
                    <i className="fa fa-users"></i>Usuários
                </Link>
            </nav>
        </div>
    </aside>