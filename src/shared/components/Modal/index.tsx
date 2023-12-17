import styled from "styled-components"

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;


const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
  text-align: center;
  position: relative;

  .close-button {
    position: absolute;
    top: 5px;
    right: 5px;
    border: none;
    background: none;
    font-weight: bold;
    opacity: 0.5;
    font-size: 20px;
  }

  .close-button:hover {
    cursor: pointer;
    opacity: 1;
  }

  .close-button:active {
      color: red;
  }
`;

type Props = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void
}

export const Modal: React.FC<Props> = ({ children, isOpen, onClose }) => {

    return isOpen ? (
        <Container>
            <ModalContent>
                {children}
                <button className="close-button" onClick={onClose}>X</button>
            </ModalContent>
        </Container>
    ) : null
}