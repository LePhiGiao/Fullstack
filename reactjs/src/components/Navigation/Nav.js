import { useEffect, useState } from 'react';
import './Nav.scss'
import { NavLink, useLocation } from 'react-router-dom';

const Nav = () => {
    const [isShow, setIsShow] = useState(true)
    let location = useLocation()
    useEffect(() => {
        if (location.pathname === '/login') {
            setIsShow(false)
        }
    }, [location])

    return (
        <>
            {isShow &&
                <div className="topnav">
                    <NavLink to="/" exact>Home</NavLink>
                    <NavLink to="/users">User</NavLink>
                    <NavLink to="/project">Project</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            }
        </>
    )
}

export default Nav;
