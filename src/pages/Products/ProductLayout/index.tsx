import styled from "styled-components";

export const ProductDetailContainer = styled.article`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const ProductInformationContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const MutedText = styled.p`
    opacity: 0.6;
`;