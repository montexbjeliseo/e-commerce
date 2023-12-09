import { Link } from "react-router-dom";
import "./index.css";
import { SearchInput } from "../SearchInput";
import CartIcon from "../../../assets/icons/cart.svg";
import { useState } from "react";
import { BurgerButton } from "../BurgerButton";

export const Navbar = () => {

    const [ toggleShowLinks, setToggleShowLinks] = useState(false);

    return (
        <header className="header">
            <div className="wrap">
                <div className="brand-name">E-commerce</div>
                <div className="toggle-show-links-button">
                    <BurgerButton handleClick={() => setToggleShowLinks(!toggleShowLinks)}/>
                </div>
                <nav className={toggleShowLinks ? "show-links" : ""}>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/categories">Categories</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li>
                            <SearchInput />
                        </li>
                        <li className="cart-link"><Link to="/cart-detail"><img src={CartIcon} alt="Cart icon" /></Link></li>
                        <li className="login-link"><Link to="/login">Login</Link></li>
                    </ul>
                </nav>
                
            </div>
        </header>
    )
}