import styled from "styled-components";

export const ProductArrivals = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;