import styled from "styled-components";

const SectionTitle = styled.h2`
    padding-top: 20px;
    text-align: center;
    font-size: 2.5rem;
    font-weight: lighter;
    opacity: 0.7;
`;

const SectionDescription = styled.p`
    text-align: center;
    font-size: 1.2rem;
    font-style: italic;
`;

type Props = {
    title: string;
    description?: string;
    children: React.ReactNode;
}

export const HomeSection: React.FC<Props> = ({ title, description, children }) => {
    return (
        <article>
            <SectionTitle>{title}</SectionTitle>
            <SectionDescription>{description}</SectionDescription>
            <div>
                {children}
            </div>
        </article>
    )
}