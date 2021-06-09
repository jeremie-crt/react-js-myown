import React, {useContext} from "react";
import { Link} from "react-router-dom";

import sessionContext from "../MyContext";
import './HeaderNav.css'

const HeaderNav = (props) => {

    let context = useContext(sessionContext)

    let hideSigns = context.state ? 'hidden' : 'show';
    let hideLogout = context.state ? 'show' : 'hidden';

    setTimeout(() => {
        document.body.querySelectorAll('.signing').forEach(item => {
            item.classList.add(hideSigns)
        })
        document.body.querySelector('.logout').classList.add(hideLogout)
    }, 50)

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to='/' className="navbar-brand">Homepage <span className="sr-only">(current)</span></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link to='/articles' className="nav-link">Articles <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/about' className="nav-link">About <span className="sr-only">(current)</span></Link>
                    </li>

                    <li className="nav-item dropdown">
                        <Link to='/myaccount' className="nav-link dropdown-toggle" id="navbarDropdownMenuLink"
                              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">SubMenu <span className="sr-only">(current)</span></Link>

                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link to='/myaccount/info' className="dropdown-item">My Account</Link>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to='/signin' className="nav-link signing">SignIn<span className="sr-only">(current)</span></Link>
                        <Link to='/signup' className="nav-link signing">SignUp<span className="sr-only">(current)</span></Link>
                        <Link to='/signout' className="nav-link logout">SignOut<span className="sr-only">(current)</span></Link>
                    </li>
                </ul>
            </div>
        </nav>


    )
}

export default HeaderNav