import { Action, ActionType } from "../actionTypes/exchange"

interface State {
    loading: boolean,
    error?: string | null,
    payload?: any
}

const initialState = {
    loading: false,
    error: null,
    payload: {}
}

export const exchangeReducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case ActionType.GET_EXCHANGE_PENDING:
            return {
                loading: true,
                payload: {}
            } 
        case ActionType.GET_EXCHANGE_SUCCESS:
            return {
                loading: false,
                payload: action.payload
            }
        case ActionType.GET_EXCHANGE_FAIL:
            return {
                loading: false,
                payload: action.payload 
            }
        default: 
            return state;
    }
}