import { ActionType } from "../redux/actionTypes/exchange";

export const useFetchExchangeRate = (prop: any) => {
    const { exchangeData, action } = prop;

    action(ActionType.GET_EXCHANGE_REQ, exchangeData)
}