import styled from "styled-components";

const StyledOverlay = styled.div`

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.5);

    &.active {
        display: flex;
    }
`;

type Props = {
    children: React.ReactNode;
    active: boolean;
}

export const Overlay: React.FC<Props> = ({ children, active}) => {
    return (
        <StyledOverlay className={`${active ? 'active' : ''}`}>
            {children}
        </StyledOverlay>
    )
}