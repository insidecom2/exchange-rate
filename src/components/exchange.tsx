import { Card, Spin } from "antd";
import React, { useEffect } from 'react';
import { Typography } from 'antd';
import { useState } from 'react';
import { convertSymbolUpper, moneyFormat } from '../utils/symbol';
import { useTypedSelector } from "../hooks/useTypeSelector";

const { Title, Text } = Typography;

export default function Exchange() {

    const param = useTypedSelector((state) => state.param);
    const exchangeRate = useTypedSelector((state) => state.exchangeRate);
    const [data, setData] = useState<typeof exchangeRate>({
        payload: {},
        loading: false,
    });

    const [loadingPage, setLoadingPage] = useState<boolean>(true)

    const getExchangeRate = () => {
        if (Object.keys(exchangeRate.payload).length > 0) {
            setData(exchangeRate)
            if (loadingPage) setLoadingPage(false)
        }
    }

    useEffect(() => {
        getExchangeRate();
    }, [exchangeRate]);


    return (
        <Card style={{ width: '100%', height: '260px' }}>
            {loadingPage ?
                <div className="exchange-loading">
                    <Spin />
                </div> : ''}
            <Title level={3}>{convertSymbolUpper(param.pair)}</Title>
            <Title level={2} style={{ height: '30px' }}>{data.payload.lastPrice ? moneyFormat(data.payload.lastPrice) : ''}</Title>
            <Text className="exchange-volume-text"><p>Volume : {data.payload.quoteVolume ? moneyFormat(data.payload.quoteVolume) : ''}</p></Text>
            <Text className="exchange-volume-text"><p>High price : {data.payload.highPrice ? moneyFormat(data.payload.highPrice) : ''}</p></Text>
            <Text className="exchange-volume-text"><p>Low price : {data.payload.lowPrice ? moneyFormat(data.payload.lowPrice) : ''}</p></Text>
            <Text className={parseFloat(data.payload.priceChangePercent) < 0 ? 'exchange-volume-danger' : 'exchange-volume-success'}>
                <p>Change : {data.payload.priceChangePercent ? moneyFormat(data.payload.priceChangePercent) + '%' : ''} </p></Text>
            {exchangeRate.loading ? <p style={{ 'textAlign': 'right' }}><Spin /></p> : ''}
        </Card>
    )
}