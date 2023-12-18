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
import { DeleteCategory } from "./DeleteCategory";
import { useAuth } from "../../contexts/AuthProvider";
import { MODIFY_RESOURCE_ACTIONS, modifyResourceReducer } from "../../reducers/ModifyResourceReducer";

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

    const { isAdmin } = useAuth();

    const { data, isLoading, isError, refetch } = useQuery(QUERY_KEYS.CATEGORIES, async () => {
        const response = fetch(API_ENDPOINTS.CATEGORIES);
        const res = await response;
        return await res.json();
    })

    const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);

    const [askedFor, dispatch] = useReducer(modifyResourceReducer, {
        resource: null,
        askedToDelete: false,
        askedToEdit: false
    })

    const onMutate = () => {
        refetch();
    }

    const handleAskEditCategory = (category: Category) => {
        dispatch({ type: MODIFY_RESOURCE_ACTIONS.ASK_EDIT, payload: category })
    }

    const handleAskDeleteCategory = (category: Category) => {
        dispatch({ type: MODIFY_RESOURCE_ACTIONS.ASK_DELETE, payload: category })
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
                        <NewCategoryForm onCreated={onMutate} />
                    </Modal>
                ) : null}
            </div>
            <div>
                {askedFor.resource ? (
                    <Modal isOpen={askedFor.askedToDelete} onClose={() => dispatch({ type: MODIFY_RESOURCE_ACTIONS.CANCEL, payload: null })}>
                        <DeleteCategory
                            data={askedFor.resource as Category}
                            onDeleted={onMutate}
                        />
                    </Modal>
                ) : null}
                {askedFor.resource ? (
                    <Modal isOpen={askedFor.askedToEdit} onClose={() => dispatch({ type: MODIFY_RESOURCE_ACTIONS.CANCEL, payload: null })}>
                        <UpdateCategoryForm
                            data={askedFor.resource as Category}
                            onUpdated={onMutate} />
                    </Modal>
                ) : null}
            </div>
            <p className="title">Browse our categories
                {isAdmin ?
                    <>
                        | <NewCategoryLink
                            onClick={() => setShowNewCategoryForm(true)}>
                            Create new
                        </NewCategoryLink>
                    </>
                    : null}
            </p>
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