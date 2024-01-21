import styled from "styled-components";

export const Button = styled.button`
    padding: 12px;
    background: #0D0D0D;
    color: #fff;
    border: 2px solid rgb(43, 43, 43);
    border-radius: 7px;

    &:hover {
        background: #010101;
    }

    &:active {
        background: #FFF;
        color: #0D0D0D;
    }

    &[color=danger] {
        background: #c61a09;
    }

    &[color=danger]:hover {
        background: #a40f0a;
    }

    &[color=danger]:active {
        background: #FFF;
        color: #c61a09;
    }
`;