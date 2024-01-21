import checkIcon from '../../../assets/icons/check.png';
import invalidIcon from '../../../assets/icons/invalid.png';

type Props = {
    checked: boolean
}

export const CheckIcon: React.FC<Props> = ({ checked }) => {
    return (
        <img src={checked ? checkIcon : invalidIcon} alt="" width="32" />
    )
}