import { Link } from 'react-router-dom'
import './Nav.css'
import React from 'react'

export default props =>
    <aside className="menu-area">
        <div className='fundo'>
            <nav className="menu">
                <Link to="/">
                    <i className="fa fa-home"></i> Início
                </Link>
                <Link to="/users">
                    <i className="fa fa-users"></i> Usuários
                </Link>
                <Link to="/customer">
                    <i className="fa fa-child"></i> Cliente
                </Link>
                <Link to="/sector">
                    <i className="fa fa-cubes"></i> Setor
                </Link>
                <Link to="/product">
                    <i className='fa fa-cart-plus'></i> Produtos
                </Link>
                <Link to="/supplier">
                    <i className='fa fa-industry'></i> Fornecedor
                </Link>
            </nav>
        </div>
    </aside>