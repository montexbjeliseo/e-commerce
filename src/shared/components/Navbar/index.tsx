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
                    <BurgerButton open={toggleShowLinks} handleClick={() => setToggleShowLinks(!toggleShowLinks)}/>
                </div>
                <nav className={toggleShowLinks ? "show-links" : ""}>
                    <ul>
                        <li><Link onClick={() => setToggleShowLinks(false)} to="/">Home</Link></li>
                        <li><Link onClick={() => setToggleShowLinks(false)} to="/categories">Categories</Link></li>
                        <li><Link onClick={() => setToggleShowLinks(false)} to="/products">Products</Link></li>
                        <li>
                            <SearchInput />
                        </li>
                        <li className="cart-link"><Link onClick={() => setToggleShowLinks(false)} to="/cart-detail"><img src={CartIcon} alt="Cart icon" /></Link></li>
                        <li className="login-link"><Link onClick={() => setToggleShowLinks(false)} to="/login">Login</Link></li>
                    </ul>
                </nav>
                
            </div>
        </header>
    )
}