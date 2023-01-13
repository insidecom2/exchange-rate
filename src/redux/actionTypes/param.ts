
export enum ActionType {
    GET_PAIR_PENDING = 'GET_PAIR_PENDING',
    GET_PAIR_SUCCESS = 'GET_PAIR_SUCCESS',
    GET_PAIR_FAIL = 'GET_PAIR_FAIL'
}

interface actionPending {
    type: ActionType.GET_PAIR_PENDING;
}

interface actionSuccess {
    type: ActionType.GET_PAIR_SUCCESS;
    payload: string;
}

interface actionFail {
    type: ActionType.GET_PAIR_FAIL;
    payload: string ;
}

export type Action = actionPending | actionSuccess | actionFail;