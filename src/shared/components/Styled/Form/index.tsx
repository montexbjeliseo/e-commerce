import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 18px;
    width: 100%;
    font-family: Public Sans;
    label {
        display: flex;
        flex-direction: column;
    }

    input {
        padding: 12px;
    }
`;