import { Action, ActionType } from "../actionTypes/param"

interface State {
    loading: boolean,
    error?: string | null,
    pair?: string
}

const initialState = {
    loading: false,
    error: null,
    pair: ''
}

export const paramReducer = (state:State = initialState, action: Action): State => {
    switch (action.type) {
        case ActionType.GET_PAIR_PENDING:
            return {
                loading: true,
                pair: ''
            } 
        case ActionType.GET_PAIR_SUCCESS:
            return {
                loading: false,
                pair: action.payload
            }
        default: 
            return state;
    }
}