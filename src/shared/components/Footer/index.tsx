import styled from "styled-components"

const FooterContainer = styled.footer`
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: normal;
    font-size: 24px;
    box-sizing: border-box;
    color: rgb(153, 153, 153);
    margin-top: 30px;
`;

export const Footer = () => {
    return (
        <FooterContainer>
            <p>Made by <a href="https://github.com/montexbjeliseo" target="_blank" rel="noreferrer">montexbjeliseo</a></p>
        </FooterContainer>
    )
}