import styled from "styled-components"

const FooterContainer = styled.footer`
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Public Sans;
    font-style: normal;
    font-size: 24px;
    box-sizing: border-box;
    color: #111;
    margin-top: 30px;
`;

export const Footer = () => {
    return (
        <FooterContainer>
            @montexbjeliseo.  All rights reserved.
        </FooterContainer>
    )
}