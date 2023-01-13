import { Dispatch } from 'redux';
import { ActionType, Action } from '../actionTypes/exchange';

export const getExchangeRate = (pair: string) => {
    return async (dispatch: Dispatch<Action>) => {
        
        dispatch({
            type: ActionType.GET_EXCHANGE_PENDING
        });
        
        if (pair !== '') {
            try {
                const response = await fetch(`https://satangcorp.com/api/v3/ticker/24hr?symbol=${pair}`).then((response) => { 
                    return response.json().then((data) => {
                        return data;
                    }).catch((err) => {
                        console.log(err);
                    }) 
                });
                dispatch({
                    type: ActionType.GET_EXCHANGE_SUCCESS,
                    payload: response  
                });                
            } catch (error) {
                dispatch({
                    type: ActionType.GET_EXCHANGE_FAIL,
                    payload: {} 
                });
            }
        } else {
            dispatch({
                type: ActionType.GET_EXCHANGE_FAIL,
                payload: {} 
            });
        }
    }
}