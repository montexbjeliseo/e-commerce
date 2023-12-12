import { Link } from "react-router-dom";
import "./index.css";
import CartIcon from "../../../assets/icons/cart.svg";
import { useState } from "react";
import { BurgerButton } from "../BurgerButton";
import { useAuth } from "../../../contexts/AuthProvider";
import { APP_ROUTES } from "../../../constants";

export const Navbar = () => {

    const { isAuthenticated } = useAuth();

    const [toggleShowLinks, setToggleShowLinks] = useState(false);

    return (
        <header className="header">
            <div className="wrap">
                <div className="brand-name">E-commerce</div>
                <div className="toggle-show-links-button">
                    <BurgerButton open={toggleShowLinks} handleClick={() => setToggleShowLinks(!toggleShowLinks)} />
                </div>
                <nav className={toggleShowLinks ? "show-links" : ""}>
                    <ul>
                        <li>
                            <Link onClick={() => setToggleShowLinks(false)} to={APP_ROUTES.HOME}>Home</Link>
                        </li>
                        <li>
                            <Link onClick={() => setToggleShowLinks(false)} to={APP_ROUTES.CATEGORIES}>Categories</Link>
                        </li>
                        <li>
                            <Link onClick={() => setToggleShowLinks(false)} to={APP_ROUTES.PRODUCTS}>Products</Link>
                        </li>
                        <li>
                            {/* <SearchInput /> */}
                        </li>
                        <li className="cart-link">
                            <Link onClick={() => setToggleShowLinks(false)} to={APP_ROUTES.CART}>
                                <img src={CartIcon} alt="Cart icon" />
                            </Link>
                        </li>
                        {
                            isAuthenticated ? (
                                <>
                                    <li className="register-link"><a onClick={() => setToggleShowLinks(false)} href="#">Profile</a></li>
                                    <li className="login-link"><Link onClick={() => setToggleShowLinks(false)} to={APP_ROUTES.LOGOUT}>Logout</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className="login-link">
                                        <Link onClick={() => setToggleShowLinks(false)} to={APP_ROUTES.LOGIN}>Login</Link>
                                    </li>
                                    <li className="register-link">
                                        <Link onClick={() => setToggleShowLinks(false)} to={APP_ROUTES.REGISTER}>Register</Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </nav>

            </div>
        </header>
    )
}