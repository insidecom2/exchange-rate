import { ActionType } from '../redux/actionTypes/exchange';
import { convertSymbolLower } from "../utils/symbol";
import { useDispatch } from 'react-redux';
import { Dispatch } from "redux";
import { useEffect } from 'react';


export function useFetchExchangeRate(props) {
    const { pair, action } = props;

    if (pair) {
        try {
            const symbol = convertSymbolLower(pair)
            action(ActionType.GET_EXCHANGE_REQ, symbol)

        } catch (error) {
            console.log(error)
        }
    }

}

