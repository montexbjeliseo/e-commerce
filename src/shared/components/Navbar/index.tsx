import { Link } from "react-router-dom";
import "./index.css";
import CartIcon from "../../../assets/icons/cart.svg";
import { useState } from "react";
import { BurgerButton } from "../BurgerButton";
import { useAuth } from "../../../contexts/AuthProvider";
import { APP_ROUTES } from "../../../constants";
import { useCart } from "../../../contexts/CartProvider";
import { Modal } from "../Modal";
import styled from "styled-components";
import { LoggedUserComponent } from "../../../guards/LoggedUserComponent";
import { NoLoggedUserComponent } from "../../../guards/NoLoggedUserComponent";

const AdminInfoPanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    align-items: center;
    justify-content: center;
`;

export const Navbar = () => {

    const [showEnableAdminPanel, setShowEnableAdminPanel] = useState(false);

    const [adminPassword, setAdminPassword] = useState("");

    const { isAdmin, loginAsAdmin } = useAuth();

    const [toggleShowLinks, setToggleShowLinks] = useState(false);

    const { items } = useCart();

    const handleClickLink = () => {
        setToggleShowLinks(false);
    }

    const handleClickEnableAdmin = () => {
        handleClickLink();
        setShowEnableAdminPanel(true);
    }

    const handleLoginAsAdmin = () => {
        loginAsAdmin(adminPassword);
        setAdminPassword("");
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
                            <li className="register-link"><a onClick={handleClickEnableAdmin}>Admin</a></li>
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
            {showEnableAdminPanel && (
                <Modal onClose={() => setShowEnableAdminPanel(false)} isOpen={showEnableAdminPanel}>
                    <AdminInfoPanel>
                        {isAdmin ? (
                            <>
                                <strong>Disable Admin Panel</strong>
                                <p>Admin is enabled</p>
                                <button className="btn btn-primary" type="button" onClick={handleLoginAsAdmin}>Disable</button>
                            </>
                        ) : (
                            <>
                                <strong>Enable Admin Panel</strong>
                                <input
                                    className="text-input"
                                    placeholder="Enter admin password"
                                    type="text"
                                    name="adminPassword"
                                    value={adminPassword}
                                    onChange={(e) => setAdminPassword(e.target.value)}
                                />
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    disabled={!adminPassword} onClick={handleLoginAsAdmin}>Enable</button>
                            </>
                        )}
                    </AdminInfoPanel>
                </Modal>
            )}
        </header>
    )
}