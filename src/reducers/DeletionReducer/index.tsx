export type DeletionState = {
    isLoading: boolean;
    isError: boolean;
    deleted: boolean;
}

export enum DeletionActionType {
    SET_IS_LOADING,
    SET_IS_ERROR,
    SET_DELETED,
}

export type DeletionAction = {
    type: DeletionActionType;
}

export const deletionReducer = (state: DeletionState, action: DeletionAction) => {
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