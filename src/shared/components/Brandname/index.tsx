import styled from "styled-components";

const Brand = styled.div`
    font-weight: bolder;
    font-size: 28px;
    span {
        color: aqua;
    }
`;

export const Brandname = () => {
    return (
        <Brand>Store <span>Demo</span></Brand>
    )
}