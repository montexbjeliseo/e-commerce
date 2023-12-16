import styled from "styled-components"

const Container = styled.div`
    *,
    *:before,
    *:after {
    box-sizing: border-box;
    }

    body {
    font-family: -apple-system, ".SFNSText-Regular", "Helvetica Neue", "Roboto", "Segoe UI", sans-serif;
    }

    .toggle {
    cursor: pointer;
    display: inline-block;
    }

    .toggle-switch {
    display: inline-block;
    background: #ccc;
    border-radius: 16px;
    width: 58px;
    height: 32px;
    position: relative;
    vertical-align: middle;
    transition: background 0.25s;
    }
    .toggle-switch:before, .toggle-switch:after {
    content: "";
    }
    .toggle-switch:before {
    display: block;
    background: linear-gradient(to bottom, #fff 0%, #eee 100%);
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    width: 24px;
    height: 24px;
    position: absolute;
    top: 4px;
    left: 4px;
    transition: left 0.25s;
    }
    .toggle:hover .toggle-switch:before {
    background: linear-gradient(to bottom, #fff 0%, #fff 100%);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
    }
    .toggle-checkbox:checked + .toggle-switch {
    background: #111;
    }
    .toggle-checkbox:checked + .toggle-switch:before {
    left: 30px;
    }

    .toggle-checkbox {
    position: absolute;
    visibility: hidden;
    }

    .toggle-label {
    margin-left: 5px;
    position: relative;
    top: 2px;
    }
`;

type Props = {
    label: string;
    name: string;
}

export const SwitchInput: React.FC<Props> = ({ label, name }) => {
    return (
        <Container>
            <label className="toggle">
                <input className="toggle-checkbox" type="checkbox" name={name} />
                <div className="toggle-switch"></div>
                <span className="toggle-label">{label}</span>
            </label>
        </Container>
    )
}