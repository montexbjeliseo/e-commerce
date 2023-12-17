export enum CREATION_ACTION_TYPES {
    SET_IS_LOADING = "SET_IS_LOADING",
    SET_IS_ERROR = "SET_IS_ERROR",
    SET_CREATED = "SET_CREATED"
}

export type CreationAction = {
    type: CREATION_ACTION_TYPES;
    payload: boolean;
}

export type CreationState = {
    isLoading: boolean;
    isError: boolean;
    created: boolean;
}

export const creationReducer = (state: CreationState, action: CreationAction) => {
    const newState = {
        isLoading: false,
        isError: false,
        created: false
    }
    switch (action.type) {
        case CREATION_ACTION_TYPES.SET_IS_LOADING:
            return {
                ...newState,
                isLoading: action.payload
            };
        case CREATION_ACTION_TYPES.SET_IS_ERROR:
            return {
                ...newState,
                isError: action.payload
            };
        case CREATION_ACTION_TYPES.SET_CREATED:
            return {
                ...newState,
                created: action.payload
            };
        default:
            return state;
    }
};