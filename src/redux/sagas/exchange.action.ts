import { put, takeEvery } from 'redux-saga/effects'
import { ActionType } from '../actionTypes/exchange'

interface Exchange {
    type: string,
    payload: object
}
function* setExchangeAction(payload: Exchange) {
    const data: object = payload.payload
    yield put({
        type: ActionType.GET_EXCHANGE_PENDING,
        payload: {}
    })

    yield put({
        type: ActionType.GET_EXCHANGE_SUCCESS,
        payload: data
    })

}

export function* watchSetExchange() {
    yield takeEvery(ActionType.GET_EXCHANGE_REQ, setExchangeAction)
}
