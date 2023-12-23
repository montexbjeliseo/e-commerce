import { Link } from "react-router-dom"
import { APP_ROUTES, IMAGE_PLACEHOLDER } from "../../../constants"
import { Category } from "../../../types"
import styled from "styled-components"

const Card = styled.li`
    position: relative;

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }

    p {
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
    }
    img {  
        width: 100%;
        object-fit: cover;
    }
    .overlay {
        position: absolute;
        top: 5px;
        right: 5px;

        .btn-rounded {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            padding: 5px;
            border: 1px solid rgba(255, 255, 255, 0.5);
            background: transparent;
        }

        .btn-rounded:hover {
            cursor: pointer;
        }

        .edit-btn {
            background: #0D0D0D;
            color: #fff;
        }

        .edit-btn:hover {
            background: #000;
        }

        .delete-btn {
            background: red;
            color: #fff;
        }
    }

`;

type Props = {
    data: Category
}

export const MonthCategoryCard: React.FC<Props> = ({ data }) => {

    return (
        <Card>
            <Link to={`${APP_ROUTES.PRODUCTS}?categoryId=${data.id}`}>
                <p>{data.name}</p>
                <img onError={(e) => e.currentTarget.src = IMAGE_PLACEHOLDER.IMAGE_300} src={data.image} alt={data.name} title={data.name} width={300} height={300} />
            </Link>
        </Card>
    )
}