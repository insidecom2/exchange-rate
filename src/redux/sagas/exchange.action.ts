import { put, takeEvery } from 'redux-saga/effects'
import { ActionType } from '../actionTypes/exchange'

interface Exchange {
    type: string,
    payload: string
}
function* setExchangeAction(payload: Exchange) {
    const pair:string = payload.payload
    
        //try {
            yield put({
                type: ActionType.GET_EXCHANGE_PENDING,
                payload: {}
            })
            const response = yield fetch(`https://satangcorp.com/api/v3/ticker/24hr?symbol=${pair}`).then((response) => {
                return response.json().then((data) => {
                    return data;
                }).catch((err) => {
                    console.log(err);
                })
            });

            yield put({
                type: ActionType.GET_EXCHANGE_SUCCESS,
                payload:response
            })
        // } catch (error) {
        //     yield put({
        //         type: ActionType.GET_EXCHANGE_FAIL,
        //         payload: {}
        //     })
        // }
   
   
}

export function* watchSetExchange() {
    yield takeEvery(ActionType.GET_EXCHANGE_REQ, setExchangeAction)
}
