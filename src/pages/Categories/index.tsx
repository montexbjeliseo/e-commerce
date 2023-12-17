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

export const CategoriesPage = () => {

    const { data, isLoading, isError } = useQuery(QUERY_KEYS.CATEGORIES, () => {
        const response = fetch(API_ENDPOINTS.CATEGORIES);
        return response.then((res) => res.json());
    })

    const [showNewCategoryForm, setShowNewCategoryForm] = useState(true);

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
                ) : (
                    <button className="btn btn-primary" onClick={() => setShowNewCategoryForm(true)}>New Category</button>
                )}
            </div>
            <p className="title">Browse our categories</p>
            <ul className="categories">
                {(data as Category[]).map((category) => (
                    <li key={category.id} className="category-card">
                        <Link to={`${APP_ROUTES.PRODUCTS}?category_id=${category.id}`}>
                            <p>{category.name}</p>
                            <img onError={(e) => e.currentTarget.src = IMAGE_PLACEHOLDER.IMAGE_300} src={category.image} alt={category.name} title={category.name} width={300} height={300} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}