import styled from "styled-components";

export const CartPageLayout = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media screen and (max-width: 576px) {
        grid-template-columns: 1fr;
        padding: 20px;
    }
    @media screen and (max-width: 768px) {
        padding: 0 20px;
    }
`;