import { Link } from "react-router-dom";
import "./index.css";
import { SearchInput } from "../SearchInput";
import CartIcon from "../../../assets/icons/cart.svg";

export const Navbar = () => {
    return (
        <header className="header">
            <div className="wrap">
                <div className="link-group">
                    <div className="brand-name">E-commerce</div>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/categories">Categories</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </nav>
                    <form className="search-form" action="">
                        <SearchInput />
                    </form>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/cart-detail"><img src={CartIcon} alt="Cart icon" /></Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}