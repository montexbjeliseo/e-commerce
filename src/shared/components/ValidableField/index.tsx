import styled from "styled-components";
import checkIcon from '../../../assets/icons/check.png';
import invalidIcon from '../../../assets/icons/invalid.png';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    .validation-icon {
        position: absolute;
        right: 10px;
        height: 100%;
        display: flex;
        align-items: center;
        user-select: none;
        img {
            width: 40px;
            height: 40px;
            user-select: none;
        }
    }

`;

type Props = {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    isValid: boolean;
}

export const ValidableField: React.FC<Props> = ({ name, value, onChange, placeholder, isValid }) => {
    return (
        <Container>
            <input
                className="text-input"
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
            />
            <div className="validation-icon">
                {isValid ? <img src={checkIcon} alt="" /> : <img src={invalidIcon} alt="" />}
            </div>
        </Container>
    )
}