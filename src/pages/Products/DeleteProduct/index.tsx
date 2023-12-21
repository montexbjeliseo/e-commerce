import styled from "styled-components";
import { Product } from "../../../types";
import { useReducer } from "react";
import { DeletionActionType, deletionReducer } from "../../../reducers/DeletionReducer";
import { Loading } from "../../../shared/components/Loading";
import { useMutation } from "react-query";
import { deleteProduct } from "../../../api";

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

type Props = {
    data: Product;
    onDeleted: () => void;
}

export const DeleteProduct: React.FC<Props> = ({ data, onDeleted }) => {

    const [deletionState, dispatch] = useReducer(deletionReducer, {
        isLoading: false,
        isError: false,
        deleted: false
    })

    const deleteMutation = useMutation(deleteProduct, {
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

        deleteMutation.mutate(data.id.toString());
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
                <p>There was an error deleting the product.</p>
            </ConfirmMessage>
        )
    }

    if(deletionState.deleted) {
        return (
            <ConfirmMessage>
                <strong className="title">Product Deleted</strong>
                <p>{data.title} has been deleted.</p>
            </ConfirmMessage>
        )
    }

    return (
        <ConfirmMessage>
            <strong className="title">Confirm Delete "{data.title}"</strong>
            <p>Are you sure you want to delete this Product?</p>
            <button className="btn btn-primary" onClick={handleDelete}>Confirm Delete</button>
        </ConfirmMessage>
    )
}