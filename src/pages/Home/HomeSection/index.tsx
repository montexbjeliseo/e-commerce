import styled from "styled-components";

const SectionTitle = styled.h1`
    padding-top: 50px;
    text-align: center;
    font-size: 2.5rem;
    font-weight: lighter;
    opacity: 0.7;
`;

const SectionDescription = styled.p`
    text-align: center;
    font-size: 1.2rem;
    padding: 10px 0;
`;

type Props = {
    title: string;
    description?: string;
    children: React.ReactNode;
}

export const HomeSection: React.FC<Props> = ({ title, description, children }) => {
    return (
        <section className="container bg-gray">
            <SectionTitle>{title}</SectionTitle>
            <SectionDescription>{description}</SectionDescription>
            <div>
                {children}
            </div>
        </section>
    )
}