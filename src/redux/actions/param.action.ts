import { Dispatch } from 'redux';
import { ActionType, Action } from '../actionTypes/param';

export const setPair = (param:any) => {
    return async (dispatch: Dispatch<Action>) => {
        
        dispatch({
            type: ActionType.GET_PAIR_PENDING
        });
        
        if (param !== '') {
            dispatch({
                type: ActionType.GET_PAIR_SUCCESS,
                payload: param  
            });
        } else {
            dispatch({
                type: ActionType.GET_PAIR_FAIL,
                payload: ''  
            });
        }
    }
}