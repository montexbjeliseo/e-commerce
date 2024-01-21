import styled from "styled-components";

export const CategoryOfMonth = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;

    @media screen and (max-width: 576px) {
        grid-template-columns: repeat(1, 1fr);
    }

    @media screen and (min-width: 576px) and (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;