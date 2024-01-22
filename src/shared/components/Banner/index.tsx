import styled from "styled-components";

export const Banner = styled.div`
    margin: 20px 0;
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;

    &.primary {
        background: #0D0D0D;
        a {
            color: #fff;
            text-decoration: none;
            font-weight: 700;
            font-size: 1.2rem;

        }
    }
    &.secondary {
        background: #a5a5a5;
        a {
            color: #2b2b2b;
            text-decoration: none;
            font-weight: 700;
            font-size: 1.2rem;
            
        }
    }
`;