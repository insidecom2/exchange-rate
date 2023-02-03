export enum ActionType {
    GET_EXCHANGE_REQ = 'GET_EXCHANGE_REQ',
    GET_EXCHANGE_PENDING = 'GET_EXCHANGE_PENDING',
    GET_EXCHANGE_SUCCESS = 'GET_EXCHANGE_SUCCESS',
    GET_EXCHANGE_FAIL = 'GET_EXCHANGE_FAIL'
}

interface actionPending {
    type: ActionType.GET_EXCHANGE_PENDING;
}

interface actionSuccess {
    type: ActionType.GET_EXCHANGE_SUCCESS;
    payload: object;
}

interface actionFail {
    type: ActionType.GET_EXCHANGE_FAIL;
    payload: object;
}

export type Action = actionPending | actionSuccess | actionFail;