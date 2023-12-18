import { useQuery } from "react-query";
import "./styles.css";
import { ErrorMessage } from "../../shared/components/ErrorMessage";
import { Loading } from "../../shared/components/Loading";
import { API_ENDPOINTS, QUERY_KEYS } from "../../constants";
import { Category } from "../../types";
import { NewCategoryForm } from "./NewCategoryForm";
import { useReducer, useState } from "react";
import { Modal } from "../../shared/components/Modal";
import styled from "styled-components";
import { CategoryCard } from "../../shared/components/CategoryCard";
import { UpdateCategoryForm } from "./UpdateCategoryForm";

const NewCategoryLink = styled.b`
    cursor: pointer;
    color: #111;
    opacity: 0.5;
    font-size: 14px;
    &:hover {
        opacity: 1;
    }
`;

type ModifyCategoryState = {
    category: Category | null;
    askedToDelete: boolean;
    askedToEdit: boolean;
}

enum MODIFY_CATEGORY_ACTIONS {
    ASK_DELETE,
    ASK_EDIT,
    CANCEL
}

type ModifyCategoryAction = {
    type: MODIFY_CATEGORY_ACTIONS;
    payload: Category | null;
}

const modifyCategoryReducer = (state: ModifyCategoryState, action: ModifyCategoryAction) => {
    const newState = {
        category: null,
        askedToDelete: false,
        askedToEdit: false
    }

    switch (action.type) {
        case MODIFY_CATEGORY_ACTIONS.ASK_DELETE:
            return {
                ...newState,
                category: action.payload,
                askedToDelete: true
            }
        case MODIFY_CATEGORY_ACTIONS.ASK_EDIT:
            return {
                ...newState,
                category: action.payload,
                askedToEdit: true
            }
        case MODIFY_CATEGORY_ACTIONS.CANCEL:
            return {
                ...newState
            }
        default:
            return state;
    }
}

export const CategoriesPage = () => {

    const { data, isLoading, isError } = useQuery(QUERY_KEYS.CATEGORIES, () => {
        const response = fetch(API_ENDPOINTS.CATEGORIES);
        return response.then((res) => res.json());
    })

    const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);

    const [askedFor, dispatch] = useReducer(modifyCategoryReducer, {
        category: null,
        askedToDelete: false,
        askedToEdit: false
    })

    const handleAskEditCategory = (category: Category) => {
        dispatch({ type: MODIFY_CATEGORY_ACTIONS.ASK_EDIT, payload: category })
    }

    const handleAskDeleteCategory = (category: Category) => {
        dispatch({ type: MODIFY_CATEGORY_ACTIONS.ASK_DELETE, payload: category })
    }

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
                ) : null}
            </div>
            <div>
                {askedFor.category ? (
                    <Modal isOpen={askedFor.askedToDelete} onClose={() => dispatch({ type: MODIFY_CATEGORY_ACTIONS.CANCEL, payload: null })}>
                        <p>Are you sure you want to delete this category?</p>
                        <button>Delete</button>
                    </Modal>
                ) : null}
                {askedFor.category ? (
                    <Modal isOpen={askedFor.askedToEdit} onClose={() => dispatch({ type: MODIFY_CATEGORY_ACTIONS.CANCEL, payload: null })}>
                        <UpdateCategoryForm data={askedFor.category} />
                    </Modal>
                ) : null}
            </div>
            <p className="title">Browse our categories | <NewCategoryLink onClick={() => setShowNewCategoryForm(true)}>Create new</NewCategoryLink></p>
            <ul className="categories">
                {(data as Category[]).map((category) => (
                    <CategoryCard
                        key={category.id}
                        data={category}
                        onEdit={handleAskEditCategory}
                        onDelete={handleAskDeleteCategory}
                    />
                ))}
            </ul>
        </div>
    )
}