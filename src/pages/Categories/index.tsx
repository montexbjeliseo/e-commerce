import { useQuery } from "react-query";
import "./styles.css";
import { ErrorMessage } from "../../shared/components/ErrorMessage";
import { Loading } from "../../shared/components/Loading";
import { API_ENDPOINTS, APP_ROUTES, IMAGE_PLACEHOLDER, QUERY_KEYS } from "../../constants";
import { Link } from "react-router-dom";
import { Category } from "../../types";
import { NewCategoryForm } from "./NewCategoryForm";
import { useState } from "react";
import { Modal } from "../../shared/components/Modal";
import styled from "styled-components";

const NewCategoryLink = styled.b`
    cursor: pointer;
    color: #111;
    opacity: 0.5;
    font-size: 14px;
    &:hover {
        opacity: 1;
    }
`;

export const CategoriesPage = () => {

    const { data, isLoading, isError } = useQuery(QUERY_KEYS.CATEGORIES, () => {
        const response = fetch(API_ENDPOINTS.CATEGORIES);
        return response.then((res) => res.json());
    })

    const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);

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
            <div>
                {showNewCategoryForm ? (
                    <Modal isOpen={showNewCategoryForm} onClose={() => setShowNewCategoryForm(false)}>
                        <NewCategoryForm />
                    </Modal>
                ) : null }
            </div>
            <p className="title">Browse our categories | <NewCategoryLink onClick={() => setShowNewCategoryForm(true)}>Create new</NewCategoryLink></p>
            <ul className="categories">
                {(data as Category[]).map((category) => (
                    <li key={category.id} className="category-card">
                        <Link to={`${APP_ROUTES.PRODUCTS}?categoryId=${category.id}`}>
                            <p>{category.name}</p>
                            <img onError={(e) => e.currentTarget.src = IMAGE_PLACEHOLDER.IMAGE_300} src={category.image} alt={category.name} title={category.name} width={300} height={300} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}