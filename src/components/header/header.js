
import React from 'react';
import './header.css';
import {Link} from 'react-router-dom';

// Шапка страницы. 
// Ссылки кликабельны, открывают блоки без перезагрузки всей страницы
const Header = () => {
    return (
        <div className="header">
            <h3 className="header-title">
                <Link to='/'>
                Game of Thrones DB
                </Link>
            </h3>
            <ul className="header-list">
                <li>
                    <Link to='/characters/'>Characters</Link>
                </li>
                <li>
                    <Link to='/houses/'>Houses</Link>
                </li>
                <li>
                    <Link to='/books/'>Books</Link>   
                </li>
            </ul>
        </div>
    );
};

export default Header;

// link to='' для того чтобы работали сами ссылки -связываем с app.js
// Link не перезагружает всю страницу в отличии от href