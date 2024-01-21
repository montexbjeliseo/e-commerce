import { Link } from "react-router-dom"
import { APP_ROUTES, IMAGE_PLACEHOLDER } from "../../../constants"
import { Category } from "../../../types"
import styled from "styled-components"

const Card = styled.article`
    
    border-radius: 7px;
    position: relative;
    overflow: hidden;
    
    padding: 0;
    margin: 0;

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }

    a {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        font-size: 24px;
        text-align: center;
        text-decoration: none;
    }
    img {  
        width: 100%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
    }
`;

type Props = {
    data: Category
}

export const MonthCategoryCard: React.FC<Props> = ({ data }) => {

    return (
        <Card>
            <img onError={(e) => e.currentTarget.src = IMAGE_PLACEHOLDER.IMAGE_300} src={data.image} alt={data.name} title={data.name} />
            <Link to={`${APP_ROUTES.PRODUCTS}?categoryId=${data.id}`}>
                {data.name}
            </Link>
        </Card>
    )
}