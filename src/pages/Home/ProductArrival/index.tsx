import styled from "styled-components";

export const ProductArrivals = styled.ul`
    list-style: none;
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    flex-direction: column;
    gap: 20px;
    @media screen and (max-width: 576px) {
        grid-template-columns: repeat(1, 1fr);
        text-align: center;
    }
`;