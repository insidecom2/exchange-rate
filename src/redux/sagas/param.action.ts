import { put, takeEvery, all } from 'redux-saga/effects'
import { ActionType } from '../actionTypes/param'

export function* setPairAction(payload: string) {
    yield put({
        type: ActionType.GET_PAIR_SUCCESS,
        payload: payload
    })
}

export function* watchPairAction() {
    yield takeEvery(ActionType.GET_PAIR_PENDING, setPairAction)
}