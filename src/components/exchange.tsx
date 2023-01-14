import { Card, Spin } from "antd";
import React, { useEffect } from 'react';
import { Typography } from 'antd';
import { useState } from 'react';
import { convertSymbolLower, convertSymbolUpper, lowerSymbol, moneyFormat } from '../utils/symbol';
import { useTypedSelector } from "../hooks/useTypeSelector";
import { useDispatch } from 'react-redux';
import { Dispatch } from "redux";
import { ActionType } from '../redux/actionTypes/exchange';
import useWebSocket from "react-use-websocket";

const { Title, Text } = Typography;

export default function Exchange() {
    const dispatch: Dispatch<any> = useDispatch();
    const param = useTypedSelector((state) => state.param);
    const exchangeRate = useTypedSelector((state) => state.exchangeRate);
    const [data, setData] = useState<typeof exchangeRate>({
        payload: {},
        loading: false,
    });
    const socketUrl = 'wss://ws.satangcorp.com/ws/!miniTicker@arr';
    const {  lastMessage } = useWebSocket(socketUrl);
    const [loadingPage, setLoadingPage] = useState<boolean>(true)

    useEffect(() => {
        if (Object.keys(exchangeRate.payload).length > 0) {
            setData(exchangeRate)
            if (loadingPage) setLoadingPage(false)
        }
    }, [exchangeRate]);

    useEffect(() => {
        const selectData = (data: string) => {
            const dataArray = JSON.parse(data)
            let dataUsed: object[] = [];
            if (dataArray.length >0) {
                dataUsed = dataArray.filter((data) => {
                    if (data.s === lowerSymbol(param.pair)) {
                        return data
                    }
                })
            }
            return dataUsed.length > 0 ? dataUsed[0] : {};
        }
        if (lastMessage !== null) {
            const exchangeData: object = selectData(lastMessage.data);
            const action = (type, payload)=> dispatch({type,payload})
            if (exchangeData) {
                action(ActionType.GET_EXCHANGE_REQ, exchangeData)
            }
        }
      }, [lastMessage]);

    return (
        <Card style={{ width: '100%', height: '220px' }}>
            {loadingPage ?
                <div className="exchange-loading">
                    <Spin />
                </div> : ''}
            <Title level={3}>{convertSymbolUpper(param.pair)}</Title>
            <Title level={2} style={{ height: '30px' }}>{data.payload.c ? moneyFormat(data.payload.c) : ''}</Title>
            <Text className="exchange-volume-text"><p>Volume : {data.payload.q ? moneyFormat(data.payload.q) : ''}</p></Text>
            <Text className="exchange-volume-text"><p>High price : {data.payload.h ? moneyFormat(data.payload.h) : ''}</p></Text>
            <Text className="exchange-volume-text"><p>Low price : {data.payload.l ? moneyFormat(data.payload.l) : ''}</p></Text>
        </Card>
    )
}