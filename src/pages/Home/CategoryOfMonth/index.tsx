import styled from "styled-components";

export const CategoryOfMonth = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    padding: 0 20px;
    list-style: none;
    list-style-type: none;

    @media screen and (max-width: 576px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;