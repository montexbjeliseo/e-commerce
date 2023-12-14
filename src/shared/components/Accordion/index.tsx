import { useState } from "react";
import styled from "styled-components"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 10px 0;
    color: #909090;
    font-family: Public Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
    letter-spacing: -0.4px;
    
    h3 {
        display: flex;
        justify-content: space-between;
        
        font-weight: 600;
        font-size: 18px;
        button {
            padding: 10px;
            border: none;
            background: transparent;
            font-size: 22px;
            opacity: 0.5;
        }
        button:hover {
            opacity: 1;
        }
    }
`;

type Props = {
    title: string
    children: React.ReactNode
}

export const Accordion: React.FC<Props> = ({ title, children }) => {

    const [open, setOpen] = useState(false);

    return (
        <Container>
            <h3>{title} <button onClick={() => setOpen(!open)}>{open ? '-' : '+'}</button></h3>

            {open ? children : ''}
        </Container>
    )
}