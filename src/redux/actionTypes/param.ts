
export enum ActionType {
    GET_PAIR_REQ = 'GET_PAIR_REQ',
    GET_PAIR_PENDING = 'GET_PAIR_PENDING',
    GET_PAIR_SUCCESS = 'GET_PAIR_SUCCESS',
}


interface actionSuccess {
    type: ActionType.GET_PAIR_SUCCESS;
    payload: string;
}

interface actionPending {
    type: ActionType.GET_PAIR_PENDING;
    payload: string;
}


export type Action =   actionSuccess| actionPending ;