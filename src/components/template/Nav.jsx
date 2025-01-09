import { Link } from 'react-router-dom'
import logo from '../../assets/imgs/img.jpg'
import './Nav.css'
import React from 'react'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <img className="foto" src={logo} alt="logos" />
                <p>Ola</p>
            </Link>
            <Link to="/">
                <i className="fa fa-home"></i>Início
            </Link>
            <Link to="/">
                <i className="fa fa-home"></i>Início
            </Link>
            <Link to="/users">
                <i className="fa fa-users"></i>Usuários
            </Link>
        </nav>
    </aside>