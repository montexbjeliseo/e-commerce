import { useQuery } from "react-query";
import "./styles.css";
import { ErrorMessage } from "../../shared/components/ErrorMessage";
import { Loading } from "../../shared/components/Loading";
import { API_ENDPOINTS, IMAGE_PLACEHOLDER, QUERY_KEYS } from "../../constants";
import { Link } from "react-router-dom";


type Category = {
    id: number;
    name: string;
    image: string;
}

export const CategoriesPage = () => {

    const { data, isLoading, isError } = useQuery(QUERY_KEYS.CATEGORIES, () => {
        const response = fetch(API_ENDPOINTS.CATEGORIES);
        return response.then((res) => res.json());
    })

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (isError) {
        return (
            <ErrorMessage />
        )
    }

    return (
        <div className="container center">
            <h1 className="title">Categories</h1>
            <ul className="categories">
                {(data as Category[]).map((category) => (
                    <li key={category.id} className="category-card">
                        <Link to={`/products?category_id=${category.id}`}>
                            <p>{category.name}</p>
                            <img onError={(e) => e.currentTarget.src = IMAGE_PLACEHOLDER.IMAGE_300} src={category.image} alt={category.name} title={category.name} width={300} height={300} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}