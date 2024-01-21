import { Link } from "react-router-dom";
import { useState } from "react";
import { BurgerButton } from "../BurgerButton";
import { APP_ROUTES } from "../../../constants";
import { useCart } from "../../../contexts/CartProvider";
import { NoAuthenticatedComponentGuard } from "../../../guards/NoAuthenticatedComponent";
import { AuthenticatedComponentGuard } from "../../../guards/AuthenticatedComponent";
import styled from "styled-components";
import { Brandname } from "../Brandname";
import { Navbar } from "../Navbar";
import { CartIcon } from "../../Icons";

const StyledHeader = styled.header`
    height: 60px;

    .wrapper {
        display: flex;
        max-width: 1120px;
        background-color: rgb(31, 31, 31);
        margin: auto;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        border-color: rgb(43, 43, 43);
        border-style: solid;
        border-width: 2px;
        border-top: 0;
        height: 100%;
    }

    .toggle-show-links-button {
        display: none;
    }

    @media screen and (max-width: 768px) {
        .toggle-show-links-button {
            display: block;
        }
    }
`;

export const Header = () => {

    const [toggleShowLinks, setToggleShowLinks] = useState(false);

    const { items } = useCart();

    const handleClickLink = () => {
        setToggleShowLinks(false);
    }

    return (
        <StyledHeader className="header">
            <div className="wrapper">
                <Brandname />
                <div className="toggle-show-links-button">
                    <BurgerButton open={toggleShowLinks} handleClick={() => setToggleShowLinks(!toggleShowLinks)} />
                </div>
                <Navbar open={toggleShowLinks}>
                    <Link onClick={handleClickLink} to={APP_ROUTES.HOME}>Home</Link>

                    <Link onClick={handleClickLink} to={APP_ROUTES.CATEGORIES}>Categories</Link>

                    <Link onClick={handleClickLink} to={APP_ROUTES.PRODUCTS}>Products</Link>

                    <AuthenticatedComponentGuard>
                        <Link onClick={handleClickLink} to={APP_ROUTES.LOGOUT}>Logout</Link>
                    </AuthenticatedComponentGuard>
                    <NoAuthenticatedComponentGuard>
                        <Link onClick={handleClickLink} to={APP_ROUTES.LOGIN}>Login</Link>
                        <Link onClick={handleClickLink} to={APP_ROUTES.REGISTER}>Register</Link>
                    </NoAuthenticatedComponentGuard>
                    <Link onClick={handleClickLink} to={APP_ROUTES.CART}>
                        <CartIcon />
                        <AuthenticatedComponentGuard><sup>{items.length}</sup></AuthenticatedComponentGuard>
                    </Link>
                </Navbar>

            </div>
        </StyledHeader>
    )
}