import { Category, Product } from "../../types";

export type ModifyResourceState = {
    resource: Category | Product | null;
    askedToDelete: boolean;
    askedToEdit: boolean;
}

export enum MODIFY_RESOURCE_ACTIONS {
    ASK_DELETE,
    ASK_EDIT,
    CANCEL
}

export type ModifyResourceAction = {
    type: MODIFY_RESOURCE_ACTIONS;
    payload: Category | Product | null;
}

export const modifyResourceReducer = (state: ModifyResourceState, action: ModifyResourceAction) => {
    const newState = {
        resource: null,
        askedToDelete: false,
        askedToEdit: false
    }

    switch (action.type) {
        case MODIFY_RESOURCE_ACTIONS.ASK_DELETE:
            return {
                ...newState,
                resource: action.payload,
                askedToDelete: true
            }
        case MODIFY_RESOURCE_ACTIONS.ASK_EDIT:
            return {
                ...newState,
                resource: action.payload,
                askedToEdit: true
            }
        case MODIFY_RESOURCE_ACTIONS.CANCEL:
            return {
                ...newState
            }
        default:
            return state;
    }
}