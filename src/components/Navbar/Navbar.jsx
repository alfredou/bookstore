import { useNavigate, NavLink } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import './navbar.css'
import {
    faUser,
    faCartShopping,
    faGear,
    faListUl,
    faRightFromBracket,
    faChevronDown,
    faHouse,
    faBook,
    faCircleInfo,
    faEnvelope,
    faArrowRightToBracket
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { apiUrl } from '../../services/api';
import DarkModeComponent from '../ToggleMode/ToggleMode';

export function Navbar() {
    const { openCart, cartQuantity } = useShoppingCart()
    const navigate = useNavigate()
    const { user, dispatch } = useContext(AuthContext)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const handleLogout = async () => {
        try {
            const res = await apiUrl.get('/logout', { withCredentials: true })
            if (res.data) {
                dispatch({ type: 'LOGOUT' })
                setDropdownOpen(false)
                navigate('/login')
            }
        } catch (e) {
            console.error(e.message)
        }
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <header className="header">
            {/* Mobile Overlay */}
            <div
                className={`header__overlay ${mobileOpen ? 'open' : ''}`}
                onClick={() => setMobileOpen(false)}
                aria-hidden="true"
            />

            <div className="header__container">
                <NavLink to="/" className='header__logo'>Bookstore</NavLink>

                <div className="nav-center">
                    <ul className="header__links">
                        <li><NavLink to="/" className={({ isActive }) => isActive ? 'link active' : 'link'} onClick={() => setMobileOpen(false)}>Home</NavLink></li>
                        <li><NavLink to="/books/" className={({ isActive }) => isActive ? 'link active' : 'link'} onClick={() => setMobileOpen(false)}>Books</NavLink></li>
                        <li><NavLink to="/about" className={({ isActive }) => isActive ? 'link active' : 'link'} onClick={() => setMobileOpen(false)}>About</NavLink></li>
                        <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'link active' : 'link'} onClick={() => setMobileOpen(false)}>Contact</NavLink></li>
                    </ul>
                </div>

                <div className='header__actions'>
                    <DarkModeComponent />

                    <div className="header__user-area" ref={dropdownRef}>
                        {user ? (
                            <div className="profile-trigger" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                <img src={user.image || "/src/assets/user.jpg"} alt="User" className="nav-profile-img" />
                                <FontAwesomeIcon icon={faChevronDown} className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} />

                                {dropdownOpen && (
                                    <div className="profile-dropdown">
                                        <div className="dropdown-header">
                                            <span className="dropdown-name">{user.username}</span>
                                            <span className="dropdown-email">{user.email}</span>
                                        </div>
                                        <hr className="dropdown-divider" />
                                        <NavLink to="/user/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                                            <FontAwesomeIcon icon={faGear} />
                                            <span>Settings</span>
                                        </NavLink>
                                        <hr className="dropdown-divider" />
                                        <button className="dropdown-item logout" onClick={handleLogout}>
                                            <FontAwesomeIcon icon={faRightFromBracket} />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NavLink to="/login" className="header__icon-btn" title="Login">
                                <FontAwesomeIcon icon={faUser} className="header__icon" />
                            </NavLink>
                        )}
                    </div>

                    <button className="header__carticons" onClick={openCart} aria-label="Open cart">
                        <FontAwesomeIcon icon={faCartShopping} className="header__icon" />
                        {cartQuantity > 0 && <div className="header__quantity">{cartQuantity}</div>}
                    </button>

                    <button className="header__burger" onClick={() => setMobileOpen(v => !v)} aria-label="Toggle menu" style={{ zIndex: 10002 }}>
                        <span className={`burger ${mobileOpen ? 'open' : ''}`}></span>
                    </button>
                </div>

                <nav className={`header__nav ${mobileOpen ? 'open' : ''}`}>
                    <div className="mobile-nav-content">
                        {user && (
                            <div className="mobile-user-profile">
                                <img src={user.image || "/src/assets/user.jpg"} alt="User" className="mobile-profile-img" />
                                <div className="mobile-user-info">
                                    <span className="mobile-username">{user.username}</span>
                                    <span className="mobile-email">{user.email}</span>
                                </div>
                            </div>
                        )}
                        <ul className="header__links mobile">
                            <li><NavLink to="/" className={({ isActive }) => isActive ? 'link active' : 'link'} onClick={() => setMobileOpen(false)}><FontAwesomeIcon icon={faHouse} /> Home</NavLink></li>
                            <li><NavLink to="/books/" className={({ isActive }) => isActive ? 'link active' : 'link'} onClick={() => setMobileOpen(false)}><FontAwesomeIcon icon={faBook} /> Books</NavLink></li>
                            <li><NavLink to="/about" className={({ isActive }) => isActive ? 'link active' : 'link'} onClick={() => setMobileOpen(false)}><FontAwesomeIcon icon={faCircleInfo} /> About</NavLink></li>
                            <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'link active' : 'link'} onClick={() => setMobileOpen(false)}><FontAwesomeIcon icon={faEnvelope} /> Contact</NavLink></li>
                            {user && <li><NavLink to="/user/profile" className={({ isActive }) => isActive ? 'link active' : 'link'} onClick={() => setMobileOpen(false)}><FontAwesomeIcon icon={faUser} /> My Profile</NavLink></li>}
                            {!user && (
                                <li><NavLink to="/login" className={({ isActive }) => isActive ? 'link active' : 'link'} onClick={() => setMobileOpen(false)}><FontAwesomeIcon icon={faArrowRightToBracket} /> Login</NavLink></li>
                            )}
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}
