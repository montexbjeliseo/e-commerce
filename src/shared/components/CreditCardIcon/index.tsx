import * as Validator from "card-validator";

import genericCardIcon from '../../../assets/icons/generic-card.png';
import mastercardIcon from '../../../assets/icons/mastercard.svg';
import visaIcon from '../../../assets/icons/visa.svg';
import amexIcon from '../../../assets/icons/amex.svg';
import dinersIcon from '../../../assets/icons/diners.svg';
import discoverIcon from '../../../assets/icons/discover.svg';
import jcbIcon from '../../../assets/icons/jcb.svg';

type Props = {
    number: string;
}

export const CreditCardIcon: React.FC<Props> = ({ number }) => {

    const card = Validator.number(number);

    if(card && card.card?.type){

        const type = card.card?.type;

        switch(type){
            case 'american-express':
                return (
                    <img src={amexIcon} alt="" />
                )
            case 'mastercard':
                return (
                    <img src={mastercardIcon} alt="" />
                )

            case 'visa':
                return (
                    <img src={visaIcon} alt="" />
                )
            case 'diners-club':
                return (
                    <img src={dinersIcon} alt="" />
                )

            case 'discover':
                return (
                    <img src={discoverIcon} alt="" />
                )

            case 'jcb':
                return (
                    <img src={jcbIcon} alt="" />
                )
        }

    }

    return (
            <img src={genericCardIcon} alt="" />
    )
}