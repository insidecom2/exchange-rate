import { Card, Spin } from "antd";
import React, { useEffect } from 'react';
import { Typography } from 'antd';
import { useState } from 'react';
import { convertSymbolUpper, lowerSymbol, moneyFormat } from '../utils/symbol';
import { useTypedSelector } from "../hooks/useTypeSelector";
import { useDispatch } from 'react-redux';
import { Dispatch } from "redux";

const { Title, Text } = Typography;

export default function Exchange() {
    const param = useTypedSelector((state) => state.param);
    const exchangeRate = useTypedSelector((state) => state.exchangeRate);
    const [data, setData] = useState<typeof exchangeRate>({
        payload: {},
        loading: false,
    });
    const [loadingPage, setLoadingPage] = useState<boolean>(true)

    const setExchangeRate = () => {
        if (Object.keys(exchangeRate.payload).length > 0) {
            setData(exchangeRate)
            if (loadingPage) setLoadingPage(false)
        }
    }

    useEffect(() => {
        setExchangeRate();
    }, [exchangeRate]);


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