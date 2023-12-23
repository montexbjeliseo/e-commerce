import { Link } from "react-router-dom";
import "./index.css";
import CartIcon from "../../../assets/icons/cart.svg";
import { useState } from "react";
import { BurgerButton } from "../BurgerButton";
import { APP_ROUTES } from "../../../constants";
import { useCart } from "../../../contexts/CartProvider";
import { LoggedUserComponent } from "../../../guards/LoggedUserComponent";
import { NoLoggedUserComponent } from "../../../guards/NoLoggedUserComponent";

export const Navbar = () => {

    const [toggleShowLinks, setToggleShowLinks] = useState(false);

    const { items } = useCart();

    const handleClickLink = () => {
        setToggleShowLinks(false);
    }

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
                            <Link onClick={handleClickLink} to={APP_ROUTES.HOME}>Home</Link>
                        </li>
                        <li>
                            <Link onClick={handleClickLink} to={APP_ROUTES.CATEGORIES}>Categories</Link>
                        </li>
                        <li>
                            <Link onClick={handleClickLink} to={APP_ROUTES.PRODUCTS}>Products</Link>
                        </li>
                        <li className="cart-link">
                            <Link onClick={handleClickLink} to={APP_ROUTES.CART}>
                                <img src={CartIcon} alt="Cart icon" />
                                <LoggedUserComponent><sup>{items.length}</sup></LoggedUserComponent>
                            </Link>
                        </li>

                        <LoggedUserComponent>
                            <li className="register-link"><a>Profile</a></li>
                            <li className="login-link"><Link onClick={handleClickLink} to={APP_ROUTES.LOGOUT}>Logout</Link></li>
                        </LoggedUserComponent>
                        <NoLoggedUserComponent>
                            <li className="login-link">
                                <Link onClick={handleClickLink} to={APP_ROUTES.LOGIN}>Login</Link>
                            </li>
                            <li className="register-link">
                                <Link onClick={handleClickLink} to={APP_ROUTES.REGISTER}>Register</Link>
                            </li>
                        </NoLoggedUserComponent>
                    </ul>
                </nav>

            </div>
        </header>
    )
}