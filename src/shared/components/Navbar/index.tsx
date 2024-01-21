import styled from "styled-components";

const StyledNavbar = styled.nav`
    
    a {
        text-decoration: none;
        color: white;
        padding: 10px;
        font-size: 14px;
        font-weight: 700;
        opacity: .5;
    }

    a:hover {
        opacity: 1;
        color: aqua;
        border-bottom: 2px solid aqua;
    }

    a.active {
        opacity: 1;
    }

    @media screen and (max-width: 768px) {
        display: none;

        &.open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            background: inherit;
            padding: 0 10px;
            z-index: 1000;
            padding: 10px;
        }
    }
`;

type Props = {
    open: boolean;
    children: React.ReactNode;
}

export const Navbar: React.FC<Props> = ({ children, open }) => {
    return (
        <StyledNavbar className={open ? 'open' : ''}>
            {children}
        </StyledNavbar>
    )
}