import { useState } from "react";
import styled from "styled-components";

const Container = styled.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: 70vh;
    .tabs {
        display: flex;
        gap: 10px;

        .tab-active {
            font-weight: bold;
            text-decoration: underline;
        }
    }
    .content {
        width: 100%;
        display: flex;
        gap: 10px;
        div {
            width: 100%;
        }
    }
`;

type Props = {
    labels: string[];
    children: React.ReactNode[];
}

export const Tabs: React.FC<Props> = ({ labels, children }) => {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <Container>
            <div className="tabs">
                {labels.map((label, index) => (
                    <div className={activeTab === index ? 'tab-active' : ''} key={index} onClick={() => setActiveTab(index)}>{label}</div>
                ))}
            </div>
            <div className="content">
                {children.map((child, index) => (
                    activeTab === index && child
                ))}
            </div>
        </Container>
    )
}