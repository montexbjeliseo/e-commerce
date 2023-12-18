import styled from "styled-components";
import { Category } from "../../../types";
import { deleteCategory } from "../../../api";
import { useReducer } from "react";
import { Loading } from "../../../shared/components/Loading";
import { useMutation } from "react-query";

const ConfirmMessage = styled.div`
    display: flex;
    gap: 18px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
        color: #111;
        font-size: 20px;
    }

    .title {
        font-size: 24px;
    }
`;

type DeletionState = {
    isLoading: boolean;
    isError: boolean;
    deleted: boolean;
}

enum DeletionActionType {
    SET_IS_LOADING,
    SET_IS_ERROR,
    SET_DELETED,
}

type DeletionAction = {
    type: DeletionActionType;
}

const deletionReducer = (state: DeletionState, action: DeletionAction) => {
    const newState = {
        isLoading: false,
        isError: false,
        deleted: false
    }
    switch (action.type) {
        case DeletionActionType.SET_IS_LOADING:
            return {
                ...newState,
                isLoading: true
            }
        case DeletionActionType.SET_IS_ERROR:
            return {
                ...newState,
                isError: true
            }
        case DeletionActionType.SET_DELETED:
            return {
                ...newState,
                deleted: true
            }
        default:
            return state;
    }
}

type Props = {
    data: Category;
    onDeleted: () => void;
}

export const DeleteCategory: React.FC<Props> = ({ data, onDeleted }) => {

    const [deletionState, dispatch] = useReducer(deletionReducer, {
        isLoading: false,
        isError: false,
        deleted: false
    })

    const deleteMutation = useMutation(deleteCategory, {
        onSuccess: () => {
            dispatch({
                type: DeletionActionType.SET_DELETED
            })
        },
        onError: () => {
            dispatch({
                type: DeletionActionType.SET_IS_ERROR
            })
        },
        onSettled: () => {
            onDeleted();
        }
    })
    
    const handleDelete = () => {
        dispatch({
            type: DeletionActionType.SET_IS_LOADING
        });

        deleteMutation.mutate(data.id);
    }

    if(deletionState.isLoading) {
        return (
            <ConfirmMessage>
                <Loading />
                <p>Please wait.</p>
            </ConfirmMessage>
        )
    }

    if(deletionState.isError) {
        return (
            <ConfirmMessage>
                <strong className="title">Error</strong>
                <p>There was an error deleting the category.</p>
            </ConfirmMessage>
        )
    }

    if(deletionState.deleted) {
        return (
            <ConfirmMessage>
                <strong className="title">Category Deleted</strong>
                <p>{data.name} has been deleted.</p>
            </ConfirmMessage>
        )
    }
    
    return (
        <ConfirmMessage>
            <strong className="title">Confirm Delete "{data.name}"</strong>
            <p>Are you sure you want to delete this category?</p>
            <button className="btn btn-primary" onClick={handleDelete}>Confirm Delete</button>
        </ConfirmMessage>
    )
}