import styled from "styled-components";

export const ProductArrivals = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    flex-direction: column;
    gap: 18px;
    
    @media screen and (max-width: 576px) {
        grid-template-columns: repeat(1, 1fr);
        text-align: center;
    }

    @media screen and (min-width: 576px) and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;